"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { supabaseClient, supabaseClientPublic } from "@/lib/supabase-client"

async function getSupabaseClient() {
  console.log("🔹 Initializing Supabase client...")

  try {
    const { getToken, userId } = auth()
    console.log("👤 Authenticated User ID:", userId)

    if (!userId) {
      throw new Error("❌ User ID not found")
    }

    const supabaseAccessToken = await getToken({ template: "chef-genie" })
    console.log(
      "🔑 Supabase Access Token (First 6 chars):",
      supabaseAccessToken?.slice(0, 6)
    )

    if (!supabaseAccessToken) {
      throw new Error("❌ Supabase Access Token is missing")
    }

    console.log("✅ Supabase client initialized successfully.")
    return supabaseClient(supabaseAccessToken as string)
  } catch (error) {
    console.error("🚨 Supabase Client Initialization Error:", error)
    throw new Error("Failed to initialize Supabase client.")
  }
}

export async function saveGeneration(generatedRecipe) {
  console.log("🔹 Saving generation...")

  const supabase = supabaseClientPublic()

  const data = {
    content_json: generatedRecipe,
    title: generatedRecipe.title,
    difficulty: generatedRecipe.difficulty,
    cooking_time: generatedRecipe.cooking_time,
    people: generatedRecipe.people,
    low_calories: generatedRecipe.low_calories, // ✅ Fixed typo
    vegan: generatedRecipe.vegan,
    paleo: generatedRecipe.paleo,
    description: generatedRecipe.description,
    calories: generatedRecipe.calories,
    proteins: generatedRecipe.macros.protein,
    fats: generatedRecipe.macros.fats,
    carbs: generatedRecipe.macros.carbs,
  }

  console.log(
    "📦 Data to insert into 'generations':",
    JSON.stringify(data, null, 2)
  )

  const { error } = await supabase.from("generations").insert([data])

  if (error) {
    console.error("🚨 Supabase Insert Error (generations):", error)
    throw new Error("Failed to save generation")
  }

  console.log("✅ Generation saved successfully.")
  revalidatePath("/")
}

export async function saveRecipe(generatedRecipe) {
  console.log("🔹 Saving recipe...")

  const supabase = await getSupabaseClient()
  const { userId } = auth()

  console.log("👤 Authenticated User ID:", userId)
  if (!userId) throw new Error("❌ User ID not found")

  const data = {
    user_id: userId,
    title: generatedRecipe.title,
    description: generatedRecipe.description,
    content_json: generatedRecipe,
    ingredients: JSON.stringify(generatedRecipe.ingredients), // ✅ Ensured JSON is stored correctly
    difficulty: generatedRecipe.difficulty,
    cooking_time: generatedRecipe.cooking_time,
    people: generatedRecipe.people,
    low_calories: generatedRecipe.low_calories, // ✅ Fixed typo
    vegan: generatedRecipe.vegan,
    paleo: generatedRecipe.paleo,
    calories: generatedRecipe.calories,
    proteins: generatedRecipe.macros.protein,
    fats: generatedRecipe.macros.fats,
    carbs: generatedRecipe.macros.carbs,
  }

  console.log(
    "📦 Data to insert into 'recipes':",
    JSON.stringify(data, null, 2)
  )

  try {
    const { error } = await supabase.from("recipes").insert([data])

    if (error) {
      console.error("🚨 Supabase Insert Error (recipes):", error)
      throw new Error(error.message)
    }

    console.log("✅ Recipe saved successfully.")
  } catch (error) {
    console.error("❌ Save Recipe Error:", error)
    throw new Error("Failed to save the recipe.")
  }
}

export async function deleteRecipe(id: string) {
  console.log("🔹 Deleting recipe with ID:", id)

  const supabase = await getSupabaseClient()
  const { userId } = auth()

  console.log("👤 Authenticated User ID:", userId)
  if (!userId) throw new Error("❌ User ID not found")

  console.log("🔹 Attempting to delete recipe...")
  const { error } = await supabase.from("recipes").delete().eq("id", id)

  if (error) {
    console.error("🚨 Supabase Delete Error:", error)
    throw new Error("Failed to delete the recipe.")
  }

  console.log("✅ Recipe deleted successfully.")
  revalidatePath("/dashboard/my-recipes")
}
