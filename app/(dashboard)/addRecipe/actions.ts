"use server"

import prisma from "@/prisma/db"

export async function addRecipeToDB(data: {
    user: { email: string }
  title: string
  description?: string
  imageUrl?: string
  sourceUrl?: string
  prepMin?: number
  cookMin?: number
  servings?: number
  isPublic?: boolean
  createdAt: Date
  updatedAt: Date
  ingredientsText?: string
  steps?: string[]
  instructions?: string
}) {

  const user = await prisma.user.findFirst()
  if (!user) {
    throw new Error("User not found")
  }

  const newRecipe = await prisma.recipe.create({
    data: {
      userId: user.id,
      title: data.title,
      description: data.description,
      instructions: data.instructions,
      imageUrl: data.imageUrl,
      prepMin: data.prepMin,
      cookMin: data.cookMin,
      servings: data.servings,
      sourceUrl: data.sourceUrl,
      isPublic: data.isPublic,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      ingredientsText: data.ingredientsText,
      steps: data.steps,
    },
  })

  return newRecipe
}
