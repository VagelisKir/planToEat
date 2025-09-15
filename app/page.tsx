import LoginForm from "@/components/login";
import { auth0 } from "@/lib/auth0";
import prisma from "@/prisma/db";
import { ChefHat } from "lucide-react";
import addUserToDb from "./(dashboard)/actions";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await auth0.getSession();

  if (session) {
    const email = session.user?.email;
    if (!email) {
      redirect("/auth/login");
    }
    console.log({ session });

    await prisma.user.upsert({
      where: { email },
      update: {},
      create: { email },
    });

    redirect("/addRecipe");
  }
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="flex justify-center">
            <div className="p-3 bg-primary/10 rounded-full">
              <ChefHat className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground">PlanToEat</h1>
          <p className="text-muted-foreground text-balance">
            Prep Your Meals, Nourish Your Life.
          </p>
        </div>

        <LoginForm />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 PlanToEat Pro. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
