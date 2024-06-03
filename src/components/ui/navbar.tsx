'use client';

import Image from 'next/image';
import React from 'react';
import fibrLogo from '@/public/fibr-logo.webp';
import Link from 'next/link';
import { MdDashboard } from 'react-icons/md';
import { IoIosCreate } from 'react-icons/io';
import { FaUserPlus, FaUser } from 'react-icons/fa';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="py-2 px-8 border-2 flex justify-between items-center sticky top-0">
      <Link href="/">
        <Image
          src={fibrLogo}
          alt="fibr-logo"
          width={80}
          height={80}
        />
      </Link>
      <ul className="flex gap-4">
        <Link
          href="/dashboard"
          className={cn(
            'font-medium flex gap-1 justify-center items-center',
            pathname.includes('dashboard') ? 'text-[#6879f9]' : '',
          )}
        >
          <MdDashboard size={20} />
          Dashboard
        </Link>
        <Link
          href="/create-page"
          className={cn(
            'font-medium flex gap-1 justify-center items-center',
            pathname.includes('create-page') ? 'text-[#6879f9]' : '',
          )}
        >
          <IoIosCreate size={20} />
          Create Page
        </Link>
      </ul>
      <ul className="flex gap-4">
        <Link
          href="/signup"
          className={cn(
            'font-medium flex gap-1 justify-center items-center',
            pathname.includes('signup') ? 'text-[#6879f9]' : '',
          )}
        >
          <FaUserPlus size={20} />
          SingUp
        </Link>
        <Link
          href="/signin"
          className={cn(
            'font-medium flex gap-1 justify-center items-center',
            pathname.includes('signin') ? 'text-[#6879f9]' : '',
          )}
        >
          <FaUser />
          SignIn
        </Link>
      </ul>
    </nav>
  );
}
export default Navbar;
