import express from 'express'

// Recursos editables. Cada uno es una colección de objetos con { id, order, ... }.
export const RESOURCES = {
  services: { label: 'Servicio' },
  projects: { label: 'Proyecto' },
  clients: { label: 'Cliente' },
}

export function sortByOrder(items) {
  return [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}

// Genera un id/slug a partir de un texto.
export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Construye la app Express. Recibe:
//  - store: { getAll, create, update, remove } (disco o Firestore)
//  - uploader: middleware que procesa la subida y deja req.uploadedUrls
//  - adminToken: token de administración
export function createApp({ store, uploader, adminToken }) {
  const app = express()
  app.use(express.json({ limit: '2mb' }))

  const requireAuth = (req, res, next) => {
    if (req.headers['x-admin-token'] !== adminToken) {
      return res.status(401).json({ error: 'No autorizado' })
    }
    next()
  }

  const validResource = (req, res, next) => {
    if (!RESOURCES[req.params.resource]) {
      return res.status(404).json({ error: 'Recurso no encontrado' })
    }
    next()
  }

  // Verificación de token (login del panel)
  app.post('/api/admin/login', (req, res) => {
    if (req.body?.token === adminToken) return res.json({ ok: true })
    res.status(401).json({ error: 'Token incorrecto' })
  })

  // Subir una o varias imágenes. Devuelve las URLs públicas.
  app.post('/api/upload', requireAuth, (req, res) => {
    uploader(req, res, (err) => {
      if (err) return res.status(400).json({ error: err.message })
      res.status(201).json({ urls: req.uploadedUrls || [] })
    })
  })

  // Servicio individual por slug (compatibilidad con la versión anterior)
  app.get('/api/services/:slug', async (req, res, next) => {
    try {
      const items = await store.getAll('services')
      const item = items.find((s) => s.slug === req.params.slug || s.id === req.params.slug)
      if (!item) return res.status(404).json({ error: 'Servicio no encontrado' })
      res.json(item)
    } catch (e) { next(e) }
  })

  // Listado público por recurso
  app.get('/api/:resource', validResource, async (req, res, next) => {
    try {
      res.json(sortByOrder(await store.getAll(req.params.resource)))
    } catch (e) { next(e) }
  })

  // Crear
  app.post('/api/:resource', validResource, requireAuth, async (req, res, next) => {
    try {
      const { resource } = req.params
      const data = req.body || {}
      const items = await store.getAll(resource)

      const id = slugify(data.id || data.slug || data.title || data.name || '')
      if (!id) return res.status(400).json({ error: 'Falta un título o nombre válido' })
      if (items.some((x) => x.id === id)) {
        return res.status(409).json({ error: 'Ya existe un elemento con ese id' })
      }

      const nuevo = { ...data, id, order: Number(data.order) || items.length + 1 }
      if (resource === 'services') nuevo.slug = nuevo.slug || id
      await store.create(resource, nuevo)
      res.status(201).json(nuevo)
    } catch (e) { next(e) }
  })

  // Actualizar
  app.put('/api/:resource/:id', validResource, requireAuth, async (req, res, next) => {
    try {
      const { resource, id } = req.params
      const existing = await store.getAll(resource)
      const current = existing.find((x) => x.id === id)
      if (!current) return res.status(404).json({ error: 'Elemento no encontrado' })

      const merged = { ...current, ...req.body, id }
      if (merged.order != null) merged.order = Number(merged.order)
      await store.update(resource, id, merged)
      res.json(merged)
    } catch (e) { next(e) }
  })

  // Eliminar
  app.delete('/api/:resource/:id', validResource, requireAuth, async (req, res, next) => {
    try {
      const { resource, id } = req.params
      const existing = await store.getAll(resource)
      const current = existing.find((x) => x.id === id)
      if (!current) return res.status(404).json({ error: 'Elemento no encontrado' })
      await store.remove(resource, id)
      res.json(current)
    } catch (e) { next(e) }
  })

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    console.error(err)
    res.status(500).json({ error: 'Error interno del servidor' })
  })

  return app
}
