"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { addRecipeToDB } from "@/app/(dashboard)/addRecipe/actions";
import { useUser } from "@auth0/nextjs-auth0";

type RecipeFormData = {
  title: string;
  description: string;
  servings: number;
  prepMin: number;
  cookMin: number;
  imageUrl: string;
  sourceUrl: string;
  isPublic: boolean;
  ingredientsText: string;
  instructions: string;
};

export function RecipeForm() {
  const { user, isLoading } = useUser();

  const [formData, setFormData] = useState<RecipeFormData>({
    title: "",
    description: "",
    servings: 2,
    prepMin: 0,
    cookMin: 0,
    imageUrl: "",
    sourceUrl: "",
    isPublic: false,
    ingredientsText: "",
    instructions: "",
  });

  const [errors, setErrors] = useState<Partial<RecipeFormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    field: keyof RecipeFormData,
    value: string | number | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitSuccess) setSubmitSuccess(false);
    if (submitError) setSubmitError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<RecipeFormData> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Recipe title is required";
    }
    if (!formData.ingredientsText.trim()) {
      newErrors.ingredientsText = "Please list the ingredients";
    }
    if (!formData.instructions.trim()) {
      newErrors.instructions = "Please provide cooking instructions";
    }
    if (formData.servings < 1) {
      newErrors.servings = 1;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await addRecipeToDB({
        user: { email: user?.email || "unknown" },
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        sourceUrl: formData.sourceUrl,
        prepMin: formData.prepMin,
        cookMin: formData.cookMin,
        servings: formData.servings,
        isPublic: formData.isPublic,
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredientsText: formData.ingredientsText,
        instructions: formData.instructions,
        steps: formData.instructions
          .split("\n")
          .filter((step) => step.trim() !== ""),
      });

      setSubmitSuccess(true);
      setFormData({
        title: "",
        description: "",
        servings: 2,
        prepMin: 0,
        cookMin: 0,
        imageUrl: "",
        sourceUrl: "",
        isPublic: false,
        ingredientsText: "",
        instructions: "",
      });
    } catch (error) {
      console.error("Failed to save recipe:", error);
      setSubmitError("Failed to save recipe. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-green-600 text-lg font-semibold mb-2">
              ✅ Recipe saved successfully!
            </div>
            <p className="text-muted-foreground mb-4">
              Your recipe has been added to the database.
            </p>
            <Button onClick={() => setSubmitSuccess(false)}>
              Add Another Recipe
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-balance">Add New Recipe</h1>
        <p className="text-muted-foreground mt-2">
          Create and share your favorite recipes
        </p>
      </div>

      {submitError && (
        <Card className="mb-6 border-destructive">
          <CardContent className="pt-6">
            <div className="text-destructive font-semibold">{submitError}</div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Recipe Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Recipe Title</Label>
              <Input
                id="title"
                placeholder="Enter recipe title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your recipe..."
                className="min-h-[80px]"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
              <p className="text-sm text-muted-foreground">
                Optional: Add a brief description of your recipe
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="servings">Servings</Label>
                <Input
                  id="servings"
                  type="number"
                  min="1"
                  max="50"
                  value={formData.servings}
                  onChange={(e) =>
                    handleInputChange(
                      "servings",
                      Number.parseInt(e.target.value) || 1
                    )
                  }
                />
                {errors.servings && (
                  <p className="text-sm text-destructive">{errors.servings}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="prepMin">Prep Time (minutes)</Label>
                <Input
                  id="prepMin"
                  type="number"
                  min="0"
                  placeholder="15"
                  value={formData.prepMin || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "prepMin",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cookMin">Cook Time (minutes)</Label>
                <Input
                  id="cookMin"
                  type="number"
                  min="0"
                  placeholder="30"
                  value={formData.cookMin || ""}
                  onChange={(e) =>
                    handleInputChange(
                      "cookMin",
                      Number.parseInt(e.target.value) || 0
                    )
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    handleInputChange("imageUrl", e.target.value)
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Optional: Add a photo of your recipe
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sourceUrl">Source URL</Label>
                <Input
                  id="sourceUrl"
                  placeholder="https://example.com/recipe"
                  value={formData.sourceUrl}
                  onChange={(e) =>
                    handleInputChange("sourceUrl", e.target.value)
                  }
                />
                <p className="text-sm text-muted-foreground">
                  Optional: Link to original recipe source
                </p>
              </div>
            </div>

            <div className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <Checkbox
                id="isPublic"
                checked={formData.isPublic}
                onCheckedChange={(checked) =>
                  handleInputChange("isPublic", checked === true)
                }
              />
              <div className="space-y-1 leading-none">
                <Label htmlFor="isPublic">Make this recipe public</Label>
                <p className="text-sm text-muted-foreground">
                  Allow other users to view and save this recipe
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ingredients & Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="ingredientsText">Ingredients</Label>
              <Textarea
                id="ingredientsText"
                placeholder="List each ingredient on a new line with quantities, for example:
1 cup flour
2 eggs
1/2 cup sugar
1 tsp vanilla extract"
                className="min-h-[120px]"
                value={formData.ingredientsText}
                onChange={(e) =>
                  handleInputChange("ingredientsText", e.target.value)
                }
              />
              <p className="text-sm text-muted-foreground">
                List each ingredient on a new line with quantities
              </p>
              {errors.ingredientsText && (
                <p className="text-sm text-destructive">
                  {errors.ingredientsText}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Write step-by-step cooking instructions, for example:
1. Preheat oven to 350°F
2. Mix dry ingredients in a bowl
3. Add wet ingredients and stir until combined
4. Bake for 25-30 minutes"
                className="min-h-[150px]"
                value={formData.instructions}
                onChange={(e) =>
                  handleInputChange("instructions", e.target.value)
                }
              />
              <p className="text-sm text-muted-foreground">
                Write step-by-step cooking instructions
              </p>
              {errors.instructions && (
                <p className="text-sm text-destructive">
                  {errors.instructions}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Create Recipe"}
          </Button>
        </div>
      </form>
    </div>
  );
}
