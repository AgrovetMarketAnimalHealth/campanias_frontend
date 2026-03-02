"use client"

import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconCircleX,
  IconGripVertical,
  IconLoader,
} from "@tabler/icons-react"
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type Row,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BoletaDrawerShow } from "./boleta-drawer-show"
import { BoletaDrawerStore } from "./boleta-drawer-store"
import { BoletaService } from "../services/boleta.service"
import type { Boleta } from "../tyoes/boleta.types"

// ─── Props ─────────────────────────────────────────────────
interface BoletaDataTableProps {
  onSuccess?: () => void
}

// ─── Estado badge ──────────────────────────────────────────
function EstadoBadge({ estado }: { estado: Boleta['estado'] }) {
  if (estado === 'aceptada') {
    return (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        Aceptada
      </Badge>
    )
  }
  if (estado === 'rechazada') {
    return (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        <IconCircleX className="text-red-500" />
        Rechazada
      </Badge>
    )
  }
  return (
    <Badge variant="outline" className="text-muted-foreground px-1.5">
      <IconLoader className="text-yellow-500" />
      Pendiente
    </Badge>
  )
}

// ─── Drag handle ───────────────────────────────────────────
function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({ id })
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Arrastrar</span>
    </Button>
  )
}

// ─── Fila draggable ────────────────────────────────────────
function DraggableRow({ row }: { row: Row<Boleta> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{ transform: CSS.Transform.toString(transform), transition }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

// ─── Columnas ──────────────────────────────────────────────
const columns: ColumnDef<Boleta>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todos"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleccionar fila"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "codigo",
    header: "Código",
    cell: ({ row }) => (
      <span className="font-mono text-sm font-medium">{row.original.codigo}</span>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "created_at",
    header: "Fecha de envío",
    cell: ({ row }) => <BoletaDrawerShow boleta={row.original} />,
  },
  {
    accessorKey: "updated_at",
    header: "Última actualización",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.original.updated_at ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "puntos_otorgados",
    header: () => <div className="text-right">Puntos</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.original.puntos_otorgados ?? "—"}
      </div>
    ),
  },
  {
    accessorKey: "observacion",
    header: "Observación",
    cell: ({ row }) => (
      <span className="text-muted-foreground text-sm">
        {row.original.observacion ?? "—"}
      </span>
    ),
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => <EstadoBadge estado={row.original.estado} />,
  },
]

const TABS = [
  { value: "todos", label: "Todos" },
  { value: "aceptada", label: "Aceptadas" },
  { value: "pendiente", label: "Pendientes" },
  { value: "rechazada", label: "Rechazadas" },
]

// ─── Componente principal ──────────────────────────────────
export function BoletaDataTable({ onSuccess }: BoletaDataTableProps) {
  const [data, setData] = React.useState<Boleta[]>([])
  const [tabActivo, setTabActivo] = React.useState("todos")
  const [rowSelection, setRowSelection] = React.useState({})
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 })
  const [lastPage, setLastPage] = React.useState(1)

  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data.map(({ id }) => id),
    [data]
  )

  const cargarBoletas = React.useCallback(async (estado: string, page: number) => {
    const res = await BoletaService.getAll(page + 1, estado)
    setData(res.data ?? [])
    setLastPage(res.meta?.last_page ?? 1)
  }, [])

  React.useEffect(() => {
    cargarBoletas(tabActivo, pagination.pageIndex)
  }, [tabActivo, pagination.pageIndex, cargarBoletas])

  const handleTabChange = (value: string) => {
    setTabActivo(value)
    setPagination((p) => ({ ...p, pageIndex: 0 }))
    setRowSelection({})
  }

  // Al subir boleta: recarga tabla Y notifica al padre para refrescar cards
  const handleSuccess = () => {
    cargarBoletas(tabActivo, pagination.pageIndex)
    onSuccess?.()
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  const table = useReactTable({
    data,
    columns,
    pageCount: lastPage,
    state: { sorting, columnVisibility, rowSelection, pagination },
    getRowId: (row) => row.id,
    enableRowSelection: true,
    manualPagination: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Tabs value={tabActivo} onValueChange={handleTabChange}>
          <TabsList className="hidden @4xl/main:flex">
            {TABS.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <Select value={tabActivo} onValueChange={handleTabChange}>
          <SelectTrigger className="flex w-fit @4xl/main:hidden">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TABS.map((tab) => (
              <SelectItem key={tab.value} value={tab.value}>
                {tab.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <BoletaDrawerStore onSuccess={handleSuccess} />
      </div>

      <div className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-muted sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8">
                {table.getRowModel().rows?.length ? (
                  <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No hay comprobantes.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
            {table.getFilteredSelectedRowModel().rows.length} de {data.length} fila(s) seleccionadas.
          </div>
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Filas por página
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => table.setPageSize(Number(value))}
              >
                <SelectTrigger className="w-20" id="rows-per-page">
                  <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Página {table.getState().pagination.pageIndex + 1} de {lastPage}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(lastPage - 1)}
                disabled={!table.getCanNextPage()}
              >
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}