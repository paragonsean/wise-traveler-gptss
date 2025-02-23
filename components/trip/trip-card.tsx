"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { toast } from "sonner"

import { Trip } from "@/types/types"
import { saveTrip } from "@/lib/tripactions"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {  tripInfo } from "@/components/trip/trip-constants"
import { SaveTripButton } from "@/components/trip/save-trip"

interface GeneratedTripContentProps {
  trip: Trip
}
export function TripCard({ trip }: GeneratedTripContentProps) {
  if (!trip) {
    return <p className="text-center text-gray-500">No trip data available.</p>
  }

  const budgetChartData = trip?.budgetBreakdown
    ? tripInfo.map((category) => ({
        label: category.value,
        value: trip.budgetBreakdown?.[category.value] || 0, //  Prevent undefined errors
      }))
    : []

  const onSaveTrip = async () => {
    if (!trip) return
    toast.promise(saveTrip(trip), {
      loading: "Saving...",
      success: "Awesome! Trip saved successfully.",
      error: "Oops! Sign in to save trips!",
    })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{trip?.destination || "Unknown Destination"}</CardTitle>
        <CardDescription>{trip?.description || "No description available."}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {/* Budget Chart */}
        {budgetChartData.length > 0 && (
          <div className="grid grid-cols-1 gap-4 transition-all md:gap-0">
            <h3 className="text-lg font-semibold">Budget Breakdown</h3>
            <ResponsiveContainer width="100%" height={75}>
              <BarChart data={budgetChartData} barCategoryGap="20%">
                <XAxis dataKey="label" stroke="#94a3b8" fontSize={12} height={15} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} width={30} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Bar dataKey="value" fill="currentColor" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Activities Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Planned Activities</h3>
          <ol className="list-disc pl-6">
            {trip?.activities?.length ? (
              trip.activities.map((activity, i) => (
                <li key={`activity-${i}`}>
                  {activity?.name || "Activity"} - {activity?.time || "Time TBD"}
                </li>
              ))
            ) : (
              <p>No planned activities yet.</p>
            )}
          </ol>
        </div>

        {/* Itinerary Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Daily Itinerary</h3>
          <ol className="list-decimal pl-6">
            {trip?.itinerary?.length ? (
              trip.itinerary.map((dayPlan, i) => (
                <li key={`dayPlan-${i}`}>
                  <strong>Day {dayPlan?.day || "N/A"}:</strong> <br />
                  {dayPlan?.activities?.length ? (
                    <ul>
                      {dayPlan.activities.map((activity, j) => (
                        <li key={`activity-${i}-${j}`}>
                          {activity?.time || "Time TBD"} - {activity?.activity || "Activity TBD"} at {activity?.location || "Unknown"} (Estimated cost: ${activity?.estimated_cost || 0})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No activities planned.</p>
                  )}
                  <p>
                    <strong>Recommended Food:</strong> {dayPlan?.recommended_food?.restaurant || "No recommendation"} - {dayPlan?.recommended_food?.dish || "N/A"} (Estimated cost: ${dayPlan?.recommended_food?.estimated_cost || 0})
                  </p>
                </li>
              ))
            ) : (
              <p>No itinerary available.</p>
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
