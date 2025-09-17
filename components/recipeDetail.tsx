"use client";

import {
  ArrowLeft,
  ChefHat,
  Clock,
  Users,
  Utensils,
  ExternalLink,
  ImageIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import type { Recipe } from "@/lib/generated/prisma/wasm";
import { redirect } from "next/navigation";
import Image from "next/image";

interface RecipeDetailProps {
  recipe: Recipe;
}

export function RecipeDetail({ recipe }: RecipeDetailProps) {
  const totalTime = (recipe.prepMin ?? 0) + (recipe.cookMin ?? 0);
  const ageMatch = recipe.title.match(/\$\$(\d+\+?\s*months?)\$\$/i);
  const age = ageMatch ? ageMatch[1] : "6+ months";

  const ingredients = recipe.ingredientsText
    ? recipe.ingredientsText.split("\n").filter((item) => item.trim())
    : [];
  const instructions = recipe.instructions
    ? recipe.instructions.split("\n").filter((item) => item.trim())
    : [];

  return (
    <main className="container mx-auto py-8 px-4 md:px-6 lg:px-8 max-w-4xl">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-2xl flex items-center gap-2">
                  <ChefHat className="h-6 w-6" />
                  {recipe.title.replace(/\s*\$\$[^)]*\$\$/, "")}
                </CardTitle>
                <p className="text-muted-foreground text-pretty">
                  {recipe.description}
                </p>
              </div>
              <Badge
                variant="default"
                className="bg-green-100 text-green-800 hover:bg-green-200"
              >
                {age}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Recipe Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{recipe.servings} servings</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{totalTime} minutes total</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm">
                  <div>{recipe.prepMin}m prep</div>
                  <div>{recipe.cookMin}m cook</div>
                </div>
              </div>
            </div>

            {(recipe.imageUrl || recipe.sourceUrl) && (
              <div className="space-y-3">
                {recipe.imageUrl && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Recipe Image
                    </h3>
                    <Image
                      src={recipe.imageUrl || "/placeholder.svg"}
                      alt={recipe.title}
                      className="w-full h-64 object-cover"
                      width={800}
                      height={256}
                      onError={(
                        e: React.SyntheticEvent<HTMLImageElement, Event>
                      ) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
                {recipe.sourceUrl && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ExternalLink className="h-5 w-5" />
                      Source
                    </h3>
                    <a
                      href={recipe.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 underline"
                    >
                      View Original Recipe
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Ingredients</h3>
                {ingredients.length > 0 ? (
                  <ul className="space-y-2">
                    {ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span>•</span>
                        <span className="text-sm leading-relaxed">
                          {ingredient}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No ingredients listed
                  </p>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Instructions</h3>
                {instructions.length > 0 ? (
                  <ol className="space-y-3">
                    {instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-3">
                        <span>•</span>
                        <span className="text-sm leading-relaxed pt-0.5">
                          {instruction}
                        </span>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No instructions provided
                  </p>
                )}
              </div>
            </div>

            {recipe.steps && (
              <div className="space-y-4 pt-4 border-t">
                {recipe.steps && (
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Steps</h3>
                    <p className="text-sm leading-relaxed">{recipe.steps}</p>
                  </div>
                )}
              </div>
            )}
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => redirect("/myRecipes")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Recipes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
