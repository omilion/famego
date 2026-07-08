import { useState } from 'react'
import Seo, { organizationJsonLd, breadcrumbJsonLd } from '../components/Seo.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { COMPANY } from '../lib/company.js'

const CRUMB = [
  { name: 'Inicio', path: '/' },
  { name: 'Contacto', path: '/contacto' },
]

const SERVICIOS = [
  'Diseño y Arquitectura', 'Edificación', 'Mantenimiento', 'Obras Civiles',
  'Urbanización e Infraestructura', 'Proyectos Industriales', 'Otro',
]

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', empresa: '', email: '', telefono: '', servicio: '', mensaje: '' })

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  // Sin backend de correo: arma un mensaje de WhatsApp con el requerimiento.
  const submit = (e) => {
    e.preventDefault()
    const texto = [
      'Hola FAMEGO, quiero cotizar un proyecto.',
      `Nombre: ${form.nombre}`,
      form.empresa && `Empresa: ${form.empresa}`,
      `Email: ${form.email}`,
      form.telefono && `Teléfono: ${form.telefono}`,
      form.servicio && `Servicio: ${form.servicio}`,
      form.mensaje && `Detalle: ${form.mensaje}`,
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/56982312670?text=${encodeURIComponent(texto)}`, '_blank')
  }

  const inputCls = 'w-full rounded-lg border border-ink-800/15 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition-colors focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'

  return (
    <>
      <Seo
        title="Contacto — Cotiza tu proyecto"
        description="Contáctanos para coordinar una revisión técnica de tu requerimiento. Teléfono +56 9 8231 2670, contacto@famego.cl. Juan Fernández #549, La Florida, Santiago."
        path="/contacto"
        keywords="contacto constructora, cotizar construcción Chile, presupuesto obra, Famego contacto"
        jsonLd={[organizationJsonLd(), breadcrumbJsonLd(CRUMB)]}
      />
      <PageHeader
        eyebrow="Hablemos"
        title="Coordinemos una revisión técnica de tu requerimiento"
        subtitle="Famego apoya desde el levantamiento inicial hasta la ejecución y entrega, integrando especialidades y cuidando la continuidad operacional del mandante."
        breadcrumb={CRUMB}
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          {/* Formulario */}
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-800 tracking-tight text-ink-900">Envíanos tu requerimiento</h2>
            <p className="mt-2 text-sm text-ink-600">Completa el formulario y te responderemos a la brevedad. Al enviar se abrirá WhatsApp con tu mensaje listo.</p>
            <form onSubmit={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-600 text-ink-700" htmlFor="nombre">Nombre *</label>
                <input id="nombre" name="nombre" required value={form.nombre} onChange={update} className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-600 text-ink-700" htmlFor="empresa">Empresa</label>
                <input id="empresa" name="empresa" value={form.empresa} onChange={update} className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-600 text-ink-700" htmlFor="email">Email *</label>
                <input id="email" name="email" type="email" required value={form.email} onChange={update} className={inputCls} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-600 text-ink-700" htmlFor="telefono">Teléfono</label>
                <input id="telefono" name="telefono" value={form.telefono} onChange={update} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-600 text-ink-700" htmlFor="servicio">Servicio de interés</label>
                <select id="servicio" name="servicio" value={form.servicio} onChange={update} className={inputCls}>
                  <option value="">Selecciona…</option>
                  {SERVICIOS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-sm font-600 text-ink-700" htmlFor="mensaje">Detalle del proyecto</label>
                <textarea id="mensaje" name="mensaje" rows="5" value={form.mensaje} onChange={update} className={inputCls} />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-7 py-3.5 text-base font-700 text-ink-950 transition-colors hover:bg-brand-400 sm:w-auto">
                  Enviar requerimiento
                </button>
              </div>
            </form>
          </div>

          {/* Datos de contacto */}
          <aside className="lg:col-span-2">
            <div className="rounded-2xl bg-ink-950 p-8 text-white">
              <h2 className="text-xl font-800">Contacto comercial</h2>
              <ul className="mt-6 space-y-5 text-sm">
                <ContactItem label="Dirección" value={`${COMPANY.address}, ${COMPANY.city}`} />
                <ContactItem label="Teléfono" value={COMPANY.phone} href={COMPANY.phoneHref} />
                <ContactItem label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
                <ContactItem label="Sitio web" value="www.famego.cl" href={COMPANY.site} />
                <ContactItem label="RUT" value={COMPANY.rut} />
              </ul>
              <a href={COMPANY.whatsapp} target="_blank" rel="noopener noreferrer" className="mt-8 flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-5 py-3.5 text-sm font-700 text-white transition-opacity hover:opacity-90">
                Escríbenos por WhatsApp
              </a>
            </div>
            <div className="mt-6 rounded-2xl border border-ink-800/10 p-6" style={{ background: '#f7f8f9' }}>
              <h3 className="text-sm font-700 uppercase tracking-wide text-ink-500">Aplicaciones frecuentes</h3>
              <ul className="mt-3 space-y-2 text-sm text-ink-600">
                <li>· Licitaciones privadas y precalificaciones</li>
                <li>· Reuniones con mandantes corporativos</li>
                <li>· Presentación ante facilities, operaciones y administración</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

function ContactItem({ label, value, href }) {
  return (
    <li>
      <div className="text-xs font-700 uppercase tracking-wide text-brand-400">{label}</div>
      {href ? (
        <a href={href} className="mt-0.5 block text-white/90 hover:text-brand-300">{value}</a>
      ) : (
        <div className="mt-0.5 text-white/90">{value}</div>
      )}
    </li>
  )
}
