import { useEffect, useState } from 'react'
import { getClients } from '../lib/api.js'

export default function ClientsMarquee() {
  const [clients, setClients] = useState([])
  useEffect(() => { getClients().then(setClients) }, [])

  if (clients.length === 0) return null
  const row = [...clients, ...clients]

  return (
    <div className="relative overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <div className="flex w-max animate-marquee gap-10">
        {row.map((c, i) => (
          <span key={i} className="whitespace-nowrap font-display text-lg font-700 text-ink-600/70">
            {c.name}
          </span>
        ))}
      </div>
    </div>
  )
}
