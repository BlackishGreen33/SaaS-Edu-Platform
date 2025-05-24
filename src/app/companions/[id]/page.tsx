import { currentUser } from '@clerk/nextjs/server';
import { NextPage } from 'next';
import Image from 'next/image';
import { redirect } from 'next/navigation';

// import CompanionComponent from '@/components/CompanionComponent';
import { getCompanion } from '@/common/libs/actions/companion.actions';
import { getSubjectColor } from '@/common/utils';

interface CompanionSessionPageProps {
  params: Promise<{ id: string }>;
}

const Page: NextPage<CompanionSessionPageProps> = async ({ params }) => {
  const { id } = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { name, subject, title, topic, duration } = companion;

  if (!user) redirect('/sign-in');
  if (!name) redirect('/companions');

  return (
    <main>
      <article className="rounded-border flex justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="flex size-[72px] items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt={subject}
              width={35}
              height={35}
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">
          {duration} 分钟
        </div>
      </article>
      {/* <CompanionComponent
        {...companion}
        companionId={id}
        userName={user.firstName!}
        userImage={user.imageUrl!}
      /> */}
    </main>
  );
};

export default Page;
