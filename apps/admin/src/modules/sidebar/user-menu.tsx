"use client";

import { authClient } from "@mm-app/auth/client";
import { Button } from "@mm-app/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@mm-app/ui/components/dropdown-menu";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const router = useRouter();

  const { data: session } = authClient.useSession();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  if (!session) {
    return <></>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-sm bg-background/30" variant={"outline"}>
          @{session.user.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]" align="end">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem onSelect={signOut} className="cursor-pointer">
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
