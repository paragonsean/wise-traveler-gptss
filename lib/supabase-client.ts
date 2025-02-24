import { auth } from "@clerk/nextjs"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!

// Authenticated Supabase client (fetches token inside)
export async function supabaseClient() {
  console.log("Initializing authenticated Supabase client...")

  const { getToken } = auth()
  const supabaseAccessToken = await getToken({ template: "supabase" })

  if (!supabaseAccessToken) {
    throw new Error("Supabase Access Token is missing")
  }

  console.log("Authenticated Supabase client initialized.")
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  })
}

// Public client (no authentication required)
export function supabaseClientPublic() {
  console.log("Creating public Supabase client...")
  return createClient(supabaseUrl, supabaseAnonKey)
}
