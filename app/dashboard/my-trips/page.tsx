import { type Metadata } from "next"

import type { Tables } from "@/types/database.types"
import { getTripsByUserId, getTripsPrivate } from "@/lib/supabase-queries"
import { columns } from "@/components/dashboard/trip-columns"
import { DataTable } from "@/components/dashboard/data-table"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { TripCardPreview } from "@/components/trip/trip-card-preview"

type Trip = Tables<"trips">

export const metadata: Metadata = {
  metadataBase: new URL("https://wise-traveler.app"),
  title: "Your Travel Plans",
  description:
    "Explore your saved trips in one place. Your next adventure starts here!",
}

export default async function TripPage() {

  const trips = await getTripsByUserId()
  const data = await getTripsPrivate()

  return (
    <div className="container grid">
      <PageHeader>
        <PageHeaderHeading>Your Travel Plans</PageHeaderHeading>
        <PageHeaderDescription>
          Explore your saved trips in one place. Your adventure and journey across the world starts
          here!
        </PageHeaderDescription>
      </PageHeader>
      {data && <DataTable columns={columns} data={data} />}
      <div className="grid gap-4 md:grid-cols-3">
        {trips?.map((trip) => (
          <div key={trip.id}>
            <TripCardPreview trip={trip as Trip} isPrivate />
          </div>
        ))}
      </div>
    </div>
  )
}
