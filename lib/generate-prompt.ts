import { FormData } from "@/types/types"

export function generatePrompt(values: FormData): string {
  const tripPreferences = `
    - Adventure: ${values.adventure ? "Yes" : "No"}
    - Luxury: ${values.luxury ? "Yes" : "No"}
    - Nature: ${values.nature ? "Yes" : "No"}
  `

  return `
    You are an expert travel planner who designs **unique** and **personalized** travel itineraries. 
    **Generate a well-balanced itinerary** for an **unforgettable** trip based on the following preferences:

    **Trip Details:**
    - **Destination:** ${values.destination}
    - **Budget:** ${values.budget} (Budget, Mid-range, or Luxury)
    - **Duration:** ${values.duration} days
    - **Group Size:** ${values.group_size} travelers
    - **Travel Preferences:** 
      ${tripPreferences}

    **Rules for Itinerary Generation:**
    - **Format**: Return a valid **JSON object**.
    - **Title**: Provide a **catchy and exciting** title for the trip.
    - **Description**: Summarize the **unique experience** of the trip.
    - **Daily Itinerary**:
      - List **daily activities** with the **time, activity name, and location**.
      - Include at least **one recommended restaurant or local dish** per day.
      - Suggest a mix of **sightseeing, adventure, cultural experiences, and relaxation**.
      - Ensure activities match the traveler’s **budget and preferences**.
    - **Cost Breakdown**:
      - Provide an **estimated budget** for **accommodation, food, activities, and transport**.
      - Ensure the cost **matches the selected budget type**.
      - Show a **total estimated cost**.

    **The JSON object must include these fields:**
    - **title**: [string] (Trip title)
    - **description**: [string] (Short description of the trip)
    - **destination**: [string] (Destination provided by the user)
    - **budget**: [string] (Budget category: Budget, Mid-range, or Luxury)
    - **duration**: [number] (Total trip length in days)
    - **group_size**: [number] (Number of travelers)
    - **preferences**: { "adventure": [boolean], "luxury": [boolean], "nature": [boolean] }
    - **itinerary**: [
        {
          "day": [number],
          "activities": [
            {
              "time": [string], 
              "activity": [string], 
              "location": [string], 
              "estimated_cost": [number]
            }
          ],
          "recommended_food": {
            "restaurant": [string], 
            "dish": [string], 
            "estimated_cost": [number]
          }
        }
      ]
    - **cost_estimate**: {
        "accommodation": [number],
        "food": [number],
        "activities": [number],
        "transport": [number],
        "total": [number]
      }

    **Example JSON Structure:**
    {
      "title": "Tropical Adventure in Bali",
      "description": "Experience Bali’s rich culture, stunning beaches, and thrilling adventures...",
      "destination": "Bali, Indonesia",
      "budget": "Mid-range",
      "duration": 7,
      "group_size": 2,
      "preferences": { "adventure": true, "luxury": false, "nature": true },
      "itinerary": [
        {
          "day": 1,
          "activities": [
            { "time": "10:00 AM", "activity": "Visit Uluwatu Temple", "location": "Uluwatu", "estimated_cost": 15 },
            { "time": "1:00 PM", "activity": "Relax at Padang Padang Beach", "location": "South Bali", "estimated_cost": 5 }
          ],
          "recommended_food": {
            "restaurant": "Warung Made", 
            "dish": "Nasi Goreng", 
            "estimated_cost": 10
          }
        }
      ],
      "cost_estimate": {
        "accommodation": 500,
        "food": 200,
        "activities": 300,
        "transport": 150,
        "total": 1150
      }
    }

    **Respond ONLY with the completed JSON object. No extra text or explanations.**
  `
}
