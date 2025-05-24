import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

import NavItems from '@/common/components/navbar/NavItems';

const Navbar: React.FC = () => (
  <nav className="mx-auto flex w-full items-center justify-between bg-white px-14 py-4 max-sm:px-4">
    <Link href="/">
      <div className="flex cursor-pointer items-center gap-2.5">
        <Image src="/images/logo.svg" alt="logo" width={46} height={44} />
      </div>
    </Link>
    <div className="flex items-center gap-8">
      <NavItems />
      <SignedOut>
        <SignInButton>
          <button className="flex cursor-pointer items-center gap-2 rounded-4xl border border-black px-4 py-2.5 text-sm font-semibold">
            登录
          </button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </nav>
);

export default Navbar;
