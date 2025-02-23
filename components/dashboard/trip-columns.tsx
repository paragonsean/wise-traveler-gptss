"use client"

import Link from "next/link"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { toast } from "sonner"

import { deleteTrip } from "@/lib/tripactions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/dashboard/data-table-column-header"

const handleDeleteTrip = async (id: string) => {
  toast.promise(deleteTrip(id), {
    loading: "Deleting...",
    success: () => "Trip deleted successfully.",
  })
}

export interface TripTable {
  id: string
  destination: string
  description: string
  duration: number
  budget: string
  group_size: string
  preferences: {
    adventure: boolean
    luxury: boolean
    nature: boolean
  }
}

export const columns: ColumnDef<TripTable>[] = [
  {
    accessorKey: "destination",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination" />
    ),
  },
  {
    accessorKey: "budget",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Budget" />
    ),
  },
  {
    accessorKey: "duration",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Duration (Days)" />
    ),
  },
  {
    accessorKey: "group_size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Group Size" />
    ),
  },
  {
    accessorKey: "preferences",
    header: "Preferences",
    cell: ({ row }) => {
      //  Ensure preferences exist before destructuring
      const { adventure, luxury, nature } = row.original.preferences || {};
  
      return (
        <div className="flex space-x-2">
          {adventure && <Badge variant="default">Adventure</Badge>}
          {luxury && <Badge variant="secondary">Luxury</Badge>}
          {nature && <Badge variant="outline">Nature</Badge>}
          {!adventure && !luxury && !nature && <span className="text-muted">No preferences</span>}
        </div>
      );
    },
  },  
  {
    id: "actions",
    cell: ({ row }) => {
      const trip = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href={`/dashboard/my-trips/${trip.id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Button
                variant="destructive"
                size="xs"
                onClick={async () => {
                  await handleDeleteTrip(trip.id)
                }}
              >
                Delete
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
