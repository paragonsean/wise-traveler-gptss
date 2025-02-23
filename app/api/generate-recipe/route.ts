import { OpenAI } from "openai"

export const runtime = "edge"

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OpenAI API Key. Set OPENAI_API_KEY in environment variables.")
  throw new Error("Missing OpenAI API Key.")
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    console.log("Received a POST request.")

    const { prompt } = await req.json()
    console.log("Extracted prompt:", prompt)

    if (!prompt) {
      console.warn("No prompt provided in request body.")
      return new Response(JSON.stringify({ error: "Prompt is required" }), { status: 400 })
    }

    console.log("Calling OpenAI API with prompt...")

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      temperature: 0.6,
      frequency_penalty: 0.2,
      presence_penalty: 0.3,
      max_tokens: 700,
      stream: true,
      n: 1,
      messages: [
        { role: "user", content: prompt },
        { role: "system", content: "You are an expert culinary chef" },
      ],
    })

    console.log("OpenAI API response received.")

    // Convert OpenAI stream response to a valid ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of response) {
          console.log("🔹 OpenAI Stream Chunk:", chunk)

          if (chunk.choices && chunk.choices.length > 0) {
            const content = chunk.choices[0]?.delta?.content
            if (content) {
              controller.enqueue(content) // Ensures only valid strings are written
            }
          }
        }
        controller.close()
      },
    })

    console.log("Returning streaming response to client.")
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    })
  } catch (error) {
    console.error("🚨 Error in OpenAI request:", error)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 })
  }
}
