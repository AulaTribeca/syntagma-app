# Configuración de Firebase para Syntagma Visual

## 1. Crear proyecto

1. Entra en Firebase Console.
2. Crea un proyecto nuevo.
3. Añade una aplicación web.
4. Copia los datos de configuración de la app web.

## 2. Activar Authentication

1. Entra en `Authentication`.
2. Abre `Sign-in method`.
3. Activa `Email/Password`.

## 3. Crear Firestore

1. Entra en `Firestore Database`.
2. Crea la base de datos.
3. Selecciona modo producción.
4. Elige una región europea si está disponible.

## 4. Reglas de seguridad

En `Firestore Database > Rules`, sustituye las reglas por el contenido de:

```text
firebase/firestore.rules
```

Estas reglas permiten que cada usuario lea y escriba únicamente sus propios análisis.

## 5. Variables para desarrollo local

Copia `.env.example` como `.env.local` y completa:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## 6. Variables para GitHub Pages

En GitHub:

`Settings > Secrets and variables > Actions > New repository secret`

Crea estos secretos:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

Después, en `Settings > Pages`, selecciona `GitHub Actions`.

## 7. Guardado

La herramienta funciona de dos maneras:

- sin Firebase configurado: guardado local en el navegador;
- con Firebase configurado y sesión iniciada: guardado en Firestore.
