# 🛡️ Panel Administrativo - Sanos y Salvos

## 📝 Credenciales de Acceso

```
Usuario: admin
Contraseña: admin
```

## 🚀 Acceso al Panel

### Desde el Frontend:
1. Abre la página principal: http://localhost:5173
2. Busca el botón **"🛡️ Admin"** en la esquina superior derecha
3. O accede directamente: http://localhost:5173/#admin
4. Ingresa las credenciales (admin / admin)

## 📊 Funcionalidades del Panel

### 1. Dashboard
- **Estadísticas generales**:
  - Total de reportes pendientes
  - Total de mascotas perdidas
  - Total de mascotas encontradas
  - Total de mascotas recuperadas

- **Estadísticas de este mes**:
  - Reportes de pérdidas
  - Reportes de mascotas encontradas
  - Mascotas recuperadas

- **Actividad reciente**:
  - Últimos reportes ingresados
  - Estado de cada reporte

### 2. Gestión de Reportes (📋 Reportes)
Visualiza y filtra todos los reportes de mascotas:

**Filtros disponibles**:
- Por tipo (Perdidas / Encontradas / Todos)
- Por estado (Pendientes / Aprobados / Rechazados / Recuperados)
- Búsqueda por nombre o reportante

**Acciones por reporte**:
- Ver detalle completo
- Aprobar reporte
- Rechazar reporte
- Marcar como recuperada
- Agregar notas internas

### 3. Detalle de Reporte
Al seleccionar un reporte, accedes a:

**Información de la Mascota**:
- Foto
- Nombre, raza, edad, color
- Microchip y estado de vacunación
- Tipo de reporte (Perdida/Encontrada)

**Información del Reportante**:
- Nombre completo
- Email y teléfono
- Dirección

**Ubicación**:
- Área reportada
- Coordenadas GPS

**Clínicas Notificadas**:
- Lista de clínicas contactadas
- Respuestas recibidas

**Notas Administrativas**:
- Editor de notas
- Guardar observaciones internas

**Acciones**:
- Aprobar (si está pendiente)
- Rechazar (si está pendiente)
- Marcar como recuperada (si está aprobado)

## 🔗 Rutas del Backend (API)

### Admin Routes - `/api/admin`

#### Autenticación
- `POST /api/admin/login` - Iniciar sesión
  - Body: `{ username, password }`
  - Response: `{ token, admin }`

#### Dashboard
- `GET /api/admin/dashboard` - Obtener estadísticas
  - Requiere: Token en header `Authorization: Bearer {token}`
  - Response: Estadísticas del sistema

#### Gestión de Reportes
- `GET /api/admin/pets` - Obtener lista de reportes
  - Query: `status`, `type`, `search`
  - Response: Array de reportes

- `GET /api/admin/pets/:id` - Obtener detalle de reporte
  - Response: Detalle completo del reporte

- `PUT /api/admin/pets/:id/approve` - Aprobar reporte
  - Body: `{ notes }`
  - Response: Confirmación

- `PUT /api/admin/pets/:id/reject` - Rechazar reporte
  - Body: `{ reason }`
  - Response: Confirmación

- `PUT /api/admin/pets/:id/recover` - Marcar como recuperada
  - Body: `{ clinicId, recoveryDate }`
  - Response: Confirmación

- `PUT /api/admin/pets/:id/notes` - Actualizar notas
  - Body: `{ notes }`
  - Response: Confirmación

- `DELETE /api/admin/pets/:id` - Eliminar reporte
  - Response: Confirmación

## 🎨 Componentes React Creados

### Estructura de Carpetas
```
src/components/Admin/
├── AdminLogin.jsx          # Pantalla de login
├── AdminLogin.css
├── AdminDashboard.jsx      # Dashboard con estadísticas
├── AdminDashboard.css
├── AdminPetsList.jsx       # Lista de reportes
├── AdminPetsList.css
├── AdminPetDetail.jsx      # Detalle de reporte
└── AdminPetDetail.css

src/pages/
├── admin.jsx               # Página principal admin
└── admin.css
```

## 🌈 Colores Utilizados

- **Primario**: #2D4059 (Azul oscuro)
- **Naranja**: #FF844B (Acciones, botones destacados)
- **Verde**: #70D6BC (Éxito, aprobación)
- **Amarillo**: #FFD460 (Alertas, pendientes)
- **Gris**: #F7F9FC (Fondos neutrales)

## 🔐 Seguridad

**Tokens JWT**:
- Se guardan automáticamente en localStorage
- Se envían en header `Authorization: Bearer {token}`
- Se limpian al cerrar sesión

**Middleware de Autenticación**:
- Backend verifica token en cada request
- Solo usuarios autenticados pueden acceder a datos sensibles

## 📱 Responsive Design

El panel administrativo es completamente responsive:
- **Desktop**: Interfaz completa con sidebar
- **Tablet**: Interfaz comprimida, menú desplegable
- **Mobile**: Menú hamburguesa, diseño optimizado

## 🚀 Próximas Mejoras

1. **Persistencia de Datos**: Integrar con base de datos real
2. **Exportación**: Generar reportes en PDF/Excel
3. **Notificaciones**: Sistema de alertas en tiempo real
4. **Auditoría**: Log de acciones administrativas
5. **Roles**: Diferentes niveles de permisos
6. **2FA**: Autenticación de dos factores

## 📚 Documentación de Componentes

### AdminLogin
- **Propiedades**: `onLoginSuccess`
- **Estado**: username, password, loading, error
- **Funcionalidad**: Autentica admin contra API

### AdminDashboard
- **Propiedades**: Ninguna
- **Estado**: dashData, loading, error
- **Funcionalidad**: Muestra estadísticas generales

### AdminPetsList
- **Propiedades**: `onSelectPet`
- **Estado**: pets, loading, error, filters
- **Funcionalidad**: Lista y filtra reportes

### AdminPetDetail
- **Propiedades**: `petId`, `onBack`
- **Estado**: pet, loading, error, notes, showRejectModal
- **Funcionalidad**: Gestiona un reporte específico

## 🐛 Troubleshooting

### No puedo ingresar al panel
- Verifica que el backend esté corriendo: `cd backend && npm run dev`
- Verifica las credenciales: admin / admin
- Revisa la consola del navegador para errores CORS

### Los datos no se cargan
- Asegúrate de que `VITE_API_URL` en .env apunta a http://localhost:5000/api
- Verifica que el backend está en http://localhost:5000

### El botón Admin no aparece
- Abre DevTools (F12) y verifica la consola
- Recarga la página (Ctrl+R o Cmd+R)
- Verifica que Header.jsx se actualizó correctamente

## 📞 Soporte

Para reportes de bugs o sugerencias de mejora, contacta al equipo de desarrollo.

---

**Panel Administrativo v1.0** ✅  
**Actualizado**: 12/05/2026  
**Estado**: Listo para producción con datos simulados
