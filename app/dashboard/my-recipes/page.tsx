import { type Metadata } from "next"

import type { Tables } from "@/types/database.types"
import { getRecipesByUserId, getRecipesPrivate } from "@/lib/supabase-queries"
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

  const recipes = await getRecipesByUserId()
  const data = await getRecipesPrivate()

  return (
    <div className="container grid">
      <PageHeader>
        <PageHeaderHeading>Your Culinary Creations</PageHeaderHeading>
        <PageHeaderDescription>
          Explore your saved recipes in one place. Your culinary journey starts
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
