"use client"
import * as React from "react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { PerfilService } from "@/modules/perfil/services/perfil.service"
import type { Cliente } from "@/modules/perfil/tyoes/perfil.types"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [cliente, setCliente] = React.useState<Cliente | null>(null)

  React.useEffect(() => {
    PerfilService.getMe().then((res) => {
      if (res.success) setCliente(res.cliente)
    })
  }, [])

  const user = cliente ? {
    name: `${cliente.nombre} ${cliente.apellidos}`,
    initials: `${cliente.nombre[0]}${cliente.apellidos[0]}`.toUpperCase(),
  } : undefined

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 flex justify-center"
            >
              <a href="#" className="flex justify-center w-full pt-3">
                <img
                  src="/src/assets/illustrations/logo-atrevia.webp"
                  alt="Atrevia logo"
                  className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={[]} user={user} />
      </SidebarContent>
      <SidebarFooter>
  <NavUser user={{ name: cliente?.nombre ?? "Usuario", email: cliente?.email ?? "", avatar: "" }} />
</SidebarFooter>
    </Sidebar>
  )
}