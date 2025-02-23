import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { TripCardSkeleton } from "@/components/trip/trip-card-skeleton"

export default function TripLoading() {
  return (
    <div className="container grid animate-pulse">
      <PageHeader>
        <PageHeaderHeading>Your Vacation in the Making!</PageHeaderHeading>
        <PageHeaderDescription>
          Building up a travel plan...
        </PageHeaderDescription>
      </PageHeader>
      <div className="mx-auto w-full max-w-3xl">
        <TripCardSkeleton />
      </div>
    </div>
  )
}
