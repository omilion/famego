import { Link } from 'react-router-dom'
import { COMPANY } from '../lib/company.js'

export default function CtaBanner({
  title = 'Coordinemos una revisión técnica de tu requerimiento',
  subtitle = 'Famego apoya desde el levantamiento inicial hasta la ejecución y entrega, integrando especialidades y cuidando la continuidad operacional del mandante.',
}) {
  return (
    <section className="relative overflow-hidden bg-ink-900">
      <div className="bg-blueprint absolute inset-0 opacity-60" />
      <div className="absolute -right-16 top-0 h-full w-1/2 skew-x-12 bg-brand-500/10" />
      <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:py-20">
        <p className="mb-3 text-sm font-700 uppercase tracking-widest text-brand-400">Próximo paso</p>
        <h2 className="text-3xl font-800 tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">{subtitle}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={COMPANY.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-7 py-3.5 text-base font-700 text-ink-950 transition-colors hover:bg-brand-400 sm:w-auto"
          >
            Cotizar por WhatsApp
          </a>
          <Link
            to="/contacto"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 px-7 py-3.5 text-base font-600 text-white transition-colors hover:bg-white/5 sm:w-auto"
          >
            Enviar requerimiento
          </Link>
        </div>
        <p className="mt-6 text-sm text-white/50">
          O llámanos: <a href={COMPANY.phoneHref} className="font-600 text-brand-400 hover:underline">{COMPANY.phone}</a>
        </p>
      </div>
    </section>
  )
}
