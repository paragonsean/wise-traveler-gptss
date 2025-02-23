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
        <PageHeaderHeading>Your Trip Itinerary is in Progress!</PageHeaderHeading>
        <PageHeaderDescription>
          Planning the perfect journey! Your travel itinerary is being crafted with amazing destinations and adventures! ✈️🌍
        </PageHeaderDescription>
      </PageHeader>
      <div className="mx-auto w-full max-w-3xl">
        <TripCardSkeleton />
      </div>
    </div>
  )
}
