"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import {
  ColumnDef,
  ColumnFiltersState,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table"
import { getStockDetails } from "./actions"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  userData: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
  userData,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [showUserData, setShowUserData] = useState(false)
  const [expanded, setExpanded] = useState<ExpandedState>({})
  const [loadingRows, setLoadingRows] = useState<Set<string>>(new Set())
  const [tableData, setTableData] = useState<TData[]>(data)
  const [isPending, startTransition] = useTransition()

  const handleExpand = async (row: Row<TData>) => {
    const rowId = row.id
    const ressource = row.original as any

    // Si déjà expandé, juste le fermer
    if (expanded[rowId]) {
      setExpanded(prev => {
        const newExpanded = { ...prev }
        delete newExpanded[rowId]
        return newExpanded
      })
      return
    }

    // Si pas de subRows, charger les données
    if (!ressource.subRows || ressource.subRows.length === 0) {
      setLoadingRows(prev => new Set(prev).add(rowId))

      try {
        const details = await getStockDetails(ressource.id)

        startTransition(() => {
          // Mettre à jour les données du tableau avec les subRows
          setTableData(prev =>
            prev.map((item: any) =>
              item.id === ressource.id
                ? { ...item, subRows: details }
                : item
            )
          )

          // Expand la ligne
          setExpanded(prev => ({ ...prev, [rowId]: true }))
        })
      } catch (error) {
        console.error("Error loading stock details:", error)
      } finally {
        setLoadingRows(prev => {
          const newSet = new Set(prev)
          newSet.delete(rowId)
          return newSet
        })
      }
    } else {
      // Si les données existent déjà, juste expand
      setExpanded(prev => ({ ...prev, [rowId]: true }))
    }
  }

  const table = useReactTable({
    data: showUserData ? userData : tableData,
    columns,
    onColumnFiltersChange: setColumnFilters,
    onExpandedChange: setExpanded,
    getSubRows: (row) => (row as any).subRows,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    columnResizeMode: "onChange",
    state: {
      columnFilters,
      expanded,
      columnVisibility: {
        expander: !showUserData,
        edit: showUserData,
      },
    },
    meta: {
      onExpand: handleExpand,
    },
  })

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Filtrer..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="user-data"
              checked={showUserData}
              onCheckedChange={setShowUserData}
            />
            <Label htmlFor="user-data">Mes ressources</Label>
          </div>
          <Button asChild>
            <Link href="/add">Ajouter</Link>
          </Button>
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                const isLoading = loadingRows.has(row.id)
                const isSubRow = row.depth > 0

                return (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={isSubRow ? "bg-muted/50" : ""}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: `${cell.column.getSize()}px`,
                          paddingLeft: isSubRow && cellIndex === 1 ? "2rem" : undefined
                        }}
                      >
                        {isLoading && cellIndex === 1 ? (
                          <span className="text-sm text-muted-foreground">Chargement...</span>
                        ) : isSubRow && cellIndex === 1 ? (
                          // Pour les sous-lignes, afficher le username dans la colonne "name"
                          <span className="text-sm">→ {(row.original as any).username}</span>
                        ) : isSubRow && cellIndex === 2 ? (
                          // Pas de type pour les sous-lignes
                          null
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
