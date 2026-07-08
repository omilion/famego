import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFound() {
  return (
    <>
      <Seo title="Página no encontrada" description="La página que buscas no existe. Vuelve al inicio de FAMEGO Ingeniería y Construcción." path="/404" />
      <section className="flex min-h-[70vh] items-center justify-center bg-ink-950 px-4 pt-24">
        <div className="text-center">
          <p className="font-display text-7xl font-900 text-brand-500">404</p>
          <h1 className="mt-4 text-2xl font-800 text-white">Página no encontrada</h1>
          <p className="mt-2 text-white/60">La página que buscas no existe o fue movida.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link to="/" className="rounded-lg bg-brand-500 px-6 py-3 text-sm font-700 text-ink-950 hover:bg-brand-400">Volver al inicio</Link>
            <Link to="/servicios" className="rounded-lg border border-white/20 px-6 py-3 text-sm font-600 text-white hover:bg-white/5">Ver servicios</Link>
          </div>
        </div>
      </section>
    </>
  )
}
