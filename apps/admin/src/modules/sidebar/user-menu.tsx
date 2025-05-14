"use client";

import { authClient } from "@mm-app/auth/client";
import { buttonVariants } from "@mm-app/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@mm-app/ui/components/dropdown-menu";
import { cn } from "@mm-app/ui/lib/utils";
import { useRouter } from "next/navigation";

export default function UserDropdown() {
  const router = useRouter();

  const { useSession } = authClient;
  const { data: session } = useSession();

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
      <DropdownMenuTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "text-sm bg-background/30",
        )}
      >
        @{session.user.name}
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
