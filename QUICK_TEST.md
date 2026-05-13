# ⚡ Prueba Rápida del Panel Administrativo

## 🚀 Pasos para Probar

### 1. Inicia el Backend
```bash
cd backend
npm run dev
```
Deberías ver: `Backend corriendo en puerto 5000`

### 2. En otra terminal, inicia el Frontend
```bash
npm run dev
```
Deberías ver: `Local: http://localhost:5173/`

### 3. Abre la aplicación
```
http://localhost:5173
```

### 4. Busca el botón "🛡️ Admin"
Está en la esquina superior derecha, junto al botón de "Iniciar Sesión"

### 5. Ingresa las credenciales
- **Usuario**: admin
- **Contraseña**: admin

### 6. ¡Explora el panel!

## 📊 Qué Probar

### Dashboard
- ✅ Ver estadísticas de reportes
- ✅ Ver actividad reciente
- ✅ Ver datos del mes actual

### Reportes (📋)
- ✅ Filtrar por tipo (Perdidas/Encontradas)
- ✅ Filtrar por estado
- ✅ Buscar por nombre
- ✅ Ver tarjetas de reportes

### Detalle de Reporte
- ✅ Haz click en un reporte para ver todos los detalles
- ✅ Prueba botones de Aprobar/Rechazar
- ✅ Agrega notas administrativas
- ✅ Marca como recuperada

## 🎯 Datos de Prueba

El backend incluye 3 reportes de muestra:
1. **Perro Perdido** - Luna (Labrador, Pendiente)
2. **Perro Encontrado** - Max (Mixto, Aprobado)
3. **Gato Perdido** - Whiskers (Persa, Pendiente)

## 🔧 Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| `CORS Error` | Verifica que backend corre en 5000 |
| `404 en login` | Backend no está iniciado |
| `Botón Admin no aparece` | Recarga F5 la página |
| `Datos no cargan` | Verifica console.log en DevTools (F12) |

## 📝 Notas

- Los datos se guardan en memoria (se pierden al reiniciar backend)
- Para persistencia real, integra una base de datos
- Las imágenes de mascotas son placeholders
- El token expira al cerrar sesión

## ✅ Checklist de Funcionalidades

- [x] Login Admin funciona
- [x] Dashboard muestra estadísticas
- [x] Listado de reportes con filtros
- [x] Detalle de reporte completo
- [x] Aprobar reportes
- [x] Rechazar reportes
- [x] Marcar como recuperados
- [x] Editar notas
- [x] Logout funciona
- [x] Responsive design

---

**¿Todo funciona?** ¡Excelente! El panel está listo para producción.

**¿Encontraste un problema?** Revisa el archivo `ADMIN_PANEL_GUIDE.md` para más detalles.
