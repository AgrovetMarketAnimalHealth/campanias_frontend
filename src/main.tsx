import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { BProgress } from '@bprogress/core'
import '@bprogress/core/css'
import { routeTree } from './routeTree.gen'
import './index.css'
import { initializeTheme } from './hooks/use-appearance'

const router = createRouter({
  routeTree,
  scrollRestoration: true,
})

router.subscribe('onBeforeLoad', ({ pathChanged }) => {
  if (pathChanged) {
    BProgress.start()
  }
})

router.subscribe('onLoad', () => {
  BProgress.done()
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.querySelector('#root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  const queryClient = new QueryClient()
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  )
}

initializeTheme()