import { OpenAI } from "openai"

export const runtime = "edge"

if (!process.env.OPENAI_API_KEY) {
  console.error(" Missing OpenAI API Key. Set OPENAI_API_KEY in environment variables.")
  throw new Error("Missing OpenAI API Key.")
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

//  Function to clean up and fix malformed JSON before parsing
function fixMalformedJson(rawJson: string): string {
  return rawJson
    .replace(/([{,])\s*([\w-]+)\s*:/g, '$1"$2":') //  Ensure keys are quoted
    .replace(/:\s*([\w-]+)([,\n}])/g, ': "$1"$2') //  Fix unquoted string values
    .replace(/,\s*}/g, '}') //  Remove trailing commas before closing braces
    .replace(/,\s*]/g, ']') //  Remove trailing commas before closing brackets
    .replace(/(?<!\w)undefined(?!\w)/g, 'null') //  Replace "undefined" with "null"
    .replace(/\\n/g, " ") //  Replace unnecessary new lines
    .trim();
}

export async function POST(req: Request) {
  try {
    console.log(" Received a POST request for trip planning.")

    const { prompt } = await req.json()
    console.log(" Extracted prompt:", prompt)

    if (!prompt) {
      console.warn("⚠️ No prompt provided in request body.")
      return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 })
    }

    console.log("Calling OpenAI API with trip planning prompt...")

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      temperature: 0.7,
      max_tokens: 1000,
      stream: false, // Disable streaming for debugging
      messages: [
        { role: "user", content: prompt },
        { role: "system", content: "You are an expert travel planner. Generate a well-formatted JSON travel itinerary. Ensure all JSON properties are properly quoted and formatted." },
      ],
    })

    console.log(" OpenAI API response received.")

    // Extract response content
    let rawContent = response.choices[0]?.message?.content ?? ""

    //  Clean up JSON format
    rawContent = rawContent.replace(/```json|```/g, "").trim()
    rawContent = fixMalformedJson(rawContent)

    console.log("Fixed OpenAI Response:", rawContent)

    //  Parse JSON safely
    let jsonResponse
    try {
      jsonResponse = JSON.parse(rawContent)

      if (!jsonResponse || typeof jsonResponse !== "object") {
        throw new Error("Invalid JSON structure")
      }

      //  Ensure required fields exist
      jsonResponse = {
        title: jsonResponse.title || "Unknown Trip",
        description: jsonResponse.description || "No description provided.",
        destination: jsonResponse.destination || "Unknown",
        budget: jsonResponse.budget || "Mid-range",
        duration: jsonResponse.duration || 5,
        group_size: jsonResponse.group_size || 1,
        preferences: jsonResponse.preferences || { adventure: false, luxury: false, nature: false },
        itinerary: Array.isArray(jsonResponse.itinerary) ? jsonResponse.itinerary.filter((day) => Object.keys(day).length > 0) : [],
        cost_estimate: jsonResponse.cost_estimate || { accommodation: 0, food: 0, activities: 0, transport: 0, total: 0 }
      }

      console.log(" Final JSON Response:", JSON.stringify(jsonResponse, null, 2))

      return new Response(JSON.stringify(jsonResponse), { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (error) {
      console.error(" Error parsing OpenAI response as JSON:", error)
      return new Response(JSON.stringify({ error: "Invalid JSON format received from OpenAI." }), { status: 500 })
    }
  } catch (error) {
    console.error(" Error in OpenAI request:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
