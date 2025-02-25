import "@/styles/globals.css"

import { Metadata, Viewport } from "next"
import { ClerkProvider } from "@clerk/nextjs"
import { auth } from "@clerk/nextjs/server" // ✅ Correct Import
import { Toaster } from "sonner"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  metadataBase: new URL("https://wise-traveler.app"),

  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },

  description: siteConfig.description,

  keywords: [
    "Wise Traveler",
    "Trip Planner AI",
    "AI Travel Assistant",
    "Vacation Planner",
    "Smart Travel Guide",
    "Trip Itinerary Generator",
    "AI-Powered Travel",
  ],

  authors: [
    {
      name: "Your Name",
      url: "https://github.com/yourprofile",
    },
  ],

  creator: "Wise Traveler Team",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@wise_traveler",
  },

  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const { userId } = await auth() // ✅ Correct usage

  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {userId ? <p>Welcome back!</p> : <p>Please sign in.</p>}
            {children}
          </ThemeProvider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}
