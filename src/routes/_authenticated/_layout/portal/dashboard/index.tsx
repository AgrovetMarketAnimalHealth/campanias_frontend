import { SectionCards } from "@/modules/core/components/section-cards"
import { BoletaDataTable } from "@/modules/boletas/components/boleta-data-table"
export const Route = createFileRoute({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <>
      <SectionCards />
      <BoletaDataTable/>
    </>
  )
}