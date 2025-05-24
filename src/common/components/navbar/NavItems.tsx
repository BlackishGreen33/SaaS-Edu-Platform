'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/common/utils';

const navItems = [
  { label: '主页', href: '/' },
  { label: '伙伴', href: '/companions' },
  { label: '我的旅程', href: 'my-journey' },
];

const NavItems: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-4">
      {navItems.map(({ label, href }) => (
        <Link
          href={href}
          key={label}
          className={cn(pathname === href && 'text-primary font-semibold')}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
