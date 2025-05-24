import { auth } from '@clerk/nextjs/server';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import CompanionForm from '@/common/components/companion/CompanionForm';
import { newCompanionPermissions } from '@/common/libs/actions/companion.actions';

const Page: NextPage = async () => {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="items-center justify-center min-md:w-2/3 min-lg:w-1/3">
      {canCreateCompanion ? (
        <article className="flex w-full flex-col gap-4">
          <h1>构建属于你的伙伴</h1>
          <CompanionForm />
        </article>
      ) : (
        <article className="flex w-full flex-col items-center justify-center gap-4 pt-20 text-center min-2xl:w-1/2">
          <Image
            src="/images/limit.svg"
            alt="Companion limit reached"
            width={360}
            height={230}
          />
          <div className="bg-cta-gold rounded-4xl px-3 py-1.5 text-black">
            升级你的方案
          </div>
          <h1>你已到达当前方案的上限</h1>
          <p>你已达到 AI 伙伴创建的上限。升级以创建更多伙伴和高级功能。</p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            升级方案
          </Link>
        </article>
      )}
    </main>
  );
};

export default Page;
