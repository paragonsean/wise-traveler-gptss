"use client"

import React, { useCallback, useEffect, useState } from "react"
import { useCompletion } from "ai/react"
import { toast } from "sonner"

import { defaultValues, Trip, type FormData } from "@/types/types"
import { getUserTrips, saveGeneration } from "@/lib/actions"
import { generatePrompt } from "@/lib/generate-prompt"
import { cn } from "@/lib/utils"
import { TripForm } from "@/components/form/TripForm"
import { TripCard } from "@/components/trip/trip-card"
import { TripCardSkeleton } from "@/components/trip/trip-card-skeleton"

export function GenerateTrip() {
  const [isTripVisible, setIsTripVisible] = useState<boolean>(false)
  const [formValues, setFormValues] = useState<FormData>(defaultValues)
  const [trip, setTrip] = useState<Trip | null>(null)

  const { complete, isLoading } = useCompletion({
    api: "/api/generate-trip",
    onFinish: () => {
      setIsTripVisible(true)
    },
  })

  useEffect(() => {
    if (trip) {
      saveGeneration(trip)
    }
  }, [trip])

  const onSubmit = useCallback(
    async (values: FormData, e: React.FormEvent) => {
      const prompt = generatePrompt(values)
      const completion = await complete(prompt)
      setFormValues(values)

      if (!completion) {
        throw new Error("Failed to generate trip plan. Try again.")
      }

      try {
        //  Step 1: Remove code block markers (` ```json ` and ` ``` `)
        let cleanedCompletion = completion.replace(/```json|```/g, "").trim()

        //  Step 2: Fix improperly escaped quotes
        cleanedCompletion = cleanedCompletion.replace(/\\"/g, '"')

        //  Step 3: Ensure keys are properly wrapped in double quotes
        cleanedCompletion = cleanedCompletion.replace(
          /([{,])(\s*)([a-zA-Z0-9_]+)(\s*):/g,
          '$1"$3":'
        )

        //  Step 4: Parse JSON safely
        const result = JSON.parse(cleanedCompletion)

        console.log("Parsed Trip Plan:", result) // Show parsed JSON in console
        setTrip(result) //  Update state with parsed JSON
      } catch (error) {
        console.error("Error parsing JSON:", error)
        toast.error("Uh oh! Failed to generate trip plan. Try again.")
      }
    },
    [complete]
  )

  return (
    <div className="pb-24">
      <div
        className={cn("mx-auto space-y-6 md:space-x-6 md:space-y-0", {
          "md:flex": isLoading || isTripVisible,
          "max-w-2xl": !isLoading && !isTripVisible,
        })}
      >
        <div
          className={cn({
            "md:flex md:w-1/3": isLoading || isTripVisible,
          })}
        >
          <TripForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
        <div
          className={cn({
            "md:flex md:flex-col md:w-2/3": isLoading || isTripVisible,
          })}
        >
          <div className="md:flex">
            {!isLoading && trip && <TripCard trip={trip} />}
            {isLoading && <TripCardSkeleton />}
          </div>
        </div>
      </div>
    </div>
  )
}
