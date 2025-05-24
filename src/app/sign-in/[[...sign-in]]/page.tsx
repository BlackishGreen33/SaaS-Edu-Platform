import { SignIn } from '@clerk/nextjs';
import { NextPage } from 'next';

const Page: NextPage = () => (
  <main className="flex items-center justify-center">
    <SignIn />
  </main>
);

export default Page;
