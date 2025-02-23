import { RecipeTable } from "@/components/dashboard/columns";
import { supabaseClient, supabaseClientPublic } from "@/lib/supabase-client";
import { auth } from "@clerk/nextjs";

// Fetch user-specific recipes (Private)
export async function getrecipesByUserId() {
  console.log("Fetching recipes for authenticated user...");

  const { userId } = auth();
  if (!userId) {
    console.error("User is not authenticated.");
    return [];
  }

  try {
    const supabase = await supabaseClient();

    const { data: recipes, error } = await supabase
      .from("recipes")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase Fetch Error in `getrecipesByUserId()`:", error);
      return [];
    }

    console.log("User recipes fetched successfully.");
    return recipes || [];
  } catch (error) {
    console.error("Unexpected error in `getrecipesByUserId()`:", error);
    return [];
  }
}

//  Fetch latest generated recipes (Public)
export async function getLatestrecipes() {
  console.log("🔹 Fetching latest generated recipes...");

  const supabase = supabaseClientPublic();
  try {
    const { data: recipes, error } = await supabase
      .from("generations")
      .select()
      .order("created_at", { ascending: false })
      .limit(3);

    if (error) {
      console.error(" Error in `getLatestrecipes()`:", error);
      return [];
    }

    console.log("Latest recipes fetched successfully.");
    return recipes;
  } catch (error) {
    console.error("Unexpected error in `getLatestrecipes()`:", error);
    return [];
  }
}

// Fetch a specific recipe by ID (Public)
export async function getRecipe(id: string) {
  console.log("Fetching recipe with ID:", id);

  const supabase = supabaseClientPublic();
  try {
    const { data: recipe, error } = await supabase
      .from("recipes")
      .select("content_json")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error in `getRecipe()`:", error);
      return null;
    }

    console.log("Recipe fetched successfully.");
    return recipe;
  } catch (error) {
    console.error(" Unexpected error in `getRecipe()`:", error);
    return null;
  }
}

// Get total recipe count
export async function getrecipesCount() {
  console.log("Counting total recipes...");

  const supabase = supabaseClientPublic();
  try {
    const { count, error } = await supabase
      .from("generations")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error in `getrecipesCount()`:", error);
      return 0;
    }

    console.log("otal recipes counted successfully:", count);
    return count;
  } catch (error) {
    console.error("Unexpected error in `getrecipesCount()`:", error);
    return 0;
  }
}

// Fetch public recipe by ID (From "generations" Table)
export async function getRecipePublic(id: string) {
  console.log("Fetching public recipe with ID:", id);

  const supabase = supabaseClientPublic();
  try {
    const { data: recipe, error } = await supabase
      .from("generations")
      .select("content_json")
      .eq("id", id)
      .single();

    if (error) {
      console.error(" Error in `getRecipePublic()`:", error);
      return null;
    }

    console.log("Public recipe fetched successfully.");
    return recipe ? recipe.content_json : null;
  } catch (error) {
    console.error(" Unexpected error in `getRecipePublic()`:", error);
    return null;
  }
}

// Fetch a private recipe (Requires authentication)
export async function getRecipePrivate(id: string) {
  console.log("Fetching private recipe with ID:", id);

  const supabase = await supabaseClient(); // ✅ Uses authenticated Supabase client
  try {
    const { data: recipe, error } = await supabase
      .from("recipes")
      .select("content_json")
      .eq("id", id)
      .single();

    if (error) {
      console.error(" Error in `getRecipePrivate()`:", error);
      return null;
    }

    console.log("Private recipe fetched successfully.");
    return recipe ? recipe.content_json : null;
  } catch (error) {
    console.error("Unexpected error in `getRecipePrivate()`:", error);
    return null;
  }
}
export async function getrecipesPrivate(): Promise<RecipeTable[] | null> {
  const { getToken, userId } = auth()
  const supabaseAccessToken = await getToken({ template: "supabase" })
  const supabase = await supabaseClient()
  try {
    const { data: recipes } = await supabase
      .from("recipes")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    return recipes || null
  } catch (error) {
    console.error("Error:", error)
    return null
  }

}

