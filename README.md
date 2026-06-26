# Syntagma Visual · v0.2 Firebase

Herramienta digital para analizar oraciones morfosintácticamente de forma visual.

## Qué incluye esta versión

- Oración editable y tokenización automática.
- Lienzo central amplio para trabajar hacia abajo.
- Paletas laterales de etiquetas:
  - categorías morfológicas;
  - sintagmas/grupos;
  - funciones sintácticas;
  - subordinadas, coordinadas y marcas especiales.
- Filtro por nivel: Primaria, ESO y Bachillerato.
- Modo visual de árbol y modo de cajitas.
- Etiquetas arrastrables al lienzo.
- Corchetes sobre rangos de palabras seleccionadas.
- Flechas entre etiquetas.
- Notas editables.
- Descarga en PNG.
- Exportación PDF multifolio.
- Guardado local si Firebase no está configurado.
- Guardado en Firestore si hay sesión iniciada.
- Autenticación mediante email y contraseña.

## Fuente gramatical

La base normativa inicial es la *Nueva gramática de la lengua española. Manual* de la RAE y la ASALE, aportada por la usuaria. La herramienta no copia el texto del manual: solo estructura una taxonomía escolar inicial compatible con su terminología general.

## Instalación local

```bash
npm install
npm run dev
```

## Configuración de Firebase

1. Crea un proyecto en Firebase.
2. Crea una app web dentro de ese proyecto.
3. Activa `Authentication > Sign-in method > Email/Password`.
4. Crea una base de datos en `Firestore Database`.
5. Copia las reglas de `firebase/firestore.rules` en las reglas de Firestore.
6. Copia `.env.example` como `.env.local`.
7. Completa:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Publicación en GitHub Pages

1. Sube todos los archivos a un repositorio de GitHub.
2. En el repositorio, ve a `Settings > Secrets and variables > Actions`.
3. Crea los secretos:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. Ve a `Settings > Pages`.
5. En `Build and deployment`, selecciona `GitHub Actions`.
6. Haz un commit en la rama `main`.

La acción `.github/workflows/deploy-pages.yml` compilará la app y la publicará.

## Estado

Versión inicial ya migrada de Supabase a Firebase. Todavía no es la versión final para alumnado.
