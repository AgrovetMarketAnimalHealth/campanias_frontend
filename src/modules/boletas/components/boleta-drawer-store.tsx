import { useEffect, useRef, useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { IconPlus, IconUpload, IconFile, IconX, IconFileTypePdf, IconPhoto } from "@tabler/icons-react"
import { BoletaService } from "../services/boleta.service"
import { driver } from "driver.js"
import "driver.js/dist/driver.css"

interface BoletaDrawerStoreProps {
  onSuccess: () => void
  /** Si es true (y aún no se vio la guía), resalta el botón de subir al montar el componente */
  mostrarGuia?: boolean
}

function FileIcon({ tipo }: { tipo: string }) {
  if (tipo.includes("pdf")) return <IconFileTypePdf className="size-8 text-red-500" />
  return <IconPhoto className="size-8 text-blue-500" />
}

const GUIA_VISTA_KEY = "guia_subir_comprobante_vista"

export function BoletaDrawerStore({ onSuccess, mostrarGuia = true }: BoletaDrawerStoreProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [archivo, setArchivo] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // ── Guía/onboarding apuntando al botón de subir ──
  useEffect(() => {
    if (!mostrarGuia) return
    if (typeof window === "undefined") return
    if (localStorage.getItem(GUIA_VISTA_KEY)) return

    // pequeño delay para asegurarnos que el botón ya está montado en el DOM
    const timer = setTimeout(() => {
      if (!triggerRef.current) return

      const guia = driver({
        showProgress: false,
        allowClose: true,
        overlayColor: "rgba(0,0,0,0.65)",
        doneBtnText: "Entendido",
        prevBtnText: "Anterior",
        nextBtnText: "Siguiente",
        onDestroyed: () => {
          localStorage.setItem(GUIA_VISTA_KEY, "1")
        },
        steps: [
          {
            element: triggerRef.current,
            popover: {
              title: "Sube tu comprobante aquí",
              description:
                "Haz clic en este botón para subir tu boleta o factura y participar en el sorteo.",
              side: "bottom",
              align: "center",
            },
          },
        ],
      })

      guia.drive()
    }, 600)

    return () => clearTimeout(timer)
  }, [mostrarGuia])

  const handleFile = (file: File) => {
    setError(null)
    setArchivo(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const handleSubmit = async () => {
    if (!archivo) {
      setError("Selecciona un archivo antes de subir.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const res = await BoletaService.store(archivo)
      if (!res.success) {
        setError(res.message ?? "Error al subir el comprobante.")
        return
      }
      setArchivo(null)
      setOpen(false)
      onSuccess()
    } catch {
      setError("Error de conexión. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setArchivo(null)
    setError(null)
    setOpen(false)
  }

  return (
    <Drawer direction={isMobile ? "bottom" : "right"} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button ref={triggerRef} size="sm">
          <IconPlus className="size-4" />
          <span className="hidden lg:inline">Subir comprobante</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="gap-1 border-b pb-4">
          <DrawerTitle className="text-lg font-semibold">Subir Comprobante</DrawerTitle>
          <p className="text-muted-foreground text-sm">
            Sube tu boleta o factura en formato JPG, PNG o PDF (máx. 5MB).
          </p>
        </DrawerHeader>

        <div className="flex flex-col gap-5 px-4 py-6">
          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 rounded-md bg-destructive/10 border border-destructive/30 px-4 py-3 text-sm text-destructive">
              <IconX className="size-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Drop zone */}
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`
              relative flex flex-col items-center justify-center gap-3
              rounded-xl border-2 border-dashed px-6 py-10 cursor-pointer
              transition-colors duration-200
              ${dragging
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/40"
              }
            `}
          >
            <div className="flex items-center justify-center rounded-full bg-primary/10 p-4">
              <IconUpload className="size-7 text-primary" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-sm font-medium text-foreground">
                Arrastra tu archivo aquí
              </p>
              <p className="text-xs text-muted-foreground">
                o <span className="text-primary underline underline-offset-2">haz clic para seleccionar</span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground">JPG, PNG, PDF — máx. 5MB</p>
            <input
              ref={inputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              className="hidden"
              onChange={handleChange}
            />
          </div>

          {/* Preview del archivo */}
          {archivo && (
            <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-4 py-3">
              <FileIcon tipo={archivo.type} />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium truncate">{archivo.name}</span>
                <span className="text-xs text-muted-foreground">
                  {(archivo.size / 1024 / 1024).toFixed(2)} MB
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 shrink-0 text-muted-foreground hover:text-destructive"
                onClick={() => setArchivo(null)}
              >
                <IconX className="size-4" />
              </Button>
            </div>
          )}
        </div>

        <DrawerFooter className="border-t pt-4">
          <Button onClick={handleSubmit} disabled={loading || !archivo}>
            {loading ? (
              <span className="flex items-center gap-2">
                <IconFile className="size-4 animate-pulse" /> Subiendo...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <IconUpload className="size-4" /> Subir comprobante
              </span>
            )}
          </Button>
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleClose}>Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}