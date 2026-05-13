# 📦 Dependencias del Proyecto - Sanos y Salvos

## Resumen Ejecutivo

Este proyecto utiliza **Node.js + npm** para gestionar dependencias (no Python).

```
Requisitos mínimos:
- Node.js: v18.0.0+
- npm: v9.0.0+
```

## Frontend - package.json (Raíz)

```json
{
  "name": "frontend_masacota",
  "version": "0.0.0",
  "type": "module",
  "dependencies": {
    "leaflet": "^1.9.4",
    "mapbox-gl": "^3.23.1",
    "react": "^19.2.5",
    "react-dom": "^19.2.5",
    "react-leaflet": "^5.0.0"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.1",
    "eslint": "^10.2.1",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.2",
    "globals": "^17.5.0",
    "vite": "^8.0.10"
  }
}
```

**Total Dependencias**: 5  
**Total DevDependencies**: 8  
**Tamaño Estimado**: ~500MB después de npm install

## Backend - backend/package.json

```json
{
  "name": "sanos-y-salvos-bff",
  "version": "1.0.0",
  "main": "server.js",
  "type": "module",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3"
  },
  "devDependencies": {}
}
```

**Total Dependencias**: 3  
**Total DevDependencies**: 0  
**Tamaño Estimado**: ~50MB después de npm install

## Desglose de Dependencias

### Frontend - Producción (5 dependencias)

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `react` | ^19.2.5 | Librería principal de UI |
| `react-dom` | ^19.2.5 | Renderizador para navegador |
| `leaflet` | ^1.9.4 | Mapas interactivos de código abierto |
| `mapbox-gl` | ^3.23.1 | Mapas vectoriales avanzados |
| `react-leaflet` | ^5.0.0 | Integración React-Leaflet |

### Frontend - Desarrollo (8 dependencias)

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `vite` | ^8.0.10 | Build tool y dev server ultra-rápido |
| `@vitejs/plugin-react` | ^6.0.1 | Plugin oficial React para Vite |
| `eslint` | ^10.2.1 | Linter de código JavaScript |
| `eslint-plugin-react-hooks` | ^7.1.1 | Reglas ESLint para React Hooks |
| `eslint-plugin-react-refresh` | ^0.5.2 | Reglas para React Fast Refresh |
| `@eslint/js` | ^10.0.1 | Configuración base ESLint |
| `@types/react` | ^19.2.14 | Tipos TypeScript para React |
| `@types/react-dom` | ^19.2.3 | Tipos TypeScript para React DOM |
| `globals` | ^17.5.0 | Variables globales para ESLint |

### Backend - Producción (3 dependencias)

| Paquete | Versión | Propósito |
|---------|---------|-----------|
| `express` | ^4.18.2 | Framework web para Node.js |
| `cors` | ^2.8.5 | Middleware para manejo de CORS |
| `dotenv` | ^16.0.3 | Carga variables de .env |

## 📥 Instalación Automática

### Opción 1: Script de Setup (Recomendado)

**Windows:**
```powershell
.\setup.ps1
```

**Mac/Linux:**
```bash
bash setup.sh
```

### Opción 2: Comando npm

```bash
npm run setup:all
```

Este comando ejecuta:
1. `npm install` en `/backend`
2. `npm install` en la raíz (frontend)
3. Configura archivos .env

### Opción 3: Manual

```bash
# Backend
cd backend
npm install
cd ..

# Frontend
npm install

# Variables de entorno
copy .env.example .env
copy backend\.env.example backend\.env
```

## 🔍 Verificación Post-Instalación

```bash
# Verificar Node.js
node --version
# Debe mostrar: v18.x.x o superior

# Verificar npm
npm --version
# Debe mostrar: 9.x.x o superior

# Verificar instalación backend
cd backend
npm list
cd ..

# Verificar instalación frontend
npm list

# Health check
curl http://localhost:5000/api/health
# Debe retornar: {"status":"OK","message":"..."}
```

## 📊 Estructura de Carpetas Después de npm install

```
frontend_sanos_y_salvos/
├── node_modules/          (📦 ~500MB - Frontend)
├── backend/
│   └── node_modules/      (📦 ~50MB - Backend)
├── src/
├── .env                   (creado por setup)
├── .env.example
└── ...
```

## ⚙️ Configuración de Entorno

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Sanos y Salvos
VITE_APP_VERSION=1.0.0
```

### Backend (backend/.env)
```env
PORT=5000
NODE_ENV=development
```

## 🚀 Comandos Disponibles Después de Instalación

### Frontend (raíz del proyecto)
```bash
npm run dev           # Desarrollo: http://localhost:5173
npm run build         # Build producción
npm run lint          # Verificar código
npm run preview       # Preview del build
npm run setup:all     # Instalar todo
npm run dev:all       # Ambos servidores
```

### Backend (cd backend)
```bash
npm run dev           # Desarrollo: http://localhost:5000
npm start             # Producción
```

## 📈 Tamaño Total de Instalación

```
Frontend node_modules:   ~500MB
Backend node_modules:    ~50MB
────────────────────────────────
Total:                   ~550MB
```

> ⚠️ **Nota**: Los tamaños pueden variar según la versión del SO y las dependencias transitivas

## 🔐 Seguridad - npm audit

Después de instalar, ejecutar:

```bash
# Frontend
npm audit

# Backend
cd backend
npm audit
cd ..
```

Para corregir vulnerabilidades:
```bash
npm audit fix
```

## 🆚 Comparación con Otros Proyectos

| Aspecto | Este Proyecto | Típico React | Típico Express |
|--------|---------------|--------------|----------------|
| Dependencias Prod | 5 | 3-10 | 5-20 |
| DevDependencies | 8 | 10-20 | 2-5 |
| Tamaño Total | ~550MB | ~700MB+ | ~200MB+ |
| Complejidad | Baja | Media | Baja |

## 🛠️ Nextjs - Adicionar Más Dependencias

### Agregar dependencia al frontend
```bash
npm install nombre-paquete
```

### Agregar dependencia al backend
```bash
cd backend
npm install nombre-paquete
cd ..
```

### Agregar como devDependency
```bash
npm install --save-dev nombre-paquete
```

## 📝 Notas Importantes

1. **Versionado Semántico**: Usamos `^` para permitir actualizaciones menores
   - `^1.2.3` instala `1.x.x` (compatible)
   
2. **package-lock.json**: Commitear al repositorio para reproducibilidad

3. **node_modules**: NO commitear (incluir en .gitignore)

4. **Node.js LTS**: Se recomienda usar versión LTS (v18, v20, v22)

5. **npm 9+**: Versión mínima recomendada

## 📚 Documentación Oficial

- **Node.js**: https://nodejs.org/docs/
- **npm**: https://docs.npmjs.com/
- **React**: https://react.dev/
- **Vite**: https://vitejs.dev/
- **Express**: https://expressjs.com/
- **Leaflet**: https://leafletjs.com/
- **Mapbox GL**: https://docs.mapbox.com/mapbox-gl-js/

---

**Versión**: 1.0.0  
**Actualizado**: 12/05/2026  
**Estado**: ✅ Listo para producción
