"use client"

import { Table } from "@tanstack/react-table"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { budgets, destinations } from "@/components/dashboard/data"
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
        <Input
          placeholder="Filter trips..."
          value={
            (table.getColumn("destination")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("destination")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("budget") && (
          <DataTableFacetedFilter
            column={table.getColumn("budget")}
            title="Budget"
            options={budgets}
          />
        )}
        {table.getColumn("destination") && (
          <DataTableFacetedFilter
            column={table.getColumn("destination")}
            title="Preferences"
            options={destinations}
          />
        )}

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
      <DataTableViewOptions table={table} />
    </div>
  )
}
