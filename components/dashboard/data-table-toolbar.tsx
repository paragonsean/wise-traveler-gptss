"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableFacetedFilter } from "@/components/dashboard/data-table-faceted-filter"
import { DataTableViewOptions } from "@/components/dashboard/data-table-view-options"

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {/* 🔹 Updated Filter Placeholder for Trips */}
        <Input
          placeholder="Search trips..."
          value={
            (table.getColumn("destination")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("destination")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {/* 🔹 Trip Filters */}
        {table.getColumn("budget") && (
          <DataTableFacetedFilter
            column={table.getColumn("budget")}
            title="Budget"
            options={[
              { label: "Budget", value: "Budget" },
              { label: "Mid-range", value: "Mid-range" },
              { label: "Luxury", value: "Luxury" },
            ]}
          />
        )}

        {table.getColumn("group_size") && (
          <DataTableFacetedFilter
            column={table.getColumn("group_size")}
            title="Group Size"
            options={[
              { label: "Solo", value: "1" },
              { label: "Couple", value: "2" },
              { label: "Family", value: "4+" },
            ]}
          />
        )}

        {table.getColumn("preferences") && (
          <DataTableFacetedFilter
            column={table.getColumn("preferences")}
            title="Preferences"
            options={[
              { label: "Adventure", value: "adventure" },
              { label: "Luxury", value: "luxury" },
              { label: "Nature", value: "nature" },
            ]}
          />
        )}

        {/* 🔹 Reset Filters Button */}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 size-4" />
          </Button>
        )}
      </div>

      {/* 🔹 View Options for Data Table */}
      <DataTableViewOptions table={table} />
    </div>
  )
}
