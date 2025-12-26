"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ChevronRight, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export type UserStock = {
  userId: string
  username: string
  amount: number
}

export type Ressource = {
  id: string
  name: string
  type: string
  amount: number
  subRows?: UserStock[]
}

export const columns: ColumnDef<Ressource>[] = [
  {
    id: "expander",
    header: () => null,
    cell: ({ row, table }) => {
      // Ne montrer l'expander que pour les lignes de niveau 0 (pas les sous-lignes)
      if (row.depth > 0) return null

      return (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            // @ts-ignore - on accède à la fonction custom du table
            table.options.meta?.onExpand?.(row)
          }}
          className="p-0 h-8 w-8"
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
    accessorKey: "amount",
    header: "Quantité",
    size: 150,
    minSize: 100,
    maxSize: 200,
  },
]
