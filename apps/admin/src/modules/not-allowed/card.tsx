"use client";

import { authClient } from "@mm-app/auth/client";
import { Button } from "@mm-app/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@mm-app/ui/components/card";
import { useRouter } from "next/navigation";

export default function NotAllowedCard() {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };

  return (
    <div className="flex items-center justify-center py-24 min-h-screen h-full w-full">
      <Card className="text-center max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Not Allowed</CardTitle>
          <CardDescription>
            You do not have permission to view this page.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button onClick={signOut}>Log Out</Button>
        </CardContent>
      </Card>
    </div>
  );
}
