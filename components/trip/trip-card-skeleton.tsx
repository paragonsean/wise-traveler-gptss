import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Icons } from "@/components/icons"
import { tripInfo } from "@/components/trip/trip-constants"

export function TripCardSkeleton() {
  return (
    <Card className="w-full animate-pulse">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Your Trip is Being Planned!
        </CardTitle>
        <CardDescription>
          Sit tight! We are curating an amazing itinerary for you. ✈️🌍
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-sm text-muted-foreground">
        <div className="grid space-y-6 rounded-lg border p-3 md:grid-cols-2 md:space-x-4 md:space-y-0">
          {/* Trip Info Section */}
          <div className="grid grid-cols-2 gap-4 md:gap-0">
            <div className="col-span-2 mb-2 grid">
              <h3 className="text-lg font-semibold">Overview</h3>
            </div>
            {tripInfo.map((info, index) => (
              <div key={index} className="flex gap-2 text-muted-foreground">
                {info.icon}
                <Skeleton className="h-3 w-1/3" />
              </div>
            ))}
          </div>
          {/* Activities Section */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Activities</h3>
            <Skeleton className="h-3 w-2/3" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="lg" className="w-full">
          <Icons.save className="mr-2 size-4" aria-hidden="true" />
          Save
        </Button>
      </CardFooter>
    </Card>
  )
}
