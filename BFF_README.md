# 🚀 Arquitectura BFF - Sanos y Salvos

## 📋 Descripción

Este proyecto implementa la arquitectura **Backend for Frontend (BFF)**, un patrón arquitectónico donde se crea una capa backend específicamente diseñada para servir al frontend React/Vite.

## 🏗️ Estructura del Proyecto

```
frontend_sanos_y_salvos/
├── backend/                  # BFF Backend (Express.js)
│   ├── routes/
│   │   ├── auth.js          # Rutas de autenticación
│   │   ├── pets.js          # Rutas de mascotas
│   │   └── clinics.js       # Rutas de clínicas
│   ├── server.js            # Servidor principal Express
│   ├── package.json         # Dependencias backend
│   └── .env.example         # Variables de entorno de ejemplo
├── src/
│   ├── api/
│   │   └── client.js        # Cliente API centralizado
│   ├── components/          # Componentes React
│   ├── pages/               # Páginas
│   ├── hooks/               # Custom hooks
│   └── ...
├── vite.config.js           # Configuración Vite frontend
├── package.json             # Dependencias frontend
└── .env.example             # Variables de entorno frontend
```

## 🔌 Conexión Frontend - BFF

### Flujo de datos:

```
React Component
    ↓
src/api/client.js (API Client)
    ↓
HTTP Request
    ↓
Express BFF (backend/)
    ↓
routes/ (auth, pets, clinics)
    ↓
HTTP Response
    ↓
React Component (actualiza estado)
```

## 🚀 Instalación y Configuración

### 1. Backend (BFF)

```bash
# Navegar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev

# Servidor estará en: http://localhost:5000
```

### 2. Frontend

```bash
# En la raíz del proyecto
npm install

# Crear archivo .env (si no existe)
cp .env.example .env

# Iniciar servidor de desarrollo
npm run dev

# Frontend estará en: http://localhost:5173
```

## 📡 Rutas API Disponibles

### Autenticación `/api/auth`
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrarse
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/profile` - Obtener perfil del usuario

### Mascotas `/api/pets`
- `GET /api/pets/missing` - Obtener mascotas perdidas
- `GET /api/pets/:id` - Obtener mascota específica
- `POST /api/pets/report` - Reportar mascota perdida
- `PUT /api/pets/:id` - Actualizar estado de mascota

### Clínicas `/api/clinics`
- `GET /api/clinics` - Obtener lista de clínicas
- `GET /api/clinics/:id` - Obtener detalle de clínica
- `POST /api/clinics/:id/register-pet` - Registrar mascota encontrada

### Salud `/api/health`
- `GET /api/health` - Verificar estado del BFF

## 💻 Uso en Componentes React

### Ejemplo de consumir API

```jsx
import { petsAPI } from '../api/client.js';

export function MyComponent() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        const response = await petsAPI.getMissing();
        setPets(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {pets.map(pet => (
        <li key={pet.id}>{pet.name}</li>
      ))}
    </ul>
  );
}
```

## 🔐 Autenticación

El cliente API maneja automáticamente los tokens JWT:

```jsx
// En login
const response = await authAPI.login(email, password);
localStorage.setItem('authToken', response.token);

// El token se envía automáticamente en headers
// Authorization: Bearer {token}
```

## 🌍 Variables de Entorno

### Backend (.env)
```
PORT=5000
NODE_ENV=development
# API_GATEWAY_URL=https://api.ejemplo.com
# DATABASE_URL=mongodb://localhost:27017/sanos-y-salvos
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
VITE_APP_NAME=Sanos y Salvos
VITE_APP_VERSION=1.0.0
```

## 📦 Dependencias

### Backend
- `express` - Framework web
- `cors` - Manejo de CORS
- `dotenv` - Variables de entorno

### Frontend
- `react` - Librería UI
- `vite` - Build tool

## 🔄 Próximos Pasos

1. **Base de Datos**: Integrar MongoDB/PostgreSQL
2. **Autenticación Real**: Implementar JWT con validación
3. **Manejo de Errores**: Sistema robusto de errores
4. **Logging**: Sistema de logs
5. **Testing**: Tests unitarios e integración
6. **Deployment**: Dockerizar y desplegar a producción

## 📚 Recursos

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Backend for Frontend Pattern](https://samnewman.io/patterns/architectural/bff/)

## 👥 Equipo

Sanos y Salvos - Plataforma de rescate de mascotas

---

**Arquitectura BFF implementada ✅**
