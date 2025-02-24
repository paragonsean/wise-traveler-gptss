"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"

import { supabaseClient, supabaseClientPublic } from "@/lib/supabase-client"

//  Fetch private trips for the authenticated user
export async function getUserTrips() {
  console.log("Fetching user-specific trips...")

  const { userId } = auth()
  if (!userId) {
    console.error("User is not authenticated.")
    return { trips: [], data: [] }
  }

  try {
    const supabase = await supabaseClient()

    // Fetch saved trips
    const { data: trips, error: tripsError } = await supabase
      .from("trips")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (tripsError) {
      console.error(" Supabase Fetch Error (trips):", tripsError)
      return { trips: [], data: [] }
    }

    // Fetch generated trip plans
    const { data: generatedTrips, error: generatedError } = await supabase
      .from("generations")
      .select()
      .order("created_at", { ascending: false })
      .limit(3)

    if (generatedError) {
      console.error(" Supabase Fetch Error (generated trips):", generatedError)
      return { trips: [], data: [] }
    }

    console.log("User-specific trips fetched successfully.")
    return { trips: trips || [], data: generatedTrips || [] }
  } catch (error) {
    console.error("Unexpected error in `getUserTrips()`:", error)
    return { trips: [], data: [] }
  }
}
// Save generated trip plan (Public)
export async function saveGeneration(generatedTrip) {
  console.log("Saving generated trip...")

  const supabase = await supabaseClientPublic()
  const data = {
    content_json: generatedTrip,
    destination: generatedTrip.destination,
    budget: generatedTrip.budget,
    duration: generatedTrip.duration,
    group_size: generatedTrip.group_size,
    adventure:
      generatedTrip.preferences.adventure === "true" ||
      generatedTrip.preferences.adventure === true, //  Convert to boolean
    luxury:
      generatedTrip.preferences.luxury === "true" ||
      generatedTrip.preferences.luxury === true, //  Convert to boolean
    nature:
      generatedTrip.preferences.nature === "true" ||
      generatedTrip.preferences.nature === true, //  Convert to boolean
    description: generatedTrip.description,
  }

  const { error } = await supabase.from("generations").insert([data])

  if (error) {
    console.error(" Supabase Insert Error (generations):", error)
    throw new Error("Failed to save generated trip.")
  }

  console.log(" Trip plan saved successfully.")
  revalidatePath("/")
}

// Save user trip (Private)
export async function saveTrip(generatedTrip) {
  console.log("Saving user trip...")

  const { userId } = auth()
  if (!userId) {
    console.error(" User is not authenticated.")
    throw new Error("User ID not found")
  }

  const supabase = await supabaseClient()
  const data = {
    user_id: userId,
    destination: generatedTrip.destination,
    description: generatedTrip.description,
    content_json: generatedTrip,
    budget: generatedTrip.budget,
    duration: generatedTrip.duration,
    group_size: generatedTrip.group_size,
    adventure:
      generatedTrip.preferences.adventure === "true" ||
      generatedTrip.preferences.adventure === true, //  Convert to boolean
    luxury:
      generatedTrip.preferences.luxury === "true" ||
      generatedTrip.preferences.luxury === true, //  Convert to boolean
    nature:
      generatedTrip.preferences.nature === "true" ||
      generatedTrip.preferences.nature === true, //  Convert to boolean
  }

  const { error } = await supabase.from("trips").insert([data])

  if (error) {
    console.error(" Supabase Insert Error (trips):", error)
    throw new Error("Failed to save the trip.")
  }

  console.log(" Trip saved successfully.")
}

// Delete user trip (Private)
export async function deleteTrip(id: string) {
  console.log("Deleting trip with ID:", id)

  const { userId } = auth()
  if (!userId) {
    console.error("User is not authenticated.")
    throw new Error("User ID not found")
  }

  const supabase = await supabaseClient()
  const { error } = await supabase.from("trips").delete().eq("id", id)

  if (error) {
    console.error(" Supabase Delete Error:", error)
    throw new Error("Failed to delete the trip.")
  }

  console.log("Trip deleted successfully.")
  revalidatePath("/dashboard/my-trips")
}
