import { IconCircleCheck, IconClock, IconCircleX } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import type { Boleta } from "../tyoes/boleta.types"

const estadoConfig = {
  aceptada: {
    label: "Aceptada",
    icon: IconCircleCheck,
    className: "text-green-600 border-green-400",
  },
  pendiente: {
    label: "Pendiente",
    icon: IconClock,
    className: "text-yellow-600 border-yellow-400",
  },
  rechazada: {
    label: "Rechazada",
    icon: IconCircleX,
    className: "text-red-600 border-red-400",
  },
}

export function BoletaEstadoBadge({ estado }: { estado: Boleta['estado'] }) {
  const config = estadoConfig[estado]
  const Icon = config.icon

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className="size-4" />
      {config.label}
    </Badge>
  )
}