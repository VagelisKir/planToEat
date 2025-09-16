import { RecipesTable } from "@/components/recipesTable";
import { auth0 } from "@/lib/auth0";
import prisma from "@/prisma/db";
import { redirect } from "next/navigation";

export default async function MyRecipes() {
  const session = await auth0.getSession();

  if (!session?.user.email) {
    redirect("/");
  }

  const email = session.user.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    redirect("/unauthorized");
  }

  const recipes = await prisma.recipe.findMany({
    where: { userId: user.id },
  });
  return (
    <main className="container mx-auto py-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-balance">Baby Food Recipes</h1>
          <p className="text-muted-foreground text-pretty">
            Nutritious and delicious recipes for your little one
          </p>
        </div>
        <RecipesTable recipes={recipes} />
      </div>
    </main>
  );
}
