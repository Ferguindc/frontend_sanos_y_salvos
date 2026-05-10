# 🚀 Guía de Inicio Rápido

## En 5 Minutos

### 1. Instalar y Ejecutar
```bash
cd frontend_masacota
npm install
npm run dev
```
Abre: `http://localhost:5173`

### 2. Ver la Página
✅ Header con navegación
✅ Hero section con botones
✅ Servicios (3 tarjetas)
✅ Footer

### 3. Conectar con Django

**Backend:**
```bash
python manage.py runserver
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:8000/api
```

## Endpoints a Implementar en Django

### 1. Login
```
POST http://localhost:8000/api/login/
Body: { "email": "test@test.com", "password": "pass123" }
Response: { "token": "...", "user": {...} }
```

### 2. Ubicaciones
```
GET http://localhost:8000/api/locations/
Response: [
  { "id": 1, "name": "...", "address": "...", "phone": "...", "email": "...", "lat": 40.7128, "lng": -74.0060 }
]
```

## Archivos Importantes

| Archivo | Función |
|---------|---------|
| `src/pages/inicio.jsx` | Página principal |
| `src/components/Header.jsx` | Navegación |
| `src/components/LoginSection.jsx` | Formulario login |
| `src/components/MapSection.jsx` | Ubicaciones |
| `DJANGO_SETUP.md` | Guía Django completa |
| `DJANGO_EXAMPLE.md` | Código Django ejemplo |

## Componentes Crear / Editar

### Header
Cambiar logo, navegación, colores:
- Edita `src/components/Header.jsx`
- Personaliza colores en `Header.css`

### Hero
Cambiar texto, botones, imagen:
- Edita `src/components/Hero.jsx`
- Personaliza estilos en `Hero.css`

### Login
Ya funcional, solo conectar con tu Django:
- URL base: `src/components/LoginSection.jsx` línea 12
- Cambiar `API_BASE_URL`

### Mapa
Ya funcional, solo conectar con tu Django:
- URL base: `src/components/MapSection.jsx` línea 24
- Cambiar `API_BASE_URL`

## Cambiar Colores

### Colores Globales
Busca y reemplaza en todos los CSS:
- `#ff1493` → Tu color primario (rosa)
- `#667eea` → Tu color secundario (azul)
- `#2c3e50` → Tu color de texto (gris)

### O edita CSS individuales
Cada componente tiene su `ComponentName.css`

## Testing

### Sin Django (datos de ejemplo)
- Login muestra datos de ejemplo
- Mapa muestra 2 ubicaciones hardcodeadas

### Con Django
1. Verifica CORS en `settings.py`
2. Crea los endpoints
3. Prueba con Postman

## Estructura Componentizada

```
Inicio (página)
├── Header
│   └── Navegación
├── Hero
│   ├── Texto principal
│   └── Botones
├── Services
│   └── 3 tarjetas de servicios
├── LoginSection (o MapSection)
│   └── Mostrar una u otra
└── Footer
```

## Agregar Nuevas Páginas

1. Crea archivo en `src/pages/`
2. Importa en `App.jsx`
3. Renderiza

Ejemplo:
```javascript
// src/pages/about.jsx
export default function About() {
  return <div>Sobre Nosotros</div>
}
```

## Deploy

### Vite Build
```bash
npm run build
```
Genera carpeta `dist/` lista para producción

### Hosting Recomendado
- Vercel
- Netlify
- GitHub Pages

### Variables de Producción
```env
VITE_API_URL=https://tubackend.com/api
```

## Solución de Problemas

### "Cannot find module LoginSection"
```bash
npm install
```

### CORS Error
Revisa `DJANGO_SETUP.md` - sección CORS

### Login no funciona
- Verifica endpoint en `http://localhost:8000/api/login/`
- Respuesta debe tener `token`

### Mapa no carga
- Verifica `http://localhost:8000/api/locations/`
- Debe retornar array

## Checklist Antes de Deploy

- [ ] Backend Django configurado
- [ ] CORS habilitado en Django
- [ ] Endpoints creados
- [ ] `.env` con URL correcta
- [ ] `npm run build` sin errores
- [ ] Probar login
- [ ] Probar mapa
- [ ] Revisar responsive en móvil

## Recursos

📚 [DJANGO_SETUP.md](./DJANGO_SETUP.md) - Setup completo
📚 [DJANGO_EXAMPLE.md](./DJANGO_EXAMPLE.md) - Código Django
📚 [README_PROYECTO.md](./README_PROYECTO.md) - Documentación completa

---

**¡Listo! A programar! 💻**
