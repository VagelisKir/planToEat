import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth0 } from "@/lib/auth0";

export default async function LoginForm() {
  const session = await auth0.getSession();
  console.log({ session });

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        <CardDescription className="text-center">
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Button className="w-full bg-primary hover:bg-primary/90">
            <a href="/auth/login">Log In</a>
          </Button>

          <Button
            variant="secondary"
            className="w-full bg-secondary hover:bg-secondary/90"
          >
            <a href="/auth/login?screen_hint=signup">Subscribe</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
