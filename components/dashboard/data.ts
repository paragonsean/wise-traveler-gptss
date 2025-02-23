import {
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Beef,
  Vegan,
  Wallet, 
  Plane, 
  Gem 
} from "lucide-react"

export const budgets = [
  {
    value: "budget",
    label: "Budget",
    icon: Wallet,
  },
  {
    value: "mid-range",
    label: "Mid-Range",
    icon: Plane,
  },
  {
    value: "luxury",
    label: "Luxury",
    icon: Gem,
  },
]

export const statuses = [
  {
    label: "Adventure",
    value: "adventure",
    icon: Gem,
  },
  {
    label: "Luxury",
    value: "luxury",
    icon: Gem,
  },
  {
    label: "Nature",
    value: "nature",
    icon: Gem,
  },
]
export const difficulties = [
  {
    value: "easy",
    label: "Easy",
    icon: BatteryLow,
  },
  {
    value: "medium",
    label: "Medium",
    icon: BatteryMedium,
  },
  {
    value: "Expert",
    label: "expert",
    icon: BatteryFull,
  },
]
