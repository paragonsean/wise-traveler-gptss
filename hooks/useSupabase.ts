import { useSession } from "@clerk/nextjs"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

export function useSupabase() {
  const { session } = useSession()
  const [supabase, setSupabase] = useState<any>(null)

  useEffect(() => {
    async function initializeSupabase() {
      if (!session) {
        console.warn("⚠ No Clerk session found.")
        return
      }

      const clerkToken = await session.getToken({
        template: "supabase", // 🔹 Ensure this template exists in Clerk Dashboard
      })

      if (!clerkToken) {
        console.error("❌ Clerk token could not be retrieved.")
        return
      }

      console.log("🔹 Clerk Supabase Token (First 6 chars):", clerkToken?.slice(0, 6))

      const client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${clerkToken}`,
            },
          },
        }
      )

      setSupabase(client)
    }

    initializeSupabase()
  }, [session])

  return supabase
}
