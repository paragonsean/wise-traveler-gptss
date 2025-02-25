"use client"

import Link from "next/link"

import type { Tables } from "@/types/database.types"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

type Trip = Tables<"trips">

interface TripCardPreviewProps {
  trip: Trip
  isPrivate?: boolean
}

export function TripCardPreview({
  trip,
  isPrivate = false,
}: TripCardPreviewProps) {
  // Determine which badges to show based on trip preferences.
  const isAdventure = trip?.adventure
  const isLuxury = trip?.luxury
  const isNature = trip?.nature

  // Use trip.duration (assumed to be in days) for display.
  const duration = trip?.duration

  // Set URL based on whether the trip is private.
  const href = isPrivate
    ? `/dashboard/my-trips/${trip.id}`
    : `/trips/${trip.id}`

  return (
    <Link href={href}>
      <Card className="my-4 hover:bg-accent hover:shadow-lg">
        <CardHeader className="grid items-start gap-4 space-y-0">
          <div className="space-y-1">
            <CardTitle className="line-clamp-1 text-lg">
              {trip?.destination}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {trip?.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-2">
            {isAdventure && <Badge variant="default">Adventure</Badge>}
            {isLuxury && <Badge variant="secondary">Luxury</Badge>}
            {isNature && <Badge variant="secondary">Nature</Badge>}
            {duration !== undefined && (
              <Badge variant="outline">Duration: {duration} days</Badge>
            )}
            {trip?.group_size && (
              <Badge variant="outline">Group: {trip.group_size}</Badge>
            )}
            {trip?.budget && (
              <Badge variant="outline">Budget: {trip.budget}</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
