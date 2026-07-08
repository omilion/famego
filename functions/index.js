import { initializeApp } from 'firebase-admin/app'
import { onRequest } from 'firebase-functions/v2/https'
import { defineSecret } from 'firebase-functions/params'
import { createApp } from './app.js'
import { firestoreStore, firestoreUploader } from './store-firestore.js'

initializeApp()

// Token de administración: se configura como secreto de Firebase.
// firebase functions:secrets:set ADMIN_TOKEN
const ADMIN_TOKEN = defineSecret('ADMIN_TOKEN')

export const api = onRequest(
  { secrets: [ADMIN_TOKEN], region: 'us-central1', cors: true, memory: '256MiB' },
  (req, res) => {
    const app = createApp({
      store: firestoreStore,
      uploader: firestoreUploader,
      adminToken: ADMIN_TOKEN.value() || 'famego2026',
    })
    return app(req, res)
  },
)
