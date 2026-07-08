import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import Logo from '../components/Logo.jsx'
import { adminLogin, getAll, saveItem, createItem, deleteItem } from '../lib/api.js'
import ImageUploader from '../components/admin/ImageUploader.jsx'

// Configuración de cada recurso: qué campos tiene su formulario.
// type: text | textarea | number | list | image | gallery
const RESOURCES = {
  services: {
    label: 'Servicios',
    singular: 'servicio',
    subtitle: (s) => `/servicios/${s.slug}`,
    fields: [
      { name: 'title', label: 'Título', type: 'text', required: true },
      { name: 'slug', label: 'Slug (URL)', type: 'text', required: true, lockOnEdit: true },
      { name: 'order', label: 'Orden', type: 'number' },
      { name: 'shortDescription', label: 'Descripción corta', type: 'textarea', full: true },
      { name: 'description', label: 'Descripción completa', type: 'textarea', full: true, rows: 4 },
      { name: 'features', label: 'Características (una por línea)', type: 'list', full: true, rows: 5 },
      { name: 'image', label: 'Imagen destacada', type: 'image', full: true },
      { name: 'imageAlt', label: 'Alt de imagen (SEO)', type: 'text', full: true },
      { name: 'keywords', label: 'Keywords (SEO)', type: 'text', full: true },
    ],
  },
  projects: {
    label: 'Proyectos',
    singular: 'proyecto',
    subtitle: (p) => `${p.client} · ${p.period}`,
    fields: [
      { name: 'title', label: 'Título del proyecto', type: 'text', required: true },
      { name: 'client', label: 'Cliente / mandante', type: 'text', required: true },
      { name: 'category', label: 'Categoría', type: 'text', placeholder: 'Comercial, Industrial…' },
      { name: 'order', label: 'Orden', type: 'number' },
      { name: 'period', label: 'Periodo', type: 'text', placeholder: '2024–a la fecha' },
      { name: 'meta', label: 'Dato extra', type: 'text', placeholder: '600 m², Contrato vigente…' },
      { name: 'description', label: 'Descripción', type: 'textarea', full: true, rows: 4 },
      { name: 'image', label: 'Imagen destacada', type: 'image', full: true },
      { name: 'imageAlt', label: 'Alt de imagen (SEO)', type: 'text', full: true },
      { name: 'gallery', label: 'Galería de imágenes', type: 'gallery', full: true },
    ],
  },
  clients: {
    label: 'Clientes',
    singular: 'cliente',
    subtitle: () => '',
    fields: [
      { name: 'name', label: 'Nombre del cliente', type: 'text', required: true },
      { name: 'order', label: 'Orden', type: 'number' },
    ],
  },
}

export default function Admin() {
  const [token, setToken] = useState(() => sessionStorage.getItem('famego_admin') || '')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (token) adminLogin(token).then((ok) => setAuthed(ok))
  }, []) // eslint-disable-line

  const login = async (e) => {
    e.preventDefault()
    setError('')
    const ok = await adminLogin(token)
    if (ok) {
      sessionStorage.setItem('famego_admin', token)
      setAuthed(true)
    } else {
      setError('Token incorrecto')
    }
  }

  if (!authed) {
    return (
      <>
        <Seo title="Administración" description="Panel de administración." path="/admin" />
        <div className="flex min-h-screen items-center justify-center bg-ink-950 px-4">
          <form onSubmit={login} className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl">
            <Logo className="mb-6 h-10 w-auto" />
            <h1 className="text-xl font-800 text-ink-900">Panel de administración</h1>
            <p className="mt-1 text-sm text-ink-500">Ingresa el token de acceso.</p>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Token de acceso"
              className="mt-5 w-full rounded-lg border border-ink-800/15 px-4 py-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            <button type="submit" className="mt-4 w-full rounded-lg bg-brand-500 px-4 py-3 text-sm font-700 text-ink-950 hover:bg-brand-400">Entrar</button>
            <Link to="/" className="mt-4 block text-center text-xs text-ink-400 hover:text-ink-600">← Volver al sitio</Link>
          </form>
        </div>
      </>
    )
  }

  return <AdminPanel token={token} onLogout={() => { sessionStorage.removeItem('famego_admin'); setAuthed(false) }} />
}

