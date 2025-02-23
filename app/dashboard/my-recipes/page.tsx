import { type Metadata } from "next"

import type { Tables } from "@/types/database.types"
import { getrecipesByUserId, getrecipesPrivate } from "@/lib/supabase-queries"
import { columns } from "@/components/dashboard/columns"
import { DataTable } from "@/components/dashboard/data-table"
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "@/components/layout/page-header"
import { RecipeCardPreview } from "@/components/recipe/recipe-card-preview"

type Recipe = Tables<"recipes">

export const metadata: Metadata = {
  metadataBase: new URL("https://chef-genie.app"),
  title: "Your Culinary Creations",
  description:
    "Explore your saved recipes in one place. Your culinary journey starts here!",
}

export default async function RecipePage() {

  const recipes = await getrecipesByUserId()
  const data = await getrecipesPrivate()

  return (
    <div className="container grid">
      <PageHeader>
        <PageHeaderHeading>Your Travel Plans </PageHeaderHeading>
        <PageHeaderDescription>
          Explore your saved Trips  in one place. Your adventure and  journey across the world starts
          here!
        </PageHeaderDescription>
      </PageHeader>
      {data && <DataTable columns={columns} data={data} />}
      <div className="grid gap-4 md:grid-cols-3">
        {recipes?.map((recipe) => (
          <div key={recipe.id}>
            <RecipeCardPreview recipe={recipe as Recipe} isPrivate />
          </div>
        ))}
      </div>
    </div>
  )
}
