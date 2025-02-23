import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"

export default function TripNotFound() {
  return (
    <div className="container grid ">
      <PageHeader>
        <PageHeaderHeading>Oops! Lost in Transit</PageHeaderHeading>
        <PageHeaderDescription>
          It seems like this trip itinerary has gone off the map! 🌍
          Let’s navigate back and explore another destination.
        </PageHeaderDescription>
        <PageActions>
          <Link href="/">
            <Button>Go Back Home</Button>
          </Link>
        </PageActions>
      </PageHeader>
    </div>
  )
}
