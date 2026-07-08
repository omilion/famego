import Seo, { organizationJsonLd, breadcrumbJsonLd } from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import CtaBanner from '../components/CtaBanner.jsx'
import SmartImage from '../components/SmartImage.jsx'
import ClientsMarquee from '../components/ClientsMarquee.jsx'
import { COMPANY } from '../lib/company.js'

const CRUMB = [
  { name: 'Inicio', path: '/' },
  { name: 'Nosotros', path: '/nosotros' },
]

const PILLARS = [
  { title: 'Misión', desc: 'Mantener clientes satisfechos mediante una relación equilibrada entre precio, calidad y tiempo.' },
  { title: 'Visión', desc: 'Posicionarnos entre las mejores empresas constructoras, con mejora continua de procesos y crecimiento de nuestros colaboradores.' },
  { title: 'Valores', desc: 'Confianza, honestidad, respeto por las personas y el medio ambiente, excelencia y flexibilidad con el cliente.' },
  { title: 'Calidad y seguridad', desc: 'Entregar productos de calidad en plazos eficientes, respetando normas de seguridad y medioambientales.' },
]

const DATA = [
  { k: 'Razón social', v: 'Sociedad Constructora Famego SpA' },
  { k: 'RUT', v: COMPANY.rut },
  { k: 'Rubros', v: 'Edificación, obras civiles, infraestructura e industriales' },
  { k: 'Modalidades', v: 'Proyectos puntuales, EPC y contratos de mantenimiento' },
  { k: 'Base comercial', v: 'La Florida, Región Metropolitana' },
  { k: 'Inscripciones', v: 'SERVIU y MOP vigentes' },
]

export default function Nosotros() {
  return (
    <>
      <Seo
        title="Nosotros — Perfil de empresa"
        description="Sociedad Constructora Famego SpA: más de 13 años en el rubro de la construcción, con experiencia transversal en edificación, obras civiles, industrial e infraestructura. Misión, visión y valores."
        path="/nosotros"
        keywords="constructora Famego, perfil empresa constructora, misión visión valores, constructora La Florida Santiago"
        jsonLd={[organizationJsonLd(), breadcrumbJsonLd(CRUMB)]}
      />
      <PageHeader
        eyebrow="Perfil de empresa"
        title="Una constructora con base técnica y experiencia transversal"
        subtitle="Más de 13 años ejecutando proyectos comerciales, industriales, de infraestructura, educacionales y habitacionales a nivel nacional."
        breadcrumb={CRUMB}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <SmartImage
            src="/images/nosotros-obra.jpg"
            alt="Profesionales de Famego supervisando una obra de construcción con planos"
            className="aspect-4/3 w-full rounded-2xl shadow-xl"
          />
          <div>
            <h2 className="text-3xl font-900 tracking-tight text-ink-900">Respaldo técnico y humano</h2>
            <p className="mt-5 text-base leading-relaxed text-ink-600">
              Sociedad Constructora Famego SpA cuenta con más de 13 años en el rubro de la
              construcción. Su experiencia abarca proyectos comerciales de retail, obras civiles
              sanitarias, edificación, urbanizaciones, proyectos EPC, proyectos habitacionales,
              educacionales, industriales, de mantenimiento y logísticos.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Profesionales, técnicos y mano de obra con experiencia en grandes proyectos a nivel nacional.',
                'Inscripciones SERVIU y MOP para proyectos de urbanización e infraestructura.',
                'Coordinación transversal de todas las especialidades del proyecto.',
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <svg className="mt-0.5 h-5 w-5 flex-none text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                  <span className="text-sm leading-relaxed text-ink-700">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20" style={{ background: '#f7f8f9' }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {PILLARS.map((p) => (
              <div key={p.title} className="rounded-xl bg-white p-7 shadow-sm">
                <div className="mb-3 h-1 w-12 rounded-full bg-brand-500" />
                <h3 className="text-xl font-800 text-ink-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-900 tracking-tight text-ink-900 sm:text-3xl">Datos clave</h2>
          <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-ink-800/10 bg-ink-800/10 sm:grid-cols-2">
            {DATA.map((d) => (
              <div key={d.k} className="bg-white p-6">
                <dt className="text-xs font-700 uppercase tracking-wide text-brand-600">{d.k}</dt>
                <dd className="mt-1 font-600 text-ink-900">{d.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-white pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 text-center text-xs font-700 uppercase tracking-widest text-ink-600/60">Clientes y mandantes</p>
          <ClientsMarquee />
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
