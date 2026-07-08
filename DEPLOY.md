# Despliegue en Firebase

## 🚀 Vía rápida: solo frontend (gratis, sin backend)

Publica el sitio en minutos usando **solo Firebase Hosting**. No necesita plan
Blaze ni Cloud Functions. El sitio se ve completo porque los datos vienen de los
JSON incluidos (`src/data/*-fallback.json`).

> Limitación: el panel `/admin` **no guarda online** en este modo. Para cambiar
> servicios/proyectos/clientes, edita los JSON en `server/data/` (o
> `src/data/*-fallback.json`) y vuelve a desplegar. Cuando quieras edición en
> vivo, pasa al modo completo (más abajo).

```bash
npm install -g firebase-tools
firebase login
firebase use --add           # elige tu proyecto Firebase, alias "default"

npm run build:static         # build en modo solo-frontend
firebase deploy --only hosting
```

Listo. El `firebase.json` actual ya está configurado para hosting-only.

---

## Modo completo: Hosting + Cloud Functions + Firestore + Storage

Con el panel `/admin` guardando **online** (datos en Firestore, imágenes en
Storage). Requiere plan Blaze (con cuota gratuita amplia).

Para activarlo, primero reemplaza la config de hosting-only por la completa:

```bash
cp firebase.full.json firebase.json
```

Luego sigue los pasos de abajo.

## Requisitos previos (una sola vez)

1. Instalar la CLI de Firebase:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. Crear un proyecto en la [consola de Firebase](https://console.firebase.google.com):
   - Activa **Firestore Database** (modo producción).
   - Activa **Storage**.
   - Cloud Functions v2 requiere el **plan Blaze** (de pago por uso, pero con
     cuota gratuita amplia; este sitio no debería generar costo).

3. Enlazar el código con tu proyecto (crea `.firebaserc`):
   ```bash
   firebase use --add    # elige tu proyecto y ponle alias "default"
   ```

## Configurar el token de administración

```bash
firebase functions:secrets:set ADMIN_TOKEN
# escribe el token que usarás para entrar a /admin
```

## Cargar los datos iniciales en Firestore (una vez)

1. En la consola: *Configuración del proyecto → Cuentas de servicio → Generar
   nueva clave privada*. Guarda el archivo como `functions/service-account.json`
   (ya está en `.gitignore`).
2. Ejecuta el seed:
   ```bash
   cd functions && npm install && cd ..
   node functions/seed.js
   ```

## Desplegar

```bash
npm run build          # genera /dist
firebase deploy
```

Esto publica el hosting, la función `api`, y las reglas de Firestore y Storage.
La primera vez tarda unos minutos (crea la función).

Para desplegar solo una parte:
```bash
firebase deploy --only hosting
firebase deploy --only functions
firebase deploy --only firestore:rules,storage
```

## Cómo funciona en producción

- El frontend se sirve desde Hosting.
- Las llamadas a `/api/**` se reescriben a la Cloud Function `api` (ver
  `firebase.json`), que corre el mismo Express con Firestore + Storage.
- Las imágenes subidas se guardan en Storage y se sirven por URL pública.
- Escribir datos/imágenes requiere el header `x-admin-token` correcto; el
  acceso directo de clientes a Firestore/Storage está bloqueado por reglas.

## Desarrollo local (sin Firebase)

Sigue funcionando igual que siempre, con datos e imágenes en disco:
```bash
npm run dev
```
No necesitas Firebase para desarrollar. Firebase solo entra en el deploy.

## Alternativa: VPS / Node tradicional

El código local (`server/index.js`) también sirve para un servidor Node normal
(Render, Railway, VPS): `npm run build && npm start`. En ese caso los datos e
imágenes viven en disco y no se usa Firebase.
