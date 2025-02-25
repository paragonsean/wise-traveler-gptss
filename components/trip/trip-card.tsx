"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { toast } from "sonner"

import { Trip } from "@/types/types"
import { saveTrip } from "@/lib/actions"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { tripInfo } from "@/components/trip/trip-constants"
import { SaveTripButton } from "@/components/trip/save-trip"

interface GeneratedTripContentProps {
  trip: Trip
}

export function TripCard({ trip }: GeneratedTripContentProps) {
  // Build data for a bar chart from numeric trip metrics.
  const metricChartData = [] // Update if your Trip has numeric metrics

  const onSaveTrip = async () => {
    toast.promise(saveTrip(trip), {
      loading: "Saving...",
      success: () => "Cool! Trip saved successfully.",
      error: "Oh No! Sign-In to save trips!",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{trip?.title}</CardTitle>
        <CardDescription>{trip?.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="grid space-y-6 rounded-lg border p-3 md:grid-cols-2 md:space-x-4 md:space-y-0">
          {/* Trip Overview Section */}
          <div className="grid grid-cols-2 gap-4 md:gap-0">
            <div className="col-span-2 mb-2 grid">
              <h3 className="text-lg font-semibold">Overview</h3>
            </div>
            {tripInfo.map((info, index) => (
              <div key={index} className="flex gap-2 text-muted-foreground">
                {info.icon}
                <span>
                  {trip[info.value]} {info.additionalText}
                </span>
              </div>
            ))}
          </div>
          {/* Trip Metrics BarChart Section */}
          <div className="grid grid-cols-1 gap-4 transition-all md:gap-0">
            <h3 className="text-lg font-semibold">Metrics</h3>
            <ResponsiveContainer width="100%" height={75}>
              <BarChart data={metricChartData} barCategoryGap="20%">
                <XAxis
                  dataKey="label"
                  stroke="#94a3b8"
                  fontSize={12}
                  height={15}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={12}
                  width={30}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar
                  dataKey="value"
                  fill="currentColor"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Itinerary Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Itinerary</h3>
          <ol className="list-disc pl-6">
            {(trip?.itinerary || []).map(
              (
                day: {
                  day: number
                  activities: {
                    time: string
                    activity: string
                    location: string
                    estimated_cost: number
                  }[]
                  recommended_food: {
                    restaurant: string
                    dish: string
                    estimated_cost: number
                  }
                },
                i: number
              ) => (
                <li key={`day-${day.day}-${i}`}>
                  Day {day.day}
                  <ul>
                    {day.activities.map((activity, j) => (
                      <li key={`activity-${j}`}>
                        {activity.time} - {activity.activity} at {activity.location} (Estimated Cost: ${activity.estimated_cost})
                      </li>
                    ))}
                    <li>
                      Recommended Food: {day.recommended_food.restaurant} -{" "}
                      {day.recommended_food.dish} (Estimated Cost: $
                      {day.recommended_food.estimated_cost})
                    </li>
                  </ul>
                </li>
              )
            )}
          </ol>
        </div>
        {/* Plan Details Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Plan Details</h3>
          <ol className="list-decimal pl-6">
            {(trip?.plan || []).map(
              (step: { step: number; description: string }, i: number) => (
                <li key={`${step.step}-${i}`}>{step.description}</li>
              )
            )}
          </ol>
        </div>
      </CardContent>
      <CardFooter>
        <SaveTripButton onClick={onSaveTrip} />
      </CardFooter>
    </Card>
  )
}
