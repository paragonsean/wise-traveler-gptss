import { auth } from "@clerk/nextjs/server"

import { supabaseClient, supabaseClientPublic } from "@/lib/supabase-client"

import { TripTable } from "../components/dashboard/columns"

// Fetch user-specific trips (Private)
export async function getTripsByUserId() {
  console.log("Fetching trips for authenticated user...")

  const { userId } = await auth()
  if (!userId) {
    console.error("User is not authenticated.")
    return []
  }

  try {
    const supabase = await supabaseClient()

    const { data: trips, error } = await supabase
      .from("trips")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase Fetch Error in `getTripsByUserId()`:", error)
      return []
    }

    console.log("User trips fetched successfully.")
    return trips || []
  } catch (error) {
    console.error("Unexpected error in `getTripsByUserId()`:", error)
    return []
  }
}

// Fetch latest generated trips (Public)
export async function getLatestTrips() {
  console.log("Fetching latest generated trips...")

  const supabase = supabaseClientPublic()
  try {
    const { data: trips, error } = await supabase
      .from("generations")
      .select()
      .order("created_at", { ascending: false })
      .limit(3)

    if (error) {
      console.error(" Error in `getLatestTrips()`:", error)
      return []
    }

    console.log("Latest trips fetched successfully.")
    return trips
  } catch (error) {
    console.error("Unexpected error in `getLatestTrips()`:", error)
    return []
  }
}

// Fetch a specific trip by ID (Public)
export async function getTrip(id: string) {
  console.log("Fetching trip with ID:", id)

  const supabase = supabaseClientPublic()
  try {
    const { data: trip, error } = await supabase
      .from("generations")
      .select("content_json")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error in `getTrip()`:", error)
      return null
    }

    console.log("Trip fetched successfully.")
    return trip
  } catch (error) {
    console.error("Unexpected error in `getTrip()`:", error)
    return null
  }
}

// Get total trip count
export async function getTripsCount() {
  console.log("Counting total trips...")

  const supabase = supabaseClientPublic()
  try {
    const { count, error } = await supabase
      .from("generations")
      .select("*", { count: "exact", head: true })

    if (error) {
      console.error("Error in `getTripsCount()`:", error)
      return 0
    }

    console.log("Total trips counted successfully:", count)
    return count
  } catch (error) {
    console.error("Unexpected error in `getTripsCount()`:", error)
    return 0
  }
}

// Fetch public trip by ID (From "trip_plans" Table)
export async function getTripPublic(id: string) {
  console.log("Fetching public trip with ID:", id)

  const supabase = supabaseClientPublic()
  try {
    const { data: trip, error } = await supabase
      .from("generations")
      .select("content_json")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error in `getTripPublic()`:", error)
      return null
    }

    console.log("Public trip fetched successfully.")
    return trip ? trip.content_json : null
  } catch (error) {
    console.error("Unexpected error in `getTripPublic()`:", error)
    return null
  }
}

// Fetch a private trip (Requires authentication)
export async function getTripPrivate(id: string) {
  console.log("Fetching private trip with ID:", id)

  const supabase = await supabaseClient() //  Uses authenticated Supabase client
  try {
    const { data: trip, error } = await supabase
      .from("trips")
      .select("content_json")
      .eq("id", id)
      .single()

    if (error) {
      console.error("Error in `getTripPrivate()`:", error)
      return null
    }

    console.log("Private trip fetched successfully.")
    return trip ? trip.content_json : null
  } catch (error) {
    console.error("Unexpected error in `getTripPrivate()`:", error)
    return null
  }
}

// Fetch private trips (For authenticated users)
export async function getTripsPrivate(): Promise<TripTable[] | null> {
  const { getToken, userId } = await auth()
  const supabaseAccessToken = await getToken({ template: "supabase" })
  const supabase = await supabaseClient()

  try {
    const { data: trips } = await supabase
      .from("trips")
      .select()
      .eq("user_id", userId)
      .order("created_at", { ascending: false })

    return trips || null
  } catch (error) {
    console.error("Error:", error)
    return null
  }
}
