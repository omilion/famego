import { Link } from 'react-router-dom'
import Logo from './Logo.jsx'
import { COMPANY } from '../lib/company.js'

const AMBITOS = [
  'Habilitaciones', 'Obras civiles', 'Mantenimiento', 'Infraestructura',
  'Industrial', 'EPC', 'Urbanización', 'Retail', 'Oficinas',
]

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-white/70">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-11 w-auto" />
          </Link>
          <p className="mt-4 text-sm leading-relaxed">
            {COMPANY.legalName}. Ejecución integral para proyectos corporativos, industriales,
            comerciales e infraestructura.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-700 uppercase tracking-wider text-white">Servicios</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/servicios/diseno-y-arquitectura" className="hover:text-brand-400">Diseño y Arquitectura</Link></li>
            <li><Link to="/servicios/proyectos-edificacion" className="hover:text-brand-400">Edificación</Link></li>
            <li><Link to="/servicios/servicios-mantenimiento" className="hover:text-brand-400">Mantenimiento</Link></li>
            <li><Link to="/servicios/obras-civiles" className="hover:text-brand-400">Obras Civiles</Link></li>
            <li><Link to="/servicios/urbanizacion-infraestructura" className="hover:text-brand-400">Urbanización</Link></li>
            <li><Link to="/servicios/proyectos-industriales" className="hover:text-brand-400">Proyectos Industriales</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-700 uppercase tracking-wider text-white">Empresa</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/nosotros" className="hover:text-brand-400">Nosotros</Link></li>
            <li><Link to="/proyectos" className="hover:text-brand-400">Proyectos</Link></li>
            <li><Link to="/contacto" className="hover:text-brand-400">Contacto</Link></li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {AMBITOS.map((a) => (
              <span key={a} className="rounded bg-white/5 px-2 py-1 text-[11px] text-white/50">{a}</span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-700 uppercase tracking-wider text-white">Contacto</h3>
          <ul className="space-y-2 text-sm">
            <li>{COMPANY.address}</li>
            <li>{COMPANY.region}, {COMPANY.country}</li>
            <li><a href={COMPANY.phoneHref} className="hover:text-brand-400">{COMPANY.phone}</a></li>
            <li><a href={`mailto:${COMPANY.email}`} className="hover:text-brand-400">{COMPANY.email}</a></li>
            <li className="text-white/40">RUT {COMPANY.rut}</li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] text-brand-400/90">
            <span className="rounded border border-brand-500/30 px-2 py-1">Inscripción SERVIU</span>
            <span className="rounded border border-brand-500/30 px-2 py-1">Inscripción MOP</span>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-white/40 sm:flex-row sm:px-6 lg:px-8">
          <p>© {new Date().getFullYear()} {COMPANY.legalName}. Edificación · Obras civiles · Infraestructura · Industriales.</p>
          <p>Santiago, Chile</p>
        </div>
      </div>
    </footer>
  )
}
