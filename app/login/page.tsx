import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export default async function LoginPage() {
  const session = await auth0.getSession();

  if (session) {
    const email = session.user.email;
    redirect("/");
  }

  return (
    <div>
      <Button asChild className="w-full" size="lg">
        <a href="/auth/login">
          <LogIn className="mr-2 h-5 w-5" />
          Sign in
        </a>
      </Button>
    </div>
  );
}
