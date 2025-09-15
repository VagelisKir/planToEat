import { AddRecipeForm } from "@/components/recipeForm";
import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";

export default async function AddRecipePage() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/unauthorized");
  }
  return <AddRecipeForm />;
}
