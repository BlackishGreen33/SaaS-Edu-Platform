import { NextPage } from 'next';

import { CompanionCard } from '@/common/components/companion';
import SearchInput from '@/common/components/elements/SearchInput';
import SubjectFilter from '@/common/components/elements/SubjectFilter';
import { getAllCompanions } from '@/common/libs/actions/companion.actions';
import { getSubjectColor } from '@/common/utils';

const Page: NextPage<SearchParams> = async ({ searchParams }) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : '';
  const topic = filters.topic ? filters.topic : '';

  const companions = await getAllCompanions({ subject, topic });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1>你的 AI 伙伴们</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="flex w-full flex-wrap justify-between gap-4 max-md:justify-center">
        {companions.map((companion) => (
          <CompanionCard
            key={companion.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  );
};

export default Page;
