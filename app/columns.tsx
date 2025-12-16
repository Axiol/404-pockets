import { ColumnDef } from "@tanstack/react-table"

export type Ressource = {
  id: string
  name: string
  type: string
  amount: number
}

export const columns: ColumnDef<Ressource>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "amount",
    header: "Quantité",
  },
]
