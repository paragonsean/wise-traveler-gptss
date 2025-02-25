import { NextResponse } from "next/server"
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const publicRoutes = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/dashboard(.*)",
  "/dashboard/account(.*)",
  "/dashboard/account/security(.*)",
  "/sign-out",
  "/dashboard/account/[[...rest]]/page.tsx",
  "/dashboard/my-trips(.*)",
  "/dashboard/my-trips/[[...rest]]/page.tsx",
  "/dashboard/trips(.*)",
  "/dashboard/trips/[[...rest]]/page.tsx",
  "/api(.*)",
  "/my-trips(.*)",
  "/my-trips/[[...rest]]/page.tsx",
  "/trips(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (publicRoutes(req)) {
    // For public routes, no need for authentication.
    return NextResponse.next()
  }

  const { userId } = await auth()
  if (!userId) {
    // For non-public routes, if there's no authenticated user, redirect to sign-in.
    const url = new URL(req.nextUrl.origin)
    url.pathname = "/sign-in"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
