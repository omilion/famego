import { useRef, useState } from 'react'
import { uploadImages } from '../../lib/api.js'

// Sube una imagen única (single) o varias (galería) y devuelve la(s) ruta(s).
// `value` es un string (single) o un array de strings (galería).
export default function ImageUploader({ label, value, onChange, token, multiple = false }) {
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const list = multiple ? (Array.isArray(value) ? value : []) : (value ? [value] : [])

  const pick = () => inputRef.current?.click()

  const onFiles = async (e) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return
    setBusy(true); setError('')
    try {
      const urls = await uploadImages(files, token)
      if (multiple) onChange([...(Array.isArray(value) ? value : []), ...urls])
      else onChange(urls[0])
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
      if (inputRef.current) inputRef.current.value = ''
    }
  }

  const removeAt = (idx) => {
    if (multiple) onChange(list.filter((_, i) => i !== idx))
    else onChange('')
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-600 text-ink-700">{label}</span>

      {list.length > 0 && (
        <div className={`mb-3 grid gap-2 ${multiple ? 'grid-cols-3 sm:grid-cols-4' : 'grid-cols-1'}`}>
          {list.map((src, i) => (
            <div key={src + i} className="group relative overflow-hidden rounded-lg border border-ink-800/10 bg-ink-50">
              <img src={src} alt="" className={`w-full object-cover ${multiple ? 'aspect-square' : 'aspect-video'}`} />
              <button
                type="button"
                onClick={() => removeAt(i)}
                className="absolute right-1 top-1 rounded-md bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                title="Quitar"
                aria-label="Quitar imagen"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <input ref={inputRef} type="file" accept="image/*" multiple={multiple} onChange={onFiles} className="hidden" />
      <button
        type="button"
        onClick={pick}
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-lg border border-dashed border-brand-400 bg-brand-50 px-4 py-2.5 text-sm font-600 text-brand-700 transition-colors hover:bg-brand-100 disabled:opacity-60"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" /></svg>
        {busy ? 'Subiendo…' : multiple ? 'Agregar imágenes' : (list.length ? 'Cambiar imagen' : 'Subir imagen')}
      </button>
      <p className="mt-1.5 text-xs text-ink-400">JPG, PNG, WebP o AVIF · máx. 6 MB {multiple && '· puedes seleccionar varias'}</p>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
