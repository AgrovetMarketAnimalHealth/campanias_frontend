"use client"
import * as React from "react"
import { IconCirclePlusFilled, IconBell, type Icon } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Link, useRouterState } from "@tanstack/react-router"
import { cn } from "@/lib/utils"
import { NotificacionService } from "@/modules/notificaciones/services/notificacion.service"

export function NavMain({
  items,
  user,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
  }[]
  user?: {
    name: string
    image?: string
    initials?: string
    email?: string
    tipoPersona?: string
  }
}) {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname
  const [noLeidas, setNoLeidas] = React.useState(0)

  const fetchContador = React.useCallback(() => {
    NotificacionService.getContadorNoLeidas().then((res) => {
      if (res.success) setNoLeidas(res.data.no_leidas)
    })
  }, [])

  React.useEffect(() => {
    fetchContador()
    const interval = setInterval(fetchContador, 60_000)
    return () => clearInterval(interval)
  }, [fetchContador])

  React.useEffect(() => {
    if (currentPath.startsWith("/portal/notificaciones")) {
      fetchContador()
    }
  }, [currentPath, fetchContador])

  const isNotifActiva = currentPath.startsWith("/portal/notificaciones")
  const isDashActiva  = currentPath.startsWith("/portal/dashboard")

  return (
    <SidebarGroup className="flex flex-col h-full">
      {/* Estilos de animación inline */}
      <style>{`
        @keyframes bell-swing {
          0%   { transform: rotate(0deg); }
          10%  { transform: rotate(18deg); }
          20%  { transform: rotate(-16deg); }
          30%  { transform: rotate(12deg); }
          40%  { transform: rotate(-10deg); }
          50%  { transform: rotate(6deg); }
          60%  { transform: rotate(-4deg); }
          70%  { transform: rotate(2deg); }
          80%  { transform: rotate(-1deg); }
          100% { transform: rotate(0deg); }
        }
        @keyframes badge-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--badge-color), 0.6); }
          50%       { transform: scale(1.15); box-shadow: 0 0 0 5px rgba(var(--badge-color), 0); }
        }
        .bell-animate {
          animation: bell-swing 1.4s ease-in-out infinite;
          transform-origin: top center;
          display: inline-block;
        }
        .badge-animate {
          animation: badge-pulse 1.8s ease-in-out infinite;
        }
      `}</style>

      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 pt-28 pb-10 group-data-[collapsible=icon]:hidden">
        {user?.tipoPersona && (
          <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground">
            Persona {user.tipoPersona}
          </span>
        )}

        <Avatar className="size-24 ring-2 ring-primary/20">
          <AvatarImage src={user?.image} alt={user?.name} />
          <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-semibold">
            {user?.initials ?? "JG"}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-semibold text-foreground">
            {user?.name ?? "Jeferson G."}
          </span>
          {user?.email && (
            <span className="text-xs text-muted-foreground">
              {user.email}
            </span>
          )}
        </div>
      </div>

      <SidebarGroupContent className="flex flex-col gap-2 flex-1">
        <SidebarMenu>
          <div className="h-6" />

          {/* Dashboard */}
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Dashboard"
              asChild
              isActive={isDashActiva}
              className={cn(
                "min-w-8 duration-200 ease-linear",
                isDashActiva && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              )}
            >
              <Link to="/portal/dashboard">
                <IconCirclePlusFilled />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Notificaciones con badge animado */}
          <SidebarMenuItem className="mt-1">
            <SidebarMenuButton
              tooltip={noLeidas > 0 ? `${noLeidas} notificaciones sin leer` : "Notificaciones"}
              asChild
              isActive={isNotifActiva}
              className={cn(
                "min-w-8 duration-200 ease-linear",
                isNotifActiva && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              )}
            >
              <Link to="/portal/notificaciones" className="flex items-center justify-between w-full">
                {/* Campana con animación si hay no leídas */}
                <div className="flex items-center gap-2">
                  <span className={cn(noLeidas > 0 && "bell-animate")}>
                    <IconBell className="size-4" />
                  </span>
                  <span>Notificaciones</span>
                </div>

                {/* Badge al lado derecho */}
                {noLeidas > 0 && (
                  <span
                    className={cn(
                      "badge-animate ml-auto flex items-center justify-center",
                      "min-w-5 h-5 px-1 rounded-full text-[10px] font-bold leading-none",
                      isNotifActiva
                        ? "bg-white text-primary"
                        : "bg-primary text-primary-foreground"
                    )}
                    style={{ '--badge-color': isNotifActiva ? '255,255,255' : 'var(--primary)' } as React.CSSProperties}
                  >
                    {noLeidas > 99 ? "99+" : noLeidas}
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} asChild>
                <Link to={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>

      {/* Footer card */}
      <div className="mt-auto pt-4 px-2 pb-3 group-data-[collapsible=icon]:hidden">
        <Card className="bg-primary text-primary-foreground border-0 shadow-md overflow-hidden">
          <CardContent className="flex flex-col gap-4 p-5">
            <div className="flex justify-center mt-2">
              <img
                src="/promo-concierto/assets/illustrations/logo-atrevia.webp"
                alt="Logo Atrevia"
                className="h-10 object-contain brightness-0 invert"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-center">
              <p className="text-sm font-semibold text-primary-foreground">
                ¿Tienes alguna duda?
              </p>
              <p className="text-xs text-primary-foreground/80">
                Tenemos especialistas que te pueden ayudar
              </p>
            </div>
            <a
              href="https://wa.me/51903069021"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
            >
              <Button
                variant="default"
                className="w-full bg-black text-white hover:bg-black/80 text-xs h-9"
              >
                Contactar especialista
              </Button>
            </a>
          </CardContent>
        </Card>
      </div>
    </SidebarGroup>
  )
}