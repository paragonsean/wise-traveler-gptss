import { supabaseClient, supabaseClientPublic } from "@/lib/supabase-client"

export const getRecipesByUserId = async (userId, supabaseAccessToken) => {
  console.log("getRecipesByUserId called with userId:", userId)
  const supabase = await supabaseClient(supabaseAccessToken as string)
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select()
    .eq("id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error in getRecipesByUserId:", error)
  } else {
    console.log("getRecipesByUserId result:", recipes)
  }

  return recipes
}

export async function getLatestRecipes() {
  console.log("getLatestRecipes called")
  const supabase = await supabaseClientPublic()
  try {
    const { data: recipes, error } = await supabase
      .from("generations")
      .select()
      .range(0, 2)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error in getLatestRecipes:", error)
    } else {
      console.log("getLatestRecipes result:", recipes)
    }

    return recipes
  } catch (error) {
    console.error("Error in getLatestRecipes:", error)
    return null
  }
}

export async function getRecipe(id: string) {
  console.log("getRecipe called with id:", id)
  const supabase = await supabaseClientPublic()
  try {
    const { data: recipe, error } = await supabase
      .from("recipes")
      .select("content_json")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error in getRecipe:", error)
    } else {
      console.log("getRecipe result:", recipe)
    }

    return recipe
  } catch (error) {
    console.error("Error in getRecipe:", error)
    return null
  }
}

export async function getRecipesCount() {
  console.log("getRecipesCount called")
  const supabase = await supabaseClientPublic()
  try {
    const { count, error } = await supabase
      .from("generations")
      .select("*", { count: "exact", head: true })

    if (error) {
      console.error("Error in getRecipesCount:", error)
    } else {
      console.log("getRecipesCount result:", count)
    }

    return count
  } catch (error) {
    console.error("Error in getRecipesCount:", error)
    return null
  }
}

export async function getRecipePublic(id: string) {
  console.log("getRecipePublic called with id:", id)
  const supabase = await supabaseClientPublic()
  try {
    const { data: recipe, error } = await supabase
      .from("generations")
      .select("content_json")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error in getRecipePublic:", error)
    } else {
      console.log("getRecipePublic result:", recipe)
    }

    return recipe ? recipe.content_json : null
  } catch (error) {
    console.error("Error in getRecipePublic:", error)
    return null
  }
}

export async function getRecipePrivate(id: string, supabaseAccessToken) {
  console.log("getRecipePrivate called with id:", id)
  const supabase = await supabaseClient(supabaseAccessToken as string)
  try {
    const { data: recipe, error } = await supabase
      .from("recipes")
      .select("content_json")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error in getRecipePrivate:", error)
    } else {
      console.log("getRecipePrivate result:", recipe)
    }

    return recipe ? recipe.content_json : null
  } catch (error) {
    console.error("Error in getRecipePrivate:", error)
    return null
  }
}
