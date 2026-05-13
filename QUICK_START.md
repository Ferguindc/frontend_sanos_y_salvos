# 🎯 Guía de Inicio Rápido - BFF

## ⚡ Inicio en 3 pasos

### Paso 1: Instalar Dependencias

#### Backend BFF
```bash
cd backend
npm install
```

#### Frontend
```bash
# En la raíz del proyecto
npm install
```

### Paso 2: Configurar Variables de Entorno

#### Backend
```bash
cd backend
cp .env.example .env
# Editar .env si es necesario (por defecto PORT=5000)
```

#### Frontend
```bash
# En la raíz del proyecto
cp .env.example .env
# Editar .env si es necesario (URL del BFF debe ser http://localhost:5000/api)
```

### Paso 3: Ejecutar Ambos Servidores

#### Opción A: Dos terminales (Recomendado)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# 🚀 BFF ejecutándose en http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
# 🚀 Frontend en http://localhost:5173
```

#### Opción B: Concurrentemente (Requiere concurrently)

1. Instalar dependencia global:
```bash
npm install -g concurrently
```

2. Agregar script en package.json (raíz):
```json
{
  "scripts": {
    "dev:all": "concurrently \"cd backend && npm run dev\" \"npm run dev\""
  }
}
```

3. Ejecutar:
```bash
npm run dev:all
```

## 🧪 Probar el BFF

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

Respuesta esperada:
```json
{
  "status": "OK",
  "message": "BFF está funcionando correctamente"
}
```

### 2. Obtener Mascotas Perdidas
```bash
curl http://localhost:5000/api/pets/missing
```

### 3. Con cURL POST (Login)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@ejemplo.com","password":"password123"}'
```

## 📝 Estructura de Respuestas

Todas las respuestas del BFF siguen este formato:

**Éxito (HTTP 200/201):**
```json
{
  "success": true,
  "data": { /* datos */ },
  "message": "Operación completada"
}
```

**Error (HTTP 400/404/500):**
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

## 🔗 Consumir API desde React

```jsx
import { petsAPI } from '../api/client.js';

function MissingPets() {
  useEffect(() => {
    // Obtener mascotas perdidas
    petsAPI.getMissing().then(response => {
      console.log(response.data); // Array de mascotas
    });
  }, []);
}
```

## 🐛 Solucionar Problemas

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"
- ✅ El BFF está configurado con CORS habilitado
- Verificar que el backend esté ejecutándose en puerto 5000
- Verificar que el VITE_API_URL en .env sea correcto

### Error: "Cannot GET /api/health"
- ✅ Asegurarse que el backend esté ejecutándose
- Verificar terminal del backend por logs de error

### Error: 404 en rutas API
- ✅ Verificar que la ruta exista en backend/routes/
- Revisar logs de Express para errores

## 📱 URLs Importantes

- **Frontend**: http://localhost:5173
- **Backend BFF**: http://localhost:5000
- **API Base**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🔒 Token JWT

El cliente API almacena automáticamente tokens en localStorage:

```javascript
// Después de login, el token se guarda:
localStorage.getItem('authToken')

// Y se envía en todos los requests:
// Authorization: Bearer {token}
```

## 📚 Archivos Importantes

- `backend/server.js` - Punto de entrada del BFF
- `backend/routes/` - Definición de rutas
- `src/api/client.js` - Cliente API React
- `BFF_README.md` - Documentación completa

---

**¡Listo para empezar!** 🚀
