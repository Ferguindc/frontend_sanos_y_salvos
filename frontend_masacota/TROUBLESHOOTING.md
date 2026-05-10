# 🔧 Troubleshooting Rápido

## ❌ Problemas Comunes

### Error: "Cannot find module './pages/inicio'"
**Solución:**
```bash
npm install
npm run dev
```

### Error: "CORS error" al hacer login
**Solución Django:**
```python
# settings.py
INSTALLED_APPS = ['corsheaders', ...]
MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware', ...]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

### Login falla con error 404
**Verificar:**
1. Django corre en `http://localhost:8000`
2. Endpoint existe: `POST http://localhost:8000/api/login/`
3. Respuesta tiene estructura: `{ "token": "...", "user": {...} }`

### Mapa no muestra ubicaciones
**Verificar:**
1. Endpoint existe: `GET http://localhost:8000/api/locations/`
2. Respuesta es array: `[ {...}, {...} ]`
3. Cada objeto tiene: `id, name, address, phone, email, lat, lng`

### Página en blanco
**Soluciones:**
1. Abre DevTools (F12)
2. Revisa Console por errores
3. Verifica Network en request

### Colores no cambian
**Editar CSS:**
- Abre archivo CSS del componente
- Busca color hex: `#ff1493`
- Reemplaza por tu color

### Formulario no responde
**Verificar:**
1. Backend Django activo
2. CORS configurado
3. Endpoint correcto en `API_BASE_URL`

## ✅ Verificación Rápida

### Frontend
```bash
# 1. Instala dependencias
npm install

# 2. Ejecuta dev server
npm run dev

# 3. Abre navegador
http://localhost:5173
```

### Backend Django
```bash
# 1. Activa virtual env
# 2. Corre servidor
python manage.py runserver

# 3. Revisa consola: "Running on http://127.0.0.1:8000"
```

### Endpoints
```bash
# Test Login
curl -X POST http://localhost:8000/api/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test"}'

# Test Locations
curl http://localhost:8000/api/locations/
```

## 🔍 Debug Checklist

- [ ] Frontend en `http://localhost:5173`
- [ ] Backend en `http://localhost:8000`
- [ ] CORS habilitado en Django
- [ ] Endpoint `/api/login/` funciona
- [ ] Endpoint `/api/locations/` funciona
- [ ] Token se guarda en localStorage
- [ ] Responsive funciona en móvil

## 📱 Test Responsive

1. Abre DevTools: `F12`
2. Click icono móvil (Ctrl+Shift+M)
3. Prueba tamaños: 375px, 768px, 1200px

## 🔐 Test Auth

```javascript
// En DevTools Console
localStorage.setItem('authToken', 'token-test')
localStorage.getItem('authToken')
localStorage.clear()
```

## 📊 Network Debugging

1. DevTools → Network
2. Filtra por Fetch/XHR
3. Click en request
4. Revisa Request/Response

## 🆘 Última Opción

Si nada funciona:
1. Borra `node_modules` y `.lock`
2. Reinstala: `npm install`
3. Limpia caché: `npm cache clean --force`
4. Reinicia servidor: `npm run dev`

---

**¿Aún con problema?** Revisa DJANGO_SETUP.md o DJANGO_EXAMPLE.md
