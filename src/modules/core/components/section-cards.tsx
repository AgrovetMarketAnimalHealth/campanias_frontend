import { useEffect, useState } from "react"
import { IconCircleCheck, IconClock, IconCircleX, IconList, IconStar } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BoletaService } from "@/modules/boletas/services/boleta.service"
import type { ResumenBoletas } from "@/modules/boletas/tyoes/boleta.types"

interface SectionCardsProps {
  refresh?: number
}

export function SectionCards({ refresh }: SectionCardsProps) {
  const [resumen, setResumen] = useState<ResumenBoletas | null>(null)

  useEffect(() => {
    BoletaService.getResumen().then((res) => {
      if (res.success) setResumen(res.data)
    })
  }, [refresh]) // ← se recarga cada vez que refresh cambia

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-5">

      {/* Puntos acumulados */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Puntos Acumulados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {resumen?.puntos_acumulados ?? "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-primary border-primary">
              <IconStar className="size-4" />
              Puntos
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Puntos ganados por boletas
          </div>
          <div className="text-muted-foreground">Solo boletas aceptadas</div>
        </CardFooter>
      </Card>

      {/* Total boletas */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total de Comprobantes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {resumen?.total_boletas ?? "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconList className="size-4" />
              100%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Total subidos al sistema
          </div>
          <div className="text-muted-foreground">Comprobantes registrados</div>
        </CardFooter>
      </Card>

      {/* Aceptadas */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Aceptadas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {resumen?.aceptadas.cantidad ?? "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-green-600 border-green-400">
              <IconCircleCheck className="size-4" />
              {resumen?.aceptadas.porcentaje ?? 0}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-green-600">
            Comprobantes válidos <IconCircleCheck className="size-4" />
          </div>
          <div className="text-muted-foreground">Participantes confirmados</div>
        </CardFooter>
      </Card>

      {/* Pendientes */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Pendientes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {resumen?.pendientes.cantidad ?? "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-yellow-600 border-yellow-400">
              <IconClock className="size-4" />
              {resumen?.pendientes.porcentaje ?? 0}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-yellow-600">
            En espera de revisión <IconClock className="size-4" />
          </div>
          <div className="text-muted-foreground">Requieren validación manual</div>
        </CardFooter>
      </Card>

      {/* Rechazadas */}
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Rechazadas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {resumen?.rechazadas.cantidad ?? "—"}
          </CardTitle>
          <CardAction>
            <Badge variant="outline" className="text-red-600 border-red-400">
              <IconCircleX className="size-4" />
              {resumen?.rechazadas.porcentaje ?? 0}%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium text-red-600">
            Comprobantes inválidos <IconCircleX className="size-4" />
          </div>
          <div className="text-muted-foreground">No cumplen los requisitos</div>
        </CardFooter>
      </Card>

    </div>
  )
}