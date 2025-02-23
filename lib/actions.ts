"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { supabaseClient, supabaseClientPublic } from "@/lib/supabase-client";

//  Fetch private recipes for the authenticated user
export async function getUserrecipes() {
  console.log("Fetching user-specific recipes...");

  const { userId } = auth();
  if (!userId) {
    console.error(" User is not authenticated.");
    return { recipes: [], data: [] };
  }

  try {
    const supabase = await supabaseClient();
    
    // Fetch saved recipes
    const { data: recipes, error: recipesError } = await supabase
      .from("recipes")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (recipesError) {
      console.error("🚨 Supabase Fetch Error (recipes):", recipesError);
      return { recipes: [], data: [] };
    }

    // Fetch generated recipes
    const { data: generatedrecipes, error: generatedError } = await supabase
      .from("generations")
      .select()
      .order("created_at", { ascending: false })
      .limit(3);

    if (generatedError) {
      console.error(" Supabase Fetch Error (generated recipes):", generatedError);
      return { recipes: [], data: [] };
    }

    console.log("User-specific recipes fetched successfully.");
    return { recipes: recipes || [], data: generatedrecipes || [] };
  } catch (error) {
    console.error(" Unexpected error in `getUserrecipes()`:", error);
    return { recipes: [], data: [] };
  }
}

// Save generated recipe (Public)
export async function saveGeneration(generatedRecipe) {
  console.log("Saving generated recipe...");

  const supabase = await supabaseClientPublic();
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
  };

  const { error } = await supabase.from("generations").insert([data]);

  if (error) {
    console.error(" Supabase Insert Error (generations):", error);
    throw new Error("Failed to save generation.");
  }

  console.log(" Generation saved successfully.");
  revalidatePath("/");
}

//  Save user recipe (Private)
export async function saveRecipe(generatedRecipe) {
  console.log("Saving user recipe...");

  const { userId } = auth();
  if (!userId) {
    console.error("User is not authenticated.");
    throw new Error("User ID not found");
  }

  const supabase = await supabaseClient();
  const data = {
    user_id: userId,
    title: generatedRecipe.title,
    description: generatedRecipe.description,
    content_json: generatedRecipe,
    ingredients: generatedRecipe.ingredients,
    difficulty: generatedRecipe.difficulty,
    cooking_time: generatedRecipe.cooking_time,
    people: generatedRecipe.people,
    low_calories: generatedRecipe.low_calories, // Fixed typo
    vegan: generatedRecipe.vegan,
    paleo: generatedRecipe.paleo,
    calories: generatedRecipe.calories,
    proteins: generatedRecipe.macros.protein,
    fats: generatedRecipe.macros.fats,
    carbs: generatedRecipe.macros.carbs,
  };

  const { error } = await supabase.from("recipes").insert([data]);

  if (error) {
    console.error("Supabase Insert Error (recipes):", error);
    throw new Error("Failed to save the recipe.");
  }

  console.log("Recipe saved successfully.");
}

// Delete user recipe (Private)
export async function deleteRecipe(id: string) {
  console.log("🔹 Deleting recipe with ID:", id);

  const { userId } = auth();
  if (!userId) {
    console.error("User is not authenticated.");
    throw new Error("User ID not found");
  }

  const supabase = await supabaseClient();
  const { error } = await supabase.from("recipes").delete().eq("id", id);

  if (error) {
    console.error(" Supabase Delete Error:", error);
    throw new Error("Failed to delete the recipe.");
  }

  console.log(" Recipe deleted successfully.");
  revalidatePath("/dashboard/my-recipes");
}
