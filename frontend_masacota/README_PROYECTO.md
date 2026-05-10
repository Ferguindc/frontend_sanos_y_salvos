# 🐾 CarePress - Frontend Mascotas

## ✨ Descripción

Página web moderna para un servicio de cuidado de mascotas construida con **React 19** y **Vite**, totalmente preparada para conectarse con un backend **Django**.

## 📁 Estructura del Proyecto

```
frontend_masacota/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Navegación principal
│   │   ├── Header.css
│   │   ├── Hero.jsx                # Sección hero
│   │   ├── Hero.css
│   │   ├── Services.jsx            # Catálogo de servicios
│   │   ├── Services.css
│   │   ├── LoginSection.jsx        # Login con Django
│   │   ├── LoginSection.css
│   │   ├── MapSection.jsx          # Ubicaciones desde Django
│   │   ├── MapSection.css
│   │   ├── Footer.jsx              # Pie de página
│   │   └── Footer.css
│   ├── pages/
│   │   ├── inicio.jsx              # Página principal
│   │   └── inicio.css
│   ├── App.jsx                     # Componente raíz
│   ├── main.jsx                    # Entrada de la app
│   └── index.css
├── public/
├── DJANGO_SETUP.md                 # Guía de configuración Django
├── DJANGO_EXAMPLE.md               # Ejemplos de código Django
├── README.md
├── package.json
├── vite.config.js
└── eslint.config.js
```

## 🚀 Características

### ✅ Página Principal
- Header sticky con navegación
- Hero section con llamada a la acción
- Sección de servicios (3 tarjetas)
- Conexión con Login y Mapa
- Footer con información y redes

### 🔐 Sistema de Login
- Formulario limpio y moderno
- Conexión con endpoint Django `/api/login/`
- Almacenamiento de token en localStorage
- Manejo de errores

### 🗺️ Sección Mapa
- Carga ubicaciones desde Django
- Lista de sucursales con detalles
- Información de contacto por ubicación
- Datos de ejemplo si el backend no está disponible

### 📱 Responsive Design
- Desktop (1200px+)
- Tablet (768px - 1200px)
- Mobile (< 768px)

### 🎨 Diseño Moderno
- Gradientes atractivos
- Colores primarios: Rosa (#ff1493), Azul (#667eea)
- Animaciones suaves
- Interfaz intuitiva

## 🛠️ Configuración Rápida

### 1. Instalar Dependencias
```bash
cd frontend_masacota
npm install
```

### 2. Variables de Entorno
Crea `.env`:
```env
VITE_API_URL=http://localhost:8000/api
```

### 3. Iniciar Servidor de Desarrollo
```bash
npm run dev
```
Abre `http://localhost:5173`

### 4. Build para Producción
```bash
npm run build
```

## 📡 Conexión con Django

### Endpoints Requeridos

#### POST `/api/login/`
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Respuesta:**
```json
{
  "token": "token-string",
  "user": { "id": 1, "email": "user@example.com", "name": "Name" }
}
```

#### GET `/api/locations/`
**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Main Branch",
    "address": "123 Pet Street",
    "phone": "+098987 876 767",
    "email": "info@website.com",
    "lat": 40.7128,
    "lng": -74.0060
  }
]
```

## 🔧 Configuración CORS Django

En `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

## 📚 Documentación

- **[DJANGO_SETUP.md](./DJANGO_SETUP.md)** - Guía completa de configuración
- **[DJANGO_EXAMPLE.md](./DJANGO_EXAMPLE.md)** - Ejemplos de código Django

## 🎯 Próximos Pasos

1. ✅ Página de inicio creada
2. ✅ Componentes modulares
3. ✅ Login integrado
4. ✅ Mapa de ubicaciones
5. 📋 Ajustar colores según tu marca
6. 📋 Conectar con tu backend Django
7. 📋 Añadir más funcionalidades (reservas, servicios, etc.)

## 🎨 Personalización

### Cambiar Colores
Edita en los archivos CSS:
- `#ff1493` → Color principal
- `#667eea` → Color secundario

### Agregar Nuevas Páginas
Crea nuevos componentes en `src/components/` y `src/pages/`

### Agregar Rutas
Este proyecto es una SPA simple. Para multi-página, instala React Router:
```bash
npm install react-router-dom
```

## 📦 Dependencias

- React 19.2.5
- Vite 8.0.10
- React-DOM 19.2.5

## ✅ Checklist de Configuración Django

- [ ] Instalar `django-cors-headers`
- [ ] Configurar CORS en settings.py
- [ ] Crear modelo Location
- [ ] Crear endpoint `/api/login/`
- [ ] Crear endpoint `/api/locations/`
- [ ] Hacer migraciones
- [ ] Crear datos de prueba
- [ ] Ejecutar servidor Django en puerto 8000

## 🐛 Troubleshooting

**Error CORS:** Verifica CORS en Django settings
**Login no funciona:** Revisa que el endpoint retorna `token`
**Mapa sin datos:** Revisa que `/api/locations/` retorna array

## 📝 Notas

- El token se guarda en localStorage
- Los datos de ejemplo se muestran si el backend falla
- Todo es responsive
- Está listo para producción (solo falta ajustes finales)

---

**¡Tu sitio web de mascotas está listo para volar! 🚀**
