import { ColumnDef } from "@tanstack/react-table"

export type Ressource = {
  id: string
  name: string
  type: string
  amount: number
}

export const columns: ColumnDef<Ressource>[] = [
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
