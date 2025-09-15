"use client";

import type React from "react";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Ingredient = {
  name: string;
  quantity: string;
  unit: string;
  note: string;
};

type Step = {
  instruction: string;
};

type Recipe = {
  title: string;
  description: string;
  servings: string;
  prepMin: string;
  cookMin: string;
  imageUrl: string;
  sourceUrl: string;
  isPublic: boolean;
  ingredients: Ingredient[];
  steps: Step[];
};

export function AddRecipeForm() {
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    description: "",
    servings: "2",
    prepMin: "",
    cookMin: "",
    imageUrl: "",
    sourceUrl: "",
    isPublic: false,
    ingredients: [{ name: "", quantity: "", unit: "CUP", note: "" }],
    steps: [{ instruction: "" }],
  });

  const unitOptions = [
    { value: "GRAM", label: "Gram" },
    { value: "KILOGRAM", label: "Kilogram" },
    { value: "MILLILITER", label: "Milliliter" },
    { value: "LITER", label: "Liter" },
    { value: "TEASPOON", label: "Teaspoon" },
    { value: "TABLESPOON", label: "Tablespoon" },
    { value: "CUP", label: "Cup" },
    { value: "PIECE", label: "Piece" },
    { value: "SLICE", label: "Slice" },
    { value: "PINCH", label: "Pinch" },
  ];

  const updateRecipe = (
    field: keyof Recipe,
    value: string | boolean | Ingredient[] | Step[]
  ) => {
    setRecipe((prev) => ({ ...prev, [field]: value }));
  };

  const updateIngredient = (
    index: number,
    field: keyof Ingredient,
    value: string
  ) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setRecipe((prev) => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [
        ...prev.ingredients,
        { name: "", quantity: "", unit: "CUP", note: "" },
      ],
    }));
  };

  const removeIngredient = (index: number) => {
    if (recipe.ingredients.length > 1) {
      setRecipe((prev) => ({
        ...prev,
        ingredients: prev.ingredients.filter((_, i) => i !== index),
      }));
    }
  };

  const updateStep = (index: number, value: string) => {
    const newSteps = [...recipe.steps];
    newSteps[index] = { instruction: value };
    setRecipe((prev) => ({ ...prev, steps: newSteps }));
  };

  const addStep = () => {
    setRecipe((prev) => ({
      ...prev,
      steps: [...prev.steps, { instruction: "" }],
    }));
  };

  const removeStep = (index: number) => {
    if (recipe.steps.length > 1) {
      setRecipe((prev) => ({
        ...prev,
        steps: prev.steps.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(recipe);
    // TODO: Implement recipe creation logic
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Add New Recipe</h1>
        <p className="text-muted-foreground mt-2">
          Create and share your favorite recipes
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Basic Recipe Information */}
          <Card>
            <CardHeader>
              <CardTitle>Recipe Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Recipe Title
                </label>
                <Input
                  id="title"
                  placeholder="Enter recipe title"
                  value={recipe.title}
                  onChange={(e) => updateRecipe("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe your recipe..."
                  className="min-h-[80px]"
                  value={recipe.description}
                  onChange={(e) => updateRecipe("description", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <label htmlFor="servings" className="text-sm font-medium">
                    Servings
                  </label>
                  <Input
                    id="servings"
                    type="number"
                    min="1"
                    placeholder="2"
                    value={recipe.servings}
                    onChange={(e) => updateRecipe("servings", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="prepMin" className="text-sm font-medium">
                    Prep (min)
                  </label>
                  <Input
                    id="prepMin"
                    type="number"
                    min="0"
                    placeholder="15"
                    value={recipe.prepMin}
                    onChange={(e) => updateRecipe("prepMin", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="cookMin" className="text-sm font-medium">
                    Cook (min)
                  </label>
                  <Input
                    id="cookMin"
                    type="number"
                    min="0"
                    placeholder="30"
                    value={recipe.cookMin}
                    onChange={(e) => updateRecipe("cookMin", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="imageUrl" className="text-sm font-medium">
                    Image URL
                  </label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={recipe.imageUrl}
                    onChange={(e) => updateRecipe("imageUrl", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="sourceUrl" className="text-sm font-medium">
                    Source URL
                  </label>
                  <Input
                    id="sourceUrl"
                    placeholder="https://example.com/recipe"
                    value={recipe.sourceUrl}
                    onChange={(e) => updateRecipe("sourceUrl", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                  <label htmlFor="isPublic" className="text-sm font-medium">
                    Public Recipe
                  </label>
                  <p className="text-xs text-muted-foreground">
                    Make visible to other users
                  </p>
                </div>
                <input
                  id="isPublic"
                  type="checkbox"
                  checked={recipe.isPublic}
                  onChange={(e) => updateRecipe("isPublic", e.target.checked)}
                  className="h-4 w-4"
                />
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Ingredients */}
          <Card>
            <CardHeader>
              <CardTitle>Ingredients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="space-y-2 p-3 border rounded-lg">
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Ingredient name"
                      value={ingredient.name}
                      onChange={(e) =>
                        updateIngredient(index, "name", e.target.value)
                      }
                    />
                    <div className="flex gap-2">
                      <Input
                        placeholder="2"
                        className="w-20"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          updateIngredient(index, "quantity", e.target.value)
                        }
                      />
                      <Select
                        value={ingredient.unit}
                        onValueChange={(value) =>
                          updateIngredient(index, "unit", value)
                        }
                      >
                        <SelectTrigger className="w-24">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {unitOptions.map((unit) => (
                            <SelectItem key={unit.value} value={unit.value}>
                              {unit.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Note (optional)"
                      className="flex-1"
                      value={ingredient.note}
                      onChange={(e) =>
                        updateIngredient(index, "note", e.target.value)
                      }
                    />
                    {recipe.ingredients.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeIngredient(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addIngredient}
                className="w-full bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Ingredient
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Full Width - Instructions Section */}
        <Card>
          <CardHeader>
            <CardTitle>Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              {recipe.steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start p-3 border rounded-lg"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder="Describe this step..."
                      className="min-h-[60px] text-sm"
                      value={step.instruction}
                      onChange={(e) => updateStep(index, e.target.value)}
                    />
                  </div>
                  {recipe.steps.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeStep(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addStep}
              className="w-full bg-transparent"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Create Recipe</Button>
        </div>
      </form>
    </div>
  );
}
