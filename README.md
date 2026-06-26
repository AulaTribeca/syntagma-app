# Syntagma Visual · v0.1

Herramienta digital para analizar oraciones morfosintácticamente de forma visual.

## Qué incluye esta primera versión

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
- Exportación PDF multipágina.
- Guardado local si Supabase no está configurado.
- Guardado en Supabase si hay sesión iniciada.

## Fuente gramatical

La base normativa inicial es la *Nueva gramática de la lengua española. Manual* de la RAE y la ASALE, aportada por la usuaria. La herramienta no copia el texto del manual: solo estructura una taxonomía escolar inicial compatible con su terminología general.

## Instalación local

```bash
npm install
npm run dev
```

## Configuración de Supabase

1. Crea un proyecto en Supabase.
2. Abre el editor SQL.
3. Ejecuta el archivo `supabase/schema.sql`.
4. Copia `.env.example` como `.env.local`.
5. Completa:

```env
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

No uses nunca la `service_role key` en el frontend.

## Publicación en GitHub Pages

1. Sube todos los archivos a un repositorio de GitHub.
2. En el repositorio, ve a `Settings > Secrets and variables > Actions`.
3. Crea los secretos:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
4. Ve a `Settings > Pages`.
5. En `Build and deployment`, selecciona `GitHub Actions`.
6. Haz un commit en la rama `main`.

La acción `.github/workflows/deploy-pages.yml` compilará la app y la publicará.

## Estado

Versión inicial de arquitectura. Todavía no es la versión final para alumnado.
