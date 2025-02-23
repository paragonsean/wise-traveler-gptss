"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { supabaseClient, supabaseClientPublic } from "@/lib/supabase-client"

async function getSupabaseClient() {
  console.log("Getting Supabase client")
  const { getToken } = auth()
  const supabaseAccessToken = await getToken({ template: "chef-genie" })
  console.log("Supabase access token obtained")
  return await supabaseClient(supabaseAccessToken as string)
}

export async function saveGeneration(generatedRecipe) {
  console.log("Saving generation", generatedRecipe)
  const supabase = await supabaseClientPublic()

  const data = {
    content_json: generatedRecipe,
    title: generatedRecipe.title,
    difficulty: generatedRecipe.difficulty,
    cooking_time: generatedRecipe.cooking_time,
    people: generatedRecipe.people,
    low_calories: generatedRecipe.low_calori,
    vegan: generatedRecipe.vegan,
    paleo: generatedRecipe.paleo,
    description: generatedRecipe.description,
    calories: generatedRecipe.calories,
    proteins: generatedRecipe.macros.protein,
    fats: generatedRecipe.macros.fats,
    carbs: generatedRecipe.macros.carbs,
  }

  await supabase.from("generations").insert([data])
  console.log("Generation saved")

  revalidatePath("/")
  console.log("Path revalidated")
}

export async function saveRecipe(generatedRecipe) {
  console.log("Saving recipe", generatedRecipe)
  const supabase = await getSupabaseClient()
  const userId = auth().userId

  if (!userId) {
    console.error("User ID not found")
    throw new Error("User ID not found")
  }

  const data = {
    user_id: userId,
    title: generatedRecipe.title,
    description: generatedRecipe.description,
    content_json: generatedRecipe,
    ingredients: generatedRecipe.ingredients,
    difficulty: generatedRecipe.difficulty,
    cooking_time: generatedRecipe.cooking_time,
    people: generatedRecipe.people,
    low_calories: generatedRecipe.low_calori,
    vegan: generatedRecipe.vegan,
    paleo: generatedRecipe.paleo,
    calories: generatedRecipe.calories,
    proteins: generatedRecipe.macros.protein,
    fats: generatedRecipe.macros.fats,
    carbs: generatedRecipe.macros.carbs,
  }
  try {
    await supabase.from("recipes").insert([data])
    console.log("Recipe saved")
  } catch (error) {
    console.error("Failed to save the recipe", error)
    throw new Error("Failed to save the recipe.")
  }
}

export async function deleteRecipe(id: string) {
  console.log("Deleting recipe with ID:", id)
  const supabase = await getSupabaseClient()
  const userId = auth().userId

  if (!userId) {
    console.error("User ID not found")
    throw new Error("User ID not found")
  }

  await supabase.from("recipes").delete().eq("id", id)
  console.log("Recipe deleted")

  revalidatePath("/dashboard/my-recipes")
  console.log("Path revalidated")
}
