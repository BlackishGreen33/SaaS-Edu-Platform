import { NextPage } from 'next';

import {
  CompanionCard,
  CompanionsList,
  CTA,
} from '@/common/components/companion';
import {
  getAllCompanions,
  getRecentSessions,
} from '@/common/libs/actions/companion.actions';
import { getSubjectColor } from '@/common/utils';

const Page: NextPage = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      <h1>热门伙伴</h1>
      <section className="flex w-full items-start justify-between gap-4 max-lg:flex-col-reverse max-lg:items-center">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
      <section className="flex w-full items-start justify-between gap-4 max-lg:flex-col-reverse max-lg:items-center">
        <CompanionsList
          title="最近完成的课程会话"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
