'use client';

import Lottie, { LottieRefCurrentProps } from 'lottie-react';
import { motion } from 'motion/react';
import Image from 'next/image';
import * as React from 'react';

import soundwaves from '@/common/constants/soundwaves.json';
import { addToSessionHistory } from '@/common/libs/actions/companion.actions';
import { vapi } from '@/common/libs/vapi.sdk';
import { cn, configureAssistant, getSubjectColor } from '@/common/utils';

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const CompanionComponent: React.FC<CompanionComponentProps> = ({
  companionId,
  subject,
  topic,
  name,
  userName,
  userImage,
  style,
  voice,
}) => {
  const [callStatus, setCallStatus] = React.useState<CallStatus>(
    CallStatus.INACTIVE
  );
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [messages, setMessages] = React.useState<SavedMessage[]>([]);

  const lottieRef = React.useRef<LottieRefCurrentProps>(null);

  React.useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play();
      } else {
        lottieRef.current?.stop();
      }
    }
  }, [isSpeaking, lottieRef]);

  React.useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);

    const onCallEnd = () => {
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId);
    };

    const onMessage = (message: Message) => {
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [newMessage, ...prev]);
      }
    };

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);

    const onError = (error: Error) => console.error('Error', error);

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('error', onError);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
    };
  }, [companionId]);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted);
  };

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    const assistantOverrides = {
      variableValues: { subject, topic, style },
      clientMessages: ['transcript'],
      serverMessages: [],
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    vapi.start(configureAssistant(voice, style), assistantOverrides);
  };

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  return (
    <section className="flex h-[70vh] flex-col">
      <section className="flex gap-8 max-sm:flex-col">
        <div className="flex w-2/3 flex-col items-center justify-center gap-4 rounded-lg border-2 border-orange-500 max-sm:w-full">
          <div
            className="mt-4 flex size-[300px] items-center justify-center rounded-lg max-sm:size-[100px]"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <div
              className={cn(
                'absolute transition-opacity duration-1000',
                callStatus === CallStatus.FINISHED ||
                  callStatus === CallStatus.INACTIVE
                  ? 'opacity-1001'
                  : 'opacity-0',
                callStatus === CallStatus.CONNECTING &&
                  'animate-pulse opacity-100'
              )}
            >
              <Image
                src={`/icons/${subject}.svg`}
                alt={subject}
                width={150}
                height={150}
                className="max-sm:w-fit"
              />
            </div>

            <div
              className={cn(
                'absolute transition-opacity duration-1000',
                callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'
              )}
            >
              <Lottie
                lottieRef={lottieRef}
                animationData={soundwaves}
                autoplay={false}
                className="size-[300px] max-sm:size-[100px]"
              />
            </div>
          </div>
          <p className="text-2xl font-bold">{name}</p>
        </div>
        <div className="flex w-1/3 flex-col gap-4 max-sm:w-full max-sm:flex-row">
          <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-black py-8 max-sm:hidden">
            <Image
              src={userImage}
              alt={userName}
              width={130}
              height={130}
              className="rounded-lg"
            />
            <p className="text-2xl font-bold">{userName}</p>
          </div>
          <button
            className="flex w-full cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-black py-8 max-sm:py-2"
            onClick={toggleMicrophone}
            disabled={callStatus !== CallStatus.ACTIVE}
          >
            <Image
              src={isMuted ? '/icons/mic-off.svg' : '/icons/mic-on.svg'}
              alt="mic"
              width={36}
              height={36}
            />
            <p className="max-sm:hidden">
              {isMuted ? '开启麦克风' : '关闭麦克风'}
            </p>
          </button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.01 }}
            className={cn(
              'w-full cursor-pointer rounded-lg py-2 text-white transition-colors',
              callStatus === CallStatus.ACTIVE ? 'bg-red-700' : 'bg-primary',
              callStatus === CallStatus.CONNECTING && 'animate-pulse'
            )}
            onClick={
              callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall
            }
          >
            {callStatus === CallStatus.ACTIVE
              ? '结束对话'
              : callStatus === CallStatus.CONNECTING
                ? '连接中'
                : '开始对话'}
          </motion.button>
        </div>
      </section>
      <section className="relative flex w-full flex-grow flex-col items-center gap-4 overflow-hidden pt-10">
        <div className="no-scrollbar flex h-full w-full flex-col gap-4 overflow-y-auto pr-2 text-2xl max-sm:gap-2">
          {messages.map((message, index) => {
            if (message.role === 'assistant') {
              return (
                <p key={index} className="max-sm:text-sm">
                  {name.split(' ')[0].replace('/[.,]/g, ', '')}:{' '}
                  {message.content}
                </p>
              );
            } else {
              return (
                <p key={index} className="text-primary max-sm:text-sm">
                  {userName}: {message.content}
                </p>
              );
            }
          })}
        </div>
        <div className="from-background via-background/90 pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-40 bg-gradient-to-t to-transparent max-sm:h-20" />
      </section>
    </section>
  );
};

export default CompanionComponent;
