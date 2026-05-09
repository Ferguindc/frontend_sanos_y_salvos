# Configuración - Conexión con Backend Django

## 📋 Información General

La página de inicio incluye secciones de **Login** y **Mapa** que están preparadas para conectarse con tu backend Django.

## 🔌 Configuración del Backend

### 1. **Variables de Entorno**

Crea un archivo `.env` en la raíz del proyecto (carpeta `frontend_masacota/`):

```env
VITE_API_URL=http://localhost:8000/api
```

Luego actualiza la variable `API_BASE_URL` en los componentes:

**LoginSection.jsx** (línea ~12):
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
```

**MapSection.jsx** (línea ~24):
```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
```

### 2. **Endpoints Requeridos en Django**

#### Para Login:
```
POST /api/login/
```
**Body esperado:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Respuesta esperada:**
```json
{
  "token": "your-auth-token",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "Usuario"
  }
}
```

#### Para Ubicaciones (Mapa):
```
GET /api/locations/
```

**Respuesta esperada:**
```json
[
  {
    "id": 1,
    "name": "Main Branch",
    "address": "123 Pet Street, City",
    "phone": "+098987 876 767",
    "email": "info@website.com",
    "lat": 40.7128,
    "lng": -74.0060
  },
  {
    "id": 2,
    "name": "Downtown Branch",
    "address": "456 Animal Ave, City",
    "phone": "+098987 876 768",
    "email": "downtown@website.com",
    "lat": 40.7505,
    "lng": -73.9972
  }
]
```

### 3. **CORS - Configuración en Django**

Asegúrate de que tu backend Django está configurado para permitir CORS desde el frontend:

**settings.py:**
```python
INSTALLED_APPS = [
    ...
    'corsheaders',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    ...
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite dev server
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]

CORS_ALLOW_CREDENTIALS = True
```

## 🚀 Ejecutar el Proyecto

### Frontend:
```bash
npm run dev
```
Se ejecutará en `http://localhost:5173`

### Backend:
```bash
python manage.py runserver
```
Se ejecutará en `http://localhost:8000`

## 📱 Componentes Principales

### Header (`src/components/Header.jsx`)
- Navegación principal
- Logo y contacto
- Botón "Get Appointment"

### Hero (`src/components/Hero.jsx`)
- Sección principal con llamada a la acción
- Botones interactivos

### Services (`src/components/Services.jsx`)
- Mostrar servicios disponibles
- Cards informativas

### LoginSection (`src/components/LoginSection.jsx`)
- Formulario de login
- Conexión con endpoint `/api/login/`
- Almacenamiento de token en localStorage

### MapSection (`src/components/MapSection.jsx`)
- Mostrar ubicaciones del backend
- Conexión con endpoint `/api/locations/`
- Información de contacto por sucursal

### Footer (`src/components/Footer.jsx`)
- Enlaces de navegación
- Información de contacto
- Redes sociales

## 🔐 Autenticación

El token se almacena en `localStorage` con la clave `authToken`.

Para usar el token en futuras peticiones:
```javascript
const token = localStorage.getItem('authToken');

fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
})
```

## 🎨 Personalización

### Cambiar Colores
Edita los archivos CSS de cada componente. Los colores principales son:
- Rosa/Magenta: `#ff1493`, `#ff69b4`
- Azul: `#667eea`, `#764ba2`
- Gris oscuro: `#2c3e50`

### Agregar Más Componentes
Crea nuevos componentes en `src/components/` siguiendo la estructura existente.

## 📝 Notas

- El sitio es **responsive** para móvil, tablet y desktop
- Usa **React 19** y **Vite**
- Los datos de ejemplo en MapSection se muestran si el backend no está disponible
- Todos los formularios están listos para conectarse con Django

## 🐛 Troubleshooting

**CORS Error?**
- Verifica que tu backend tiene CORS habilitado
- Asegúrate que la URL en `API_BASE_URL` es correcta

**Token no se guarda?**
- Verifica la estructura de la respuesta del endpoint de login
- El token debe venir en `data.token`

**Ubicaciones no cargan?**
- Verifica que el endpoint retorna un array con los campos necesarios
- Si falla, se muestran datos de ejemplo

---

¡Tu sitio está listo para conectarse con Django! 🚀
