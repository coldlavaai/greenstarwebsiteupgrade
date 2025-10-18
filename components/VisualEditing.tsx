'use client'

import { enableOverlays, HistoryAdapterNavigate } from '@sanity/visual-editing/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export function VisualEditing() {
  const router = useRouter()

  useEffect(() => {
    const disable = enableOverlays({
      history: {
        subscribe: (navigate: HistoryAdapterNavigate) => {
          // Setup a listener for when the preview wants to navigate
          const handler = (event: Event) => {
            const customEvent = event as CustomEvent
            navigate(customEvent.detail)
          }
          window.addEventListener('sanity/navigate', handler)
          return () => {
            window.removeEventListener('sanity/navigate', handler)
          }
        },
        update: (update: { type: 'push' | 'replace'; url: string }) => {
          if (update.type === 'push') {
            router.push(update.url)
          } else {
            router.replace(update.url)
          }
        },
      },
    })

    // Cleanup when component unmounts
    return () => disable()
  }, [router])

  return null
}
