"use client"

import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useCompletion } from "ai/react"
import { toast } from "sonner"

import { defaultValues, Trip, type FormData } from "@/types/types"
import { saveGeneration } from "@/lib/actions"
import { generatePrompt } from "@/lib/generate-prompt"
import { cn } from "@/lib/utils"
import { TripForm } from "@/components/form/trip-form"
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

  // Save trip only when a valid trip object is present
  useEffect(() => {
    if (trip) {
      saveGeneration(trip).catch((err) => {
        console.error("Error saving trip:", err)
        toast.error("Failed to save trip. Please try again.")
      })
    }
  }, [trip])
  const onSubmit = useCallback(
    async (values: FormData) => {
      // No event parameter
      setFormValues(values)

      try {
        const prompt = generatePrompt(values)
        const completion = await complete(prompt)

        if (!completion) {
          toast.error("Failed to generate trip plan. Try again.")
          return
        }

        const result = JSON.parse(completion)
        setTrip(result)
      } catch (error) {
        console.error("Error fetching or parsing trip data:", error)
        toast.error("Uh oh! Something went wrong. Please try again.")
      }
    },
    [complete]
  )

  // Memoize className to prevent unnecessary re-renders
  const containerClass = useMemo(
    () =>
      cn("mx-auto space-y-6 md:space-x-6 md:space-y-0", {
        "md:flex": isLoading || isTripVisible,
        "max-w-2xl": !isLoading && !isTripVisible,
      }),
    [isLoading, isTripVisible]
  )

  const formWrapperClass = useMemo(
    () => cn({ "md:flex md:w-1/3": isLoading || isTripVisible }),
    [isLoading, isTripVisible]
  )

  const tripContainerClass = useMemo(
    () => cn({ "md:flex md:flex-col md:w-2/3": isLoading || isTripVisible }),
    [isLoading, isTripVisible]
  )

  return (
    <div className="pb-24">
      <div className={containerClass}>
        <div className={formWrapperClass}>
          <TripForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
        <div className={tripContainerClass}>
          <div className="md:flex">
            {!isLoading && trip && <TripCard trip={trip} />}
            {isLoading && <TripCardSkeleton />}
          </div>
        </div>
      </div>
    </div>
  )
}
