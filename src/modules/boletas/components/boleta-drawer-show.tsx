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
import { Separator } from "@/components/ui/separator"
import { BoletaEstadoBadge } from "./boleta-estado-badge"
import type { Boleta } from "../tyoes/boleta.types"

export function BoletaDrawerShow({ boleta }: { boleta: Boleta }) {
  const isMobile = useIsMobile()

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {boleta.created_at}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Detalle del Comprobante</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-xs">Estado</span>
            <BoletaEstadoBadge estado={boleta.estado} />
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-xs">Fecha de subida</span>
            <span className="font-medium">{boleta.created_at}</span>
          </div>
          <Separator />
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-xs">Puntos otorgados</span>
            <span className="font-medium">
              {boleta.puntos_otorgados ?? "—"}
            </span>
          </div>
          {boleta.observacion && (
            <>
              <Separator />
              <div className="flex flex-col gap-2">
                <span className="text-muted-foreground text-xs">Observación</span>
                <span className="font-medium">{boleta.observacion}</span>
              </div>
            </>
          )}
          <Separator />
          <div className="flex flex-col gap-2">
            <span className="text-muted-foreground text-xs">Comprobante</span>
            <a
              href={boleta.archivo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 text-sm"
            >
              Ver archivo
            </a>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cerrar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}