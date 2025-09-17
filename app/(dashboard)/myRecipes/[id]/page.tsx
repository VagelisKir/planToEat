import { RecipeDetail } from "@/components/recipeDetail";
import { auth0 } from "@/lib/auth0";
import prisma from "@/prisma/db";
import { redirect, notFound } from "next/navigation";

interface RecipePageProps {
  params: Promise<{ id: string }>;
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;
  const session = await auth0.getSession();

  if (!session?.user.email) {
    redirect(`/myRecipes/${id}`);
  }

  const email = session.user.email.toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    redirect("/unauthorized");
  }

  const recipe = await prisma.recipe.findFirst({
    where: { id, userId: user.id },
  });
  if (!recipe) notFound();

  return <RecipeDetail recipe={recipe} />;
}
