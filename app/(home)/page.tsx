import { Suspense } from "react"

import { GenerateTrip } from "@/components/generate-trip"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { RecentTrips } from "@/components/recent-trips"

export default async function IndexPage() {
  return (
    <div className="container grid">
      <PageHeader>
        <PageHeaderHeading>
          Say goodbye to travel planning with{" "}
          <span className="bg-gradient-to-r from-violet-500 to-teal-300 bg-clip-text text-transparent">
            {" WiseTraveler"}
          </span>
        </PageHeaderHeading>
        <PageHeaderDescription>
          Free. Open Source. AI-powered trip planner, helping you create personalized itineraries effortlessly.
        </PageHeaderDescription>
      </PageHeader>
      <GenerateTrip />
      <Suspense>
        <RecentTrips />
      </Suspense>
    </div>
  )
}
