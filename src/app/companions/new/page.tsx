// import {auth} from "@clerk/nextjs/server";
import { NextPage } from 'next';

import CompanionForm from '@/common/components/companion/CompanionForm';

// import CompanionForm from "@/components/CompanionForm";

// import {newCompanionPermissions} from "@/lib/actions/companion.actions";

const Page: NextPage = async () => {
  // const { userId } = await auth();
  // if(!userId) redirect('/sign-in');

  // const canCreateCompanion = await newCompanionPermissions();

  return (
    <main className="items-center justify-center min-md:w-2/3 min-lg:w-1/3">
      <article className="flex w-full flex-col gap-4">
        <h1>构建你的伙伴</h1>
        <CompanionForm />
      </article>
      {/* {canCreateCompanion ? (
        <article className="flex w-full flex-col gap-4">
          <h1>Companion Builder</h1>

          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image
            src="/images/limit.svg"
            alt="Companion limit reached"
            width={360}
            height={230}
          />
          <div className="cta-badge">Upgrade your plan</div>
          <h1>You’ve Reached Your Limit</h1>
          <p>
            You’ve reached your companion limit. Upgrade to create more
            companions and premium features.
          </p>
          <Link
            href="/subscription"
            className="btn-primary w-full justify-center"
          >
            Upgrade My Plan
          </Link>
        </article>
      )} */}
    </main>
  );
};

export default Page;
