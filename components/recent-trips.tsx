import { getLatestTrips } from "@/lib/supabase-queries"
import { TripCardPreview } from "@/components/trip/trip-card-preview"

export async function RecentTrips() {
  try {
    const trips = await getLatestTrips()

    if (!trips || trips.length === 0) {
      return (
        <div className="text-center text-muted-foreground">
          <h2 className="text-2xl font-semibold tracking-tight">Recent Trips</h2>
          <p className="mt-2">No recent trips found.</p>
        </div>
      )
    }

    return (
      <div className="duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Trips</h2>
        <div className="grid gap-2 md:grid-cols-3 md:gap-6">
          {trips.map((trip) => (
            <TripCardPreview key={trip.id} trip={trip} />
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching recent trips:", error)
    return (
      <div className="text-center text-destructive">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Trips</h2>
        <p className="mt-2">Failed to load recent trips. Please try again later.</p>
      </div>
    )
  }
}
