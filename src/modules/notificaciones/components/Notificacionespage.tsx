"use client"

import * as React from "react"
import {
  Bell, CheckCheck, Info, AlertTriangle, Star,
  Loader2, Mail, MailOpen, Receipt, UserPlus, RefreshCw, Search,
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { NotificacionService } from "../services/notificacion.service"
import type { Notificacion, FiltroNotificacion } from "../types/notificacion.types"

// ─── Helpers ─────────────────────────────────────────────────────────────────

const navCategories = [
  { title: "Todas",              icon: Bell,          filtro: null                   },
  { title: "Boleta Aceptada",    icon: CheckCheck,    filtro: "boleta_aceptada"      },
  { title: "Boleta Rechazada",   icon: AlertTriangle, filtro: "boleta_rechazada"     },
  { title: "Boleta Pendiente",   icon: Info,          filtro: "boleta_pendiente"     },
  { title: "Puntos Acreditados", icon: Star,          filtro: "puntos_acreditados"   },
  { title: "Registro",           icon: UserPlus,      filtro: "registro_cliente"     },
  { title: "Verificación",       icon: RefreshCw,     filtro: "reenvio_verificacion" },
]

function getTypeConfig(tipo: string): { icon: React.ElementType; badge: string } {
  const map: Record<string, { icon: React.ElementType; badge: string }> = {
    boleta_aceptada:      { icon: CheckCheck,    badge: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"     },
    boleta_rechazada:     { icon: AlertTriangle, badge: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"             },
    boleta_pendiente:     { icon: Info,          badge: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300" },
    puntos_acreditados:   { icon: Star,          badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"         },
    registro_cliente:     { icon: UserPlus,      badge: "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300" },
    reenvio_verificacion: { icon: RefreshCw,     badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"            },
    boleta_recibida:      { icon: Receipt,       badge: "bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300" },
  }
  return map[tipo] ?? { icon: Bell, badge: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" }
}

function isHtml(str: string) {
  return /<\s*[a-z][\s\S]*>/i.test(str)
}

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = React.useState(value)
  React.useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function NotificacionesPage() {
  const [notificaciones, setNotificaciones] = React.useState<Notificacion[]>([])
  const [selected, setSelected]             = React.useState<Notificacion | null>(null)
  const [search, setSearch]                 = React.useState("")
  const [soloNoLeidas, setSoloNoLeidas]     = React.useState(false)
  const [activeCategory, setActiveCategory] = React.useState("Todas")
  const [loading, setLoading]               = React.useState(true)
  const [unreadCount, setUnreadCount]       = React.useState(0)

  const debouncedSearch = useDebounce(search, 400)

  const fetchNotificaciones = React.useCallback(async () => {
    setLoading(true)
    try {
      const filtro: FiltroNotificacion = soloNoLeidas ? 'no_leidas' : 'todas'
      const res = await NotificacionService.getAll({
        filtro,
        per_page: 50,
        search: debouncedSearch || undefined,
      })
      if (res.success) setNotificaciones(res.data)
    } finally {
      setLoading(false)
    }
  }, [soloNoLeidas, debouncedSearch])

  const fetchContador = React.useCallback(async () => {
    const res = await NotificacionService.getContadorNoLeidas()
    if (res.success) setUnreadCount(res.data.no_leidas)
  }, [])

  React.useEffect(() => { fetchNotificaciones() }, [fetchNotificaciones])
  React.useEffect(() => { fetchContador() }, [fetchContador])

  const handleSelect = async (notif: Notificacion) => {
    setSelected(notif)
    if (!notif.leida) {
      // Optimistic update — la notificación se queda en la lista, solo cambia su estado
      const updated = { ...notif, leida: true }
      setSelected(updated)
      setNotificaciones((prev) => prev.map((n) => n.id === notif.id ? updated : n))
      setUnreadCount((c) => Math.max(0, c - 1))
      await NotificacionService.marcarLeida(notif.id)
    }
  }

  // Filtro de categoría es local (búsqueda va al backend)
  const visibles = notificaciones.filter((n) => {
    if (activeCategory === "Todas") return true
    const cat = navCategories.find((c) => c.title === activeCategory)
    return cat?.filtro ? n.tipo === cat.filtro : true
  })

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] overflow-hidden rounded-xl border bg-background">

      {/* ── Categorías ── */}
      <div className="w-14 shrink-0 border-r flex flex-col items-center py-3 gap-1">
        {navCategories.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.title
          return (
            <button
              key={cat.title}
              title={cat.title}
              onClick={() => { setActiveCategory(cat.title); setSelected(null) }}
              className={cn(
                "flex items-center justify-center size-9 rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
            </button>
          )
        })}
      </div>

      {/* ── Lista ── */}
      <div className="w-80 shrink-0 border-r flex flex-col">
        <div className="p-3 border-b flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{activeCategory}</span>
              {unreadCount > 0 && (
                <span className="bg-primary text-primary-foreground inline-flex size-5 items-center justify-center rounded-full text-xs font-semibold">
                  {unreadCount}
                </span>
              )}
            </div>
            <Label className="flex items-center gap-1.5 text-xs text-muted-foreground cursor-pointer">
              No leídas
              <Switch className="scale-75" checked={soloNoLeidas} onCheckedChange={setSoloNoLeidas} />
            </Label>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Buscar notificaciones..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-8 text-xs pl-8"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y">
          {loading ? (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="size-5 animate-spin text-muted-foreground" />
            </div>
          ) : visibles.length === 0 ? (
            <div className="flex flex-col items-center gap-2 p-8 text-center text-sm text-muted-foreground">
              <CheckCheck className="size-8 opacity-40" />
              <p>{search ? 'Sin resultados para tu búsqueda' : 'Sin notificaciones'}</p>
            </div>
          ) : (
            visibles.map((notif) => {
              const { icon: Icon, badge } = getTypeConfig(notif.tipo)
              const isSelected = selected?.id === notif.id
              return (
                <button
                  key={notif.id}
                  onClick={() => handleSelect(notif)}
                  className={cn(
                    "w-full text-left flex items-start gap-3 px-4 py-3 text-sm transition-colors hover:bg-muted/50",
                    isSelected && "bg-muted",
                    !notif.leida && "bg-primary/5"
                  )}
                >
                  <div className={cn("mt-0.5 shrink-0 flex items-center justify-center size-8 rounded-full", badge)}>
                    <Icon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <span className={cn("truncate text-xs", !notif.leida ? "font-semibold text-foreground" : "text-muted-foreground")}>
                        {notif.asunto}
                      </span>
                      {!notif.leida && <span className="size-2 shrink-0 rounded-full bg-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {isHtml(notif.cuerpo) ? notif.tipo_texto : notif.cuerpo}
                    </p>
                    <span className="text-[11px] text-muted-foreground/60 mt-1 block">{notif.fecha_formateada}</span>
                  </div>
                </button>
              )
            })
          )}
        </div>
      </div>

      {/* ── Detalle ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selected ? (
          <>
            <div className="px-6 py-4 border-b shrink-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2 min-w-0 flex-1">
                  <h2 className="text-base font-semibold leading-snug">{selected.asunto}</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium", getTypeConfig(selected.tipo).badge)}>
                      {React.createElement(getTypeConfig(selected.tipo).icon, { className: "size-3" })}
                      {selected.tipo_texto}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      {selected.leida ? <><MailOpen className="size-3" /> Leído</> : <><Mail className="size-3" /> No leído</>}
                    </span>
                    {selected.boleta && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Receipt className="size-3" />
                        Boleta <span className="font-medium text-foreground">#{selected.boleta.codigo}</span>
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground ml-auto">{selected.fecha_formateada}</span>
                  </div>
                </div>
                <button onClick={() => setSelected(null)} className="shrink-0 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-md hover:bg-muted">
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden">
              {isHtml(selected.cuerpo) ? (
                <iframe srcDoc={selected.cuerpo} className="w-full h-full border-0" sandbox="allow-same-origin" title={selected.asunto} />
              ) : (
                <div className="p-6 overflow-y-auto h-full">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{selected.cuerpo}</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground">
            <Mail className="size-12 opacity-20" />
            <p className="text-sm">Selecciona una notificación para leerla</p>
          </div>
        )}
      </div>

    </div>
  )
}