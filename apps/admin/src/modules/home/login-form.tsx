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

export default function AdminLoginForm() {
  const loginWithGithub = () => {
    authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="flex items-center justify-center py-24">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <CardTitle>Authenticate Your Account</CardTitle>
          <CardDescription>
            This is the authentication page. Please login to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <Button onClick={loginWithGithub}>Login with Github</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
