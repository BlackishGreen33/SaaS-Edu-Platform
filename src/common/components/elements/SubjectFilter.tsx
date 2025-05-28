'use client';
import { formUrlQuery, removeKeysFromUrlQuery } from '@jsmastery/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { subjects } from '@/common/constants';

const SubjectFilter: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('subject') || '';

  const [subject, setSubject] = React.useState(query);

  React.useEffect(() => {
    let newUrl = '';
    if (subject === 'all') {
      newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ['subject'],
      });
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: 'subject',
        value: subject,
      });
    }
    router.push(newUrl, { scroll: false });
  }, [router, searchParams, subject]);

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className="input capitalize">
        <SelectValue placeholder="主題" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">所有主题</SelectItem>
        {subjects.map((subject) => (
          <SelectItem key={subject} value={subject} className="capitalize">
            {subject}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SubjectFilter;
