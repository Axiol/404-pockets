"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ChevronRight, ChevronDown, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export type UserStock = {
  userId: string
  username: string
  amount: number
}

export type Ressource = {
  id: string
  name: string
  type: string
  size: string
  amount: number
  subRows?: UserStock[]
}

export const columns: ColumnDef<Ressource>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row, table }) => {
      if (row.depth > 0) return null

      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            // @ts-ignore - on accède à la fonction custom du table
            table.options.meta?.onExpand?.(row)
          }}
          className="p-0 h-8 w-8 cursor-pointer"
        >
          {row.getIsExpanded() ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      )
    },
    size: 50,
    minSize: 50,
    maxSize: 50,
  },
  {
    id: "edit",
    header: () => null,
    cell: ({ row }) => {
      if (row.depth > 0) return null
      console.log(row.original)

      return (
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="p-0 h-8 w-8 cursor-pointer"
        >
          <Link href={`/edit/${row.original.id}`}><Pencil className="h-4 w-4" /></Link>
        </Button>
      )
    },
    size: 50,
    minSize: 50,
    maxSize: 50,
  },
  {
    accessorKey: "name",
    header: "Nom",
    size: 300,
    minSize: 150,
    maxSize: 500,
  },
  {
    accessorKey: "type",
    header: "Type",
    size: 200,
    minSize: 100,
    maxSize: 300,
  },
  {
    accessorKey: "size",
    header: "Taille",
    size: 200,
    minSize: 100,
    maxSize: 300,
  },
  {
    accessorKey: "amount",
    header: "Quantité",
    size: 150,
    minSize: 100,
    maxSize: 200,
  },
]
