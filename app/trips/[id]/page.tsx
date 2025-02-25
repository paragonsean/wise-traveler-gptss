import { type Metadata } from "next"
import { notFound } from "next/navigation"

import { getTripPublic } from "@/lib/supabase-queries"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { TripCard } from "@/components/trip/trip-card"

interface TripPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata(props: TripPageProps): Promise<Metadata> {
  const params = await props.params;
  const id = params.id
  const [trip] = await Promise.all([getTripPublic(id)])

  if (!trip) {
    return {}
  }

  return {
    metadataBase: new URL("https://wise-traveler.app"),
    title: trip.title,
    description: trip.description,
  }
}

export default async function TripPage(props: TripPageProps) {
  const params = await props.params;
  const id = params.id
  const [trip] = await Promise.all([getTripPublic(id)])

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