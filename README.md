# Sanos y Salvos - Frontend

Plataforma de reportes de mascotas perdidas y encontradas con geolocalización en tiempo real.

## Descripcion del Proyecto

Sanos y Salvos es una aplicación web que permite a los usuarios reportar mascotas perdidas o encontradas, visualizar reportes en un mapa interactivo y conectarse con la comunidad para encontrar mascotas extraviadas.

## Caracteristicas Principales

- **Autenticación de Usuarios**: Sistema de login y registro con JWT
- **Perfil de Usuario**: Página de cuenta donde los usuarios pueden ver sus datos
- **Reportar Mascotas**: Formulario para crear reportes de mascotas perdidas o encontradas
- **Mapa Interactivo**: Visualizacion de todos los reportes en tiempo real con Mapbox GL JS
- **Filtros**: Opcion de filtrar reportes por tipo (perdido/encontrado/ambos)
- **Sesion Persistente**: Los usuarios permanecen autenticados usando JWT almacenado en localStorage
- **Interfaz Responsiva**: Diseño adaptable para dispositivos moviles y desktop

## Stack Tecnologico

- Frontend: React 19 + Vite
- Mapeo: Mapbox GL JS
- Autenticacion: JWT Tokens
- Estado Global: React Context API
- Estilos: CSS puro

## Microservicios Conectados

1. **Auth Service** (Puerto 8003): Maneja login y generacion de JWT
2. **User Service** (Puerto 8002): Gestiona registro y datos de usuarios
3. **Geo Service** (Puerto 8001): Administra ubicaciones y reportes de mascotas

## Paginas Principales

- **Home**: Landing page con informacion sobre la mision de Sanos y Salvos
- **Mapa**: Visualizacion de todos los reportes en el mapa
- **Reportar**: Formulario para crear nuevos reportes (requiere autenticacion)
- **Mi Cuenta**: Perfil del usuario autenticado
- **FAQ**: Preguntas frecuentes

## Instalacion y Ejecucion

```bash
# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev

# Build para produccion
npm run build
```

## Variables de Entorno

Crear archivo `.env.local` en la raiz del proyecto:

```
VITE_GEO_SERVICE_URL=http://localhost:8001/api
VITE_AUTH_SERVICE_URL=http://127.0.0.1:8003
VITE_USER_SERVICE_URL=http://127.0.0.1:8002
```

## Flujo de Autenticacion

1. Usuario completa formulario de registro o login en AuthModal
2. Credenciales se envian al Auth Service
3. Server retorna JWT token y datos del usuario
4. Token y usuario se almacenan en localStorage y en Context API
5. Componentes acceden a datos via hook useAuth()
6. Al reportar mascota, se incluyen datos del usuario autenticado

## Estructura de Carpetas

```
src/
  components/      # Componentes reutilizables
  pages/           # Paginas principales
  services/        # Clientes API y logica de servicios
  hooks/           # Hooks personalizados
  context/         # Context API para estado global
  assets/          # Imagenes y recursos
```

## Proximos Pasos

- Implementar carga de imagenes para reportes
- Agregar busqueda por proximidad mejorada
- Sistema de notificaciones para reportes cercanos
- Dashboard de estadisticas
