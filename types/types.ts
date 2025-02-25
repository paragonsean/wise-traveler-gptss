import * as z from "zod"
import { ReactNode } from "react"

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
}

//  Fix: Ensure `duration` is a single number, not an array.
export const formSchema = z.object({
  destination: z.string().min(2, {
    message: "Please enter a valid destination",
  }),
  duration: z.number().min(1).max(30), // Ensure duration is a number, not an array.
  group_size: z.enum(["1", "2", "4+"]), // Ensure correct enum validation.
  budget: z.enum(["Budget", "Mid-range", "Luxury"]).default("Mid-range"), // Use enum for budget validation.
  adventure: z.boolean().default(false),
  luxury: z.boolean().default(false),
  nature: z.boolean().default(false),
})

export type FormData = z.infer<typeof formSchema>

//  Fix: Ensure `duration` is a number, not an array.
export const defaultValues: FormData = {
  destination: "",
  duration: 5, //  Use a single number instead of an array.
  group_size: "2",
  budget: "Mid-range",
  adventure: false,
  luxury: false,
  nature: true, // Assume nature trips are default
}
export interface Trip {
  title: ReactNode
  plan: any
  id: string
  destination: string
  description: string
  budgetBreakdown: Record<string, number>
  itinerary: Array<{
    day: number
    activities: Array<{
      time: string
      activity: string
      location: string
      estimated_cost: number
    }>
    recommended_food: {
      restaurant: string
      dish: string
      estimated_cost: number
    }
  }>
  activities: Array<{ name: string; time: string }>
}
