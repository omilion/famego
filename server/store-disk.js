import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import multer from 'multer'
import { RESOURCES, slugify } from './app.js'

// Store de disco: usado en desarrollo local (npm run dev).
// Guarda cada recurso en server/data/<recurso>.json y las imágenes en public/uploads.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const UPLOADS_DIR = path.join(__dirname, '..', 'public', 'uploads')

fs.mkdirSync(UPLOADS_DIR, { recursive: true })

function fileFor(resource) {
  return path.join(DATA_DIR, `${resource}.json`)
}

export const diskStore = {
  async getAll(resource) {
    return JSON.parse(fs.readFileSync(fileFor(resource), 'utf-8'))
  },
  async create(resource, item) {
    const items = await this.getAll(resource)
    items.push(item)
    fs.writeFileSync(fileFor(resource), JSON.stringify(items, null, 2), 'utf-8')
  },
  async update(resource, id, item) {
    const items = await this.getAll(resource)
    const idx = items.findIndex((x) => x.id === id)
    items[idx] = item
    fs.writeFileSync(fileFor(resource), JSON.stringify(items, null, 2), 'utf-8')
  },
  async remove(resource, id) {
    const items = (await this.getAll(resource)).filter((x) => x.id !== id)
    fs.writeFileSync(fileFor(resource), JSON.stringify(items, null, 2), 'utf-8')
  },
}

// Middleware de subida a disco. Deja las rutas públicas en req.uploadedUrls.
const multerUpload = multer({
  storage: multer.diskStorage({
    destination: UPLOADS_DIR,
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase() || '.jpg'
      const base = slugify(path.basename(file.originalname, ext)).slice(0, 40) || 'img'
      cb(null, `${base}-${Date.now()}${ext}`)
    },
  }),
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /image\/(jpe?g|png|webp|avif|gif)/.test(file.mimetype)
    cb(ok ? null : new Error('Solo se permiten imágenes'), ok)
  },
}).array('images', 12)

export function diskUploader(req, res, cb) {
  multerUpload(req, res, (err) => {
    if (err) return cb(err)
    req.uploadedUrls = (req.files || []).map((f) => `/uploads/${f.filename}`)
    cb()
  })
}

export { UPLOADS_DIR, RESOURCES }
