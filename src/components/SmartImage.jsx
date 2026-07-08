import { useState } from 'react'

// Muestra la imagen si existe en /public/images; mientras no exista,
// renderiza un placeholder gráfico con el nombre del archivo esperado
// (los prompts para generar cada imagen están en IMAGENES.md).
export default function SmartImage({ src, alt, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative overflow-hidden bg-gradient-to-br from-ink-800 via-ink-700 to-ink-900 ${className}`}
      >
        <div className="bg-blueprint absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
          <svg className="h-10 w-10 text-brand-500/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A1.5 1.5 0 0 0 21.75 19.5V4.5A1.5 1.5 0 0 0 20.25 3H3.75A1.5 1.5 0 0 0 2.25 4.5v15A1.5 1.5 0 0 0 3.75 21Z" />
          </svg>
          <p className="font-mono text-[11px] leading-tight text-white/40">{src}</p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
