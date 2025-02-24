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

interface TripCardProps {
  trip: Trip
  isPrivate?: boolean
}

export function TripCardPreview({ trip, isPrivate = false }: TripCardProps) {
  const isInternational = trip?.adventure === true
  const duration = trip?.duration?.toString().replaceAll(/[^0-9]/g, "")
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
          <div className="flex space-x-2">
            <Badge>{trip?.budget}</Badge>
            <Badge variant="secondary">{duration} days</Badge>
            {isInternational && <Badge variant="default">International</Badge>}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
