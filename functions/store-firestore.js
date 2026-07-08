import { getFirestore } from 'firebase-admin/firestore'
import { getStorage } from 'firebase-admin/storage'
import multer from 'multer'
import { slugify } from './app.js'

// Store de Firestore: cada recurso es una colección; cada item un documento
// cuyo id es el slug. Las imágenes se guardan en Cloud Storage.
export const firestoreStore = {
  async getAll(resource) {
    const snap = await getFirestore().collection(resource).get()
    return snap.docs.map((d) => d.data())
  },
  async create(resource, item) {
    await getFirestore().collection(resource).doc(item.id).set(item)
  },
  async update(resource, id, item) {
    await getFirestore().collection(resource).doc(id).set(item)
  },
  async remove(resource, id) {
    await getFirestore().collection(resource).doc(id).delete()
  },
}

// Sube a Cloud Storage y hace públicas las imágenes. Deja las URLs en req.uploadedUrls.
const memoryUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 6 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /image\/(jpe?g|png|webp|avif|gif)/.test(file.mimetype)
    cb(ok ? null : new Error('Solo se permiten imágenes'), ok)
  },
}).array('images', 12)

export function firestoreUploader(req, res, cb) {
  memoryUpload(req, res, async (err) => {
    if (err) return cb(err)
    try {
      const bucket = getStorage().bucket()
      const urls = []
      for (const file of req.files || []) {
        const ext = (file.originalname.match(/\.[a-z0-9]+$/i) || ['.jpg'])[0].toLowerCase()
        const base = slugify(file.originalname.replace(/\.[a-z0-9]+$/i, '')).slice(0, 40) || 'img'
        const name = `uploads/${base}-${Date.now()}${ext}`
        const blob = bucket.file(name)
        await blob.save(file.buffer, { contentType: file.mimetype, resumable: false })
        await blob.makePublic()
        urls.push(`https://storage.googleapis.com/${bucket.name}/${name}`)
      }
      req.uploadedUrls = urls
      cb()
    } catch (e) {
      cb(e)
    }
  })
}