function AdminPanel({ token, onLogout }) {
  const [tab, setTab] = useState('services')
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [msg, setMsg] = useState('')
  const cfg = RESOURCES[tab]

  const reload = () => getAll(tab).then(setItems)
  useEffect(() => { setItems([]); reload() }, [tab]) // eslint-disable-line

  const flash = (t) => { setMsg(t); setTimeout(() => setMsg(''), 2500) }

  const emptyItem = () => {
    const base = { order: (items.length || 0) + 1 }
    cfg.fields.forEach((f) => { if (!(f.name in base)) base[f.name] = f.type === 'list' ? [] : '' })
    return base
  }

  const onSave = async (data) => {
    try {
      if (data.id) await saveItem(tab, data, token)
      else await createItem(tab, data, token)
      await reload()
      setEditing(null)
      flash('Guardado correctamente ✓')
    } catch (e) { flash('Error: ' + e.message) }
  }

  const onDelete = async (id) => {
    if (!confirm(`¿Eliminar este ${cfg.singular}?`)) return
    try { await deleteItem(tab, id, token); await reload(); flash('Eliminado') }
    catch (e) { flash('Error: ' + e.message) }
  }

  return (
    <>
      <Seo title="Administración" description="Panel de administración." path="/admin" />
      <div className="min-h-screen" style={{ background: '#f1f2f4' }}>
        <header className="bg-ink-950 text-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
            <div className="flex items-center gap-3">
              <Logo className="h-8 w-auto" />
              <span className="font-display font-800">Panel de administración</span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/" className="text-white/70 hover:text-white">Ver sitio ↗</Link>
              <button onClick={onLogout} className="rounded-md bg-white/10 px-3 py-1.5 hover:bg-white/20">Salir</button>
            </div>
          </div>
          {/* Pestañas */}
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="flex gap-1">
              {Object.entries(RESOURCES).map(([key, r]) => (
                <button
                  key={key}
                  onClick={() => { setEditing(null); setTab(key) }}
                  className={`-mb-px border-b-2 px-4 py-3 text-sm font-700 transition-colors ${
                    tab === key ? 'border-brand-500 text-brand-400' : 'border-transparent text-white/60 hover:text-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
          {msg && <div className="mb-5 rounded-lg bg-brand-50 px-4 py-3 text-sm font-600 text-brand-800">{msg}</div>}

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-900 text-ink-900">{cfg.label}</h1>
              <p className="text-sm text-ink-500">Gestiona los {cfg.label.toLowerCase()} que se muestran en el sitio público.</p>
            </div>
            <button onClick={() => setEditing(emptyItem())} className="rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-700 text-white hover:bg-ink-800">
              + Nuevo {cfg.singular}
            </button>
          </div>

          {tab === 'clients' ? (
            <ClientGrid items={items} onEdit={setEditing} onDelete={onDelete} />
          ) : (
            <div className="grid gap-4">
              {items.map((it) => (
                <div key={it.id} className="flex flex-col gap-3 rounded-xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="rounded px-2 py-0.5 text-xs font-700 text-ink-500" style={{ background: '#eceef1' }}>#{it.order}</span>
                      <h3 className="truncate font-700 text-ink-900">{it.title}</h3>
                    </div>
                    <p className="mt-1 line-clamp-1 text-sm text-ink-500">{it.shortDescription || it.description}</p>
                    <p className="mt-0.5 font-mono text-xs text-ink-400">{cfg.subtitle(it)}</p>
                  </div>
                  <div className="flex flex-none gap-2">
                    <button onClick={() => setEditing(it)} className="rounded-lg border border-ink-800/15 px-4 py-2 text-sm font-600 text-ink-700 hover:border-brand-500 hover:text-brand-600">Editar</button>
                    <button onClick={() => onDelete(it.id)} className="rounded-lg border border-red-200 px-4 py-2 text-sm font-600 text-red-600 hover:bg-red-50">Eliminar</button>
                  </div>
                </div>
              ))}
              {items.length === 0 && <p className="rounded-xl bg-white p-8 text-center text-sm text-ink-400">Sin elementos todavía.</p>}
            </div>
          )}
        </main>

        {editing && <ItemEditor cfg={cfg} item={editing} token={token} onCancel={() => setEditing(null)} onSave={onSave} />}
      </div>
    </>
  )
}

function ClientGrid({ items, onEdit, onDelete }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((c) => (
        <div key={c.id} className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="rounded px-2 py-0.5 text-xs font-700 text-ink-500" style={{ background: '#eceef1' }}>#{c.order}</span>
            <span className="font-700 text-ink-900">{c.name}</span>
          </div>
          <div className="flex gap-1">
            <button onClick={() => onEdit(c)} className="rounded-md p-1.5 text-ink-500 hover:bg-ink-100 hover:text-brand-600" title="Editar" aria-label="Editar">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z" /></svg>
            </button>
            <button onClick={() => onDelete(c.id)} className="rounded-md p-1.5 text-red-500 hover:bg-red-50" title="Eliminar" aria-label="Eliminar">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" /></svg>
            </button>
          </div>
        </div>
      ))}
      {items.length === 0 && <p className="col-span-full rounded-xl bg-white p-8 text-center text-sm text-ink-400">Sin clientes todavía.</p>}
    </div>
  )
}

function ItemEditor({ cfg, item, token, onCancel, onSave }) {
  // Los campos "list" se editan como texto (una línea por elemento).
  const init = { ...item }
  cfg.fields.forEach((f) => {
    if (f.type === 'list') init[f.name] = (item[f.name] || []).join('\n')
    if (f.type === 'gallery') init[f.name] = Array.isArray(item[f.name]) ? item[f.name] : []
  })
  const [f, setF] = useState(init)
  const isNew = !item.id
  const up = (e) => setF((p) => ({ ...p, [e.target.name]: e.target.value }))
  const setField = (name, val) => setF((p) => ({ ...p, [name]: val }))
  const cls = 'w-full rounded-lg border border-ink-800/15 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 disabled:bg-ink-50 disabled:text-ink-400'

  const submit = (e) => {
    e.preventDefault()
    const data = { ...f }
    cfg.fields.forEach((fld) => {
      if (fld.type === 'list') data[fld.name] = String(f[fld.name] || '').split('\n').map((x) => x.trim()).filter(Boolean)
      if (fld.type === 'number') data[fld.name] = Number(f[fld.name]) || 0
      if (fld.type === 'gallery') data[fld.name] = Array.isArray(f[fld.name]) ? f[fld.name] : []
    })
    onSave(data)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 py-10">
      <form onSubmit={submit} className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <h2 className="text-xl font-800 text-ink-900">
          {isNew ? `Nuevo ${cfg.singular}` : `Editar ${cfg.singular}`}
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {cfg.fields.map((fld) => {
            if (fld.type === 'image' || fld.type === 'gallery') {
              return (
                <div key={fld.name} className={fld.full ? 'sm:col-span-2' : ''}>
                  <ImageUploader
                    label={fld.label}
                    value={f[fld.name]}
                    onChange={(val) => setField(fld.name, val)}
                    token={token}
                    multiple={fld.type === 'gallery'}
                  />
                </div>
              )
            }
            return (
              <label key={fld.name} className={`block ${fld.full ? 'sm:col-span-2' : ''}`}>
                <span className="mb-1.5 block text-sm font-600 text-ink-700">
                  {fld.label}{fld.required && ' *'}
                </span>
                {fld.type === 'textarea' || fld.type === 'list' ? (
                  <textarea
                    name={fld.name}
                    rows={fld.rows || 2}
                    required={fld.required}
                    value={f[fld.name] ?? ''}
                    onChange={up}
                    className={cls}
                  />
                ) : (
                  <input
                    name={fld.name}
                    type={fld.type === 'number' ? 'number' : 'text'}
                    required={fld.required}
                    placeholder={fld.placeholder}
                    disabled={fld.lockOnEdit && !isNew}
                    value={f[fld.name] ?? ''}
                    onChange={up}
                    className={cls}
                  />
                )}
              </label>
            )
          })}
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className="rounded-lg border border-ink-800/15 px-5 py-2.5 text-sm font-600 text-ink-600 hover:bg-ink-50">Cancelar</button>
          <button type="submit" className="rounded-lg bg-brand-500 px-6 py-2.5 text-sm font-700 text-ink-950 hover:bg-brand-400">Guardar</button>
        </div>
      </form>
    </div>
  )
}
