import { auth } from '../auth';
import { ModeToggleButton } from './mode-toggle-button';

import { UserMenu } from './user-menu';
import UserAuth from './user-auth';
import Link from 'next/link';

export async function Header() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-40 flex h-[72px] w-full justify-between bg-[#373B53] md:h-[80px] lg:fixed lg:h-screen lg:w-[103px] lg:flex-col lg:items-center lg:rounded-r-2xl">
      <Link
        className="relative grid w-[72px] place-content-center overflow-hidden rounded-r-2xl bg-first lg:h-[103px] lg:w-full"
        href={'/'}
      >
        <div className="absolute bottom-0 h-1/2 w-[72px] rounded-tl-2xl bg-second lg:w-full " />
        <svg
          className="z-10 lg:h-10 lg:w-10"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 28 26"
          width="28"
          height="26"
        >
          <path
            fill="#FFF"
            fillRule="evenodd"
            d="M20.513 0C24.965 2.309 28 6.91 28 12.21 28 19.826 21.732 26 14 26S0 19.826 0 12.21C0 6.91 3.035 2.309 7.487 0L14 12.9z"
          />
        </svg>
      </Link>
      <div className="flex items-center gap-6 md:gap-8 lg:flex-col">
        <ModeToggleButton />
        <div className="grid h-full w-[80px] place-content-center border-l border-[#494E6E] md:w-[96px] lg:h-[88px] lg:w-[103px] lg:border-l-0 lg:border-t">
          {session ? <UserMenu /> : <UserAuth />}
        </div>
      </div>
    </header>
  );
}
