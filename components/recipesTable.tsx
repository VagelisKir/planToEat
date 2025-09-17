"use client";

import { ChefHat, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Badge } from "./ui/badge";
import type { Recipe } from "@/lib/generated/prisma/wasm";
import { redirect } from "next/navigation";

export function RecipesTable({ recipes }: { recipes: Recipe[] }) {
  const handleRecipeClick = (recipeId: string) => {
    redirect(`/myRecipes/${recipeId}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="h-5 w-5" />
          Recipe Collection
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[300px]">Recipe</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Users className="h-4 w-4" />
                    Servings
                  </div>
                </TableHead>
                <TableHead className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Clock className="h-4 w-4" />
                    Time
                  </div>
                </TableHead>
                <TableHead>Age</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recipes.map((recipe, index) => {
                const totalTime = (recipe.prepMin ?? 0) + (recipe.cookMin ?? 0);
                const ageMatch = recipe.title.match(/$$(\d+\+?\s*months?)$$/i);
                const age = ageMatch ? ageMatch[1] : "6+ months";

                return (
                  <TableRow
                    key={index}
                    onClick={() => handleRecipeClick(recipe.id)}
                    className="cursor-pointer hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium">
                      <div className="space-y-1">
                        <div className="font-semibold text-sm leading-tight">
                          {recipe.title.replace(/\s*$$[^)]*$$/, "")}
                        </div>
                        {recipe.cookMin === 0 && (
                          <Badge variant="secondary" className="text-xs">
                            No-Cook
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground leading-relaxed max-w-md">
                        {recipe.description}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{recipe.servings}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="text-sm space-y-1">
                        <div className="font-medium">{totalTime} min</div>
                        <div className="text-xs text-muted-foreground">
                          {recipe.prepMin}m prep + {recipe.cookMin}m cook
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="default"
                        className="bg-green-100 text-green-800 hover:bg-green-200"
                      >
                        {age}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
