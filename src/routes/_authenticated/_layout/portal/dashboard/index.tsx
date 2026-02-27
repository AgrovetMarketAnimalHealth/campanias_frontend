import { useState } from 'react'
import { SectionCards } from "@/modules/core/components/section-cards"
import { BoletaDataTable } from "@/modules/boletas/components/boleta-data-table"

export const Route = createFileRoute({
  component: DashboardPage,
})

function DashboardPage() {
  const [refresh, setRefresh] = useState(0)

  return (
    <>
      <SectionCards refresh={refresh} />
      <BoletaDataTable onSuccess={() => setRefresh((r) => r + 1)} />
    </>
  )
}