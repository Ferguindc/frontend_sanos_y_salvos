# ✅ Checklist de Instalación - Sanos y Salvos

## Pre-Instalación

- [ ] **Node.js v18+** instalado
  ```bash
  node --version  # Debe mostrar v18.x.x o superior
  ```
  
- [ ] **npm v9+** instalado
  ```bash
  npm --version   # Debe mostrar 9.x.x o superior
  ```
  
  Si no está instalado:
  - Descarga desde: https://nodejs.org/
  - Elige versión LTS (Long Term Support)

## Instalación Automática (Recomendado)

### Windows (PowerShell)
- [ ] Abre PowerShell en la carpeta del proyecto
- [ ] Ejecuta: `.\setup.ps1`
- [ ] Espera a que se complete (~5-10 minutos)
- [ ] Verifica mensajes de éxito: ✅

### Mac/Linux (Bash)
- [ ] Abre terminal en la carpeta del proyecto
- [ ] Ejecuta: `bash setup.sh`
- [ ] Espera a que se complete (~5-10 minutos)
- [ ] Verifica mensajes de éxito: ✅

### Manual (Todos los SO)
- [ ] Ejecuta: `npm run setup:all`
- [ ] Espera a que se complete

## Post-Instalación

### Verificar Instalación

- [ ] Backend instalado
  ```bash
  cd backend && npm list && cd ..
  # Debe mostrar: sanos-y-salvos-bff
  ```

- [ ] Frontend instalado
  ```bash
  npm list
  # Debe mostrar paquetes principales
  ```

- [ ] Archivos .env creados
  - [ ] `.env` existe en la raíz
  - [ ] `backend/.env` existe

### Probar Funcionamiento

- [ ] **Terminal 1 - Backend**
  ```bash
  cd backend
  npm run dev
  # Debe mostrar: 🚀 BFF ejecutándose en http://localhost:5000
  ```

- [ ] **Terminal 2 - Frontend**
  ```bash
  npm run dev
  # Debe mostrar: VITE v8.x.x ready in XXXms
  ```

- [ ] **Verificar URLs**
  - [ ] Frontend: http://localhost:5173 (debe cargar sin errores)
  - [ ] Backend: http://localhost:5000/api/health (debe retornar JSON)
  - [ ] API: http://localhost:5000/api/pets/missing (debe retornar datos)

## Solución de Problemas

### ❌ "npm: comando no encontrado"
- [ ] Node.js no está en PATH
- [ ] Solución: Reinstalar Node.js y reiniciar terminal

### ❌ "error 404 - módulo no encontrado"
- [ ] npm install no se completó correctamente
- [ ] Solución:
  ```bash
  # Backend
  cd backend && rm -rf node_modules && npm install && cd ..
  
  # Frontend
  rm -rf node_modules && npm install
  ```

### ❌ "EADDRINUSE - puerto ya en uso"
- [ ] Otro proceso está usando el puerto
- [ ] Solución:
  - [ ] Frontend (5173): Cierra otro Vite
  - [ ] Backend (5000): Cierra otro Express
  - [ ] Cambia el puerto en .env

### ❌ "CORS policy error"
- [ ] Backend no está corriendo
- [ ] Solución:
  - [ ] Verifica que backend esté en http://localhost:5000
  - [ ] Verifica que VITE_API_URL en .env es correcto

### ❌ "Cannot read .env file"
- [ ] Los archivos .env no fueron creados
- [ ] Solución:
  ```bash
  cp .env.example .env
  cp backend/.env.example backend/.env
  ```

## Verificación Final

### Health Checks

- [ ] Backend health check
  ```bash
  curl http://localhost:5000/api/health
  # Respuesta: {"status":"OK","message":"..."}
  ```

- [ ] Frontend carga
  - [ ] Se abre en http://localhost:5173
  - [ ] No hay errores en consola de navegador
  - [ ] Componentes se ven correctamente

- [ ] Conexión Frontend-Backend
  - [ ] Abre DevTools (F12) → Network
  - [ ] Hace clic en algún botón que llame API
  - [ ] Debe ver request a http://localhost:5000/api

### Seguridad

- [ ] Ejecutar audit de seguridad
  ```bash
  npm audit
  cd backend && npm audit && cd ..
  ```
  
- [ ] No hay vulnerabilidades críticas (CRITICAL)
  - [ ] Si hay, ejecutar: `npm audit fix`

## Próximos Pasos

- [ ] Revisar documentación: `BFF_README.md`
- [ ] Explorar estructura: `ARCHITECTURE.md`
- [ ] Empezar desarrollo
- [ ] Agregar variables de entorno reales (si no es localhost)

## Información Útil

### Puertos
- **Frontend**: 5173
- **Backend**: 5000

### Carpetas Importantes
- `src/` - Código React
- `backend/` - Servidor Express BFF
- `src/api/` - Cliente API

### Comandos Frecuentes
```bash
# Desarrollo
npm run dev          # Frontend
cd backend && npm run dev  # Backend
npm run dev:all      # Ambos (requiere 2 terminales)

# Build
npm run build        # Producción

# Linting
npm run lint         # Verificar código
```

### Variables de Entorno Comunes
```env
# Frontend (.env)
VITE_API_URL=http://localhost:5000/api

# Backend (backend/.env)
PORT=5000
NODE_ENV=development
```

## Estado Final

```
✅ Node.js v18+ instalado
✅ npm v9+ instalado
✅ Dependencias frontend instaladas
✅ Dependencias backend instaladas
✅ Archivos .env configurados
✅ Backend funcionando en :5000
✅ Frontend funcionando en :5173
✅ Conexión API verificada
✅ Sin vulnerabilidades críticas

🚀 PROYECTO LISTO PARA DESARROLLO
```

---

**Versión**: 1.0.0  
**Última actualización**: 12/05/2026  
**Tiempo estimado**: 10-15 minutos
