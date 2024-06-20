import { User } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Link from 'next/link';

export default function UserAuth() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={'ghost'}
          size={'icon'}
          className="text-white/100 hover:text-primary"
        >
          <User />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Link href={'/login'}>
          <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link href={'/sign_up'}>
          <DropdownMenuItem className="cursor-pointer">
            Sign up
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
