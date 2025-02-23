import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

console.log("🔹 Supabase URL:", supabaseUrl)
console.log("🔹 Supabase Key (First 6 chars):", supabaseKey?.slice(0, 6))

export const supabaseClient = (supabaseAccessToken: string) => {
  console.log("🔹 Creating authenticated Supabase client...")
  return createClient(supabaseUrl as string, supabaseKey as string, {
    global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  })
}

export const supabaseClientPublic = () => {
  console.log("🔹 Creating public Supabase client...")
  return createClient(supabaseUrl as string, supabaseKey as string)
}
