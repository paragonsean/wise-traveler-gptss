import { Suspense } from "react"

import { GenerateRecipe } from "@/components/generate-recipe"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { RecentRecipes } from "@/components/recent-recipes"

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
          Free. Open Source. Trip Planner generator powered by OpenAI and ChatGPT.
        </PageHeaderDescription>
      </PageHeader>
      <GenerateRecipe />
      <Suspense>
        <RecentRecipes />
      </Suspense>
    </div>
  )
}
