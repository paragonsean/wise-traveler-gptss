import {
  BatteryFull,
  BatteryLow,
  BatteryMedium,
  Gem,
  Plane,
  TreePalm,
  Vegan,
  Wallet,
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
    icon: TreePalm,
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
    value: "expert",
    label: "Expert",
    icon: BatteryFull,
  },
]

export const destinations = [
  {
    value: "paris",
    label: "Paris",
    icon: Plane,
  },
  {
    value: "tokyo",
    label: "Tokyo",
    icon: Plane,
  },
  {
    value: "new-york",
    label: "New York",
    icon: Plane,
  },
  {
    value: "bali",
    label: "Bali",
    icon: TreePalm,
  },
  {
    value: "rome",
    label: "Rome",
    icon: Plane,
  },
]
