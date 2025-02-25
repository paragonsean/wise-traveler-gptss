import { type Metadata } from "next"
import { notFound } from "next/navigation"
import { auth } from "@clerk/nextjs/server"

import { getTripPrivate } from "@/lib/supabase-queries"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { TripCard } from "@/components/trip/trip-card"

export const metadata: Metadata = {
  metadataBase: new URL("https://wise-traveler.app"),
  title: "My Trips",
  description: "Manage your travel plans."
}

interface TripPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function TripPage(props: TripPageProps) {
  const params = await props.params
  const { getToken } = await auth()
  const id = params.id
  const [trip] = await Promise.all([getTripPrivate(id)])

  if (!trip) {
    notFound()
  }

  return (
    <div className="container grid">
      <PageHeader>
        <PageHeaderHeading>{trip.title}</PageHeaderHeading>
        <PageHeaderDescription>{trip.description}</PageHeaderDescription>
      </PageHeader>
      <div className="mx-auto w-full max-w-3xl">
        <TripCard trip={trip} />
      </div>
    </div>
  )
}
