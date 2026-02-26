"use client"
import { IconCirclePlusFilled, IconMail, IconBell, type Icon } from "@tabler/icons-react"
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
  return (
    <SidebarGroup className="flex flex-col h-full">
      {/* Avatar */}
      <div className="flex flex-col items-center gap-3 pt-28 pb-10 group-data-[collapsible=icon]:hidden">

        {/* Tipo de persona — encima del avatar */}
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
          <SidebarMenuItem className="flex items-center gap-2">
            <SidebarMenuButton
              tooltip="Dashboard"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
            >
              <IconCirclePlusFilled />
              <span>Dashboard</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Notificaciones */}
          <SidebarMenuItem className="flex items-center gap-2 mt-1">
            <SidebarMenuButton
              tooltip="Notificaciones"
              className="min-w-8 duration-200 ease-linear"
            >
              <IconBell />
              <span>Notificaciones</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>

      {/* Footer card */}
      <div className="mt-auto pt-4 px-2 pb-3 group-data-[collapsible=icon]:hidden">
        <Card className="bg-primary text-primary-foreground border-0 shadow-md overflow-hidden">
          <CardContent className="flex flex-col gap-4 p-5">

            {/* Logo — con mt-2 para bajarlo un poco */}
            <div className="flex justify-center mt-2">
              <img
                src="/src/assets/illustrations/logo-atrevia.webp"
                alt="Logo Atrevia"
                className="h-10 object-contain brightness-0 invert"
              />
            </div>

            {/* Texto */}
            <div className="flex flex-col gap-1.5 text-center">
              <p className="text-sm font-semibold text-primary-foreground">
                ¿Tienes alguna duda?
              </p>
              <p className="text-xs text-primary-foreground/80">
                Tenemos especialistas que te pueden ayudar
              </p>
            </div>

            {/* Botón contactar */}
            <a
              href="https://tudominio.com/contacto"
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