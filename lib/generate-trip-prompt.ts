import { FormData } from "@/types/types"

export function generatePrompt(values: FormData): string {
  const tripPreferences = `
    - Adventure: ${values.adventure ? "Yes" : "No"}
    - Luxury: ${values.luxury ? "Yes" : "No"}
    - Nature: ${values.nature ? "Yes" : "No"}
  `

  return `
    You are an expert travel planner with years of experience crafting unique and unforgettable trips.
    Generate a personalized travel itinerary with the following considerations:

    **Rules:**
      - Response must be in **JSON format**.
      - The itinerary must have a **creative title**.
      - Provide a **detailed description** of the trip experience.
      - **Adhere to the following travel preferences:** ${tripPreferences}
      - Destination: **${values.destination}**
      - Budget: **${values.budget}**
      - Duration: **${values.duration} days**
      - Group size: **${values.group_size} travelers**
      - Suggest **daily activities** and **attractions to visit**.
      - Include recommended **local foods** or restaurants to try.
      - Suggest an estimated **cost breakdown** for accommodations, food, and activities.
      - Ensure a **well-balanced itinerary** with both relaxation and adventure.

    **The JSON object must include the following fields:**
    - "title": [string] (Trip title)
    - "description": [string] (Short description of the trip)
    - "destination": [string] (Based on the provided input)
    - "budget": [string] (Budget category: Budget, Mid-range, or Luxury)
    - "duration": [number] (Total number of days)
    - "group_size": [number] (Number of travelers)
    - "preferences": {"adventure": [boolean], "luxury": [boolean], "nature": [boolean]}
    - "itinerary": [
        {
          "day": [number],
          "activities": [
            {"time": [string], "activity": [string], "location": [string]}
          ]
        }
      ],
    - "cost_estimate": {
        "accommodation": [number],
        "food": [number],
        "activities": [number],
        "transport": [number],
        "total": [number]
      }

    **Format the response as a valid JSON object** with all fields filled. Here is the structure for reference:

    {
      "title": /* details */,
      "description": /* details */,
      "destination": /* details */,
      "budget": /* details */,
      "duration": /* details */,
      "group_size": /* details */,
      "preferences": { /* details */ },
      "itinerary": [ 
        { "day": /* details */, "activities": [ /* details */ ] } 
      ],
      "cost_estimate": { /* details */ }
    }

    **Respond only with the completed JSON object, without any additional explanatory or descriptive text.**
  `
}
