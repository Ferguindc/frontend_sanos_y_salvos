# 🏗️ Arquitectura BFF - Diagrama

## Flujo de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React/Vite)                   │
│                    http://localhost:5173                         │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Header     │  │   Hero       │  │ Services     │          │
│  │  Component   │  │ Component    │  │ Component    │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
│         └─────────────────┼──────────────────┘                   │
│                           │                                       │
│  ┌───────────────────────────────────────────┐                  │
│  │       src/api/client.js (API Client)      │                  │
│  │  - authAPI                                 │                  │
│  │  - petsAPI                                 │                  │
│  │  - clinicsAPI                              │                  │
│  └───────────────────────────────────────────┘                  │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                    HTTP Requests/Responses
                    (JSON over REST)
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│              BACKEND BFF (Express.js)                            │
│           http://localhost:5000/api                              │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                  server.js (Main)                          │ │
│  │  - CORS Middleware                                         │ │
│  │  - JSON Parser                                             │ │
│  │  - Route Registration                                      │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │  routes/     │  │  routes/     │  │  routes/     │          │
│  │  auth.js     │  │  pets.js     │  │  clinics.js  │          │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘          │
│         │                 │                  │                   │
│    /api/auth         /api/pets         /api/clinics            │
│    - login           - missing          - list                  │
│    - register        - report           - detail                │
│    - logout          - getById          - register              │
│    - profile         - update                                    │
│         │                 │                  │                   │
└────────────────────────────────────────────────────────────────┘
         │                 │                  │
         └─────────────────┼──────────────────┘
                           │
                    (En desarrollo)
                           │
         ┌─────────────────┼──────────────────┐
         │                 │                  │
         ▼                 ▼                  ▼
    ┌─────────┐      ┌──────────┐      ┌──────────┐
    │ Database │      │ Auth     │      │ External │
    │(MongoDB/ │      │Service   │      │ APIs     │
    │ PostgreSQL)    │          │      │          │
    └─────────┘      └──────────┘      └──────────┘
```

## Componentes del Sistema

### Frontend (React/Vite)
```
src/
├── components/
│   ├── Hero/
│   ├── Services/
│   ├── Header/
│   └── ...
├── pages/
│   ├── inicio.jsx
│   └── ...
├── api/
│   └── client.js ──→ Comunica con BFF
└── hooks/
```

### Backend BFF (Express)
```
backend/
├── routes/
│   ├── auth.js ──────┐
│   ├── pets.js       ├──→ Lógica de negocios
│   └── clinics.js ───┘
├── server.js ────────→ Punto de entrada
├── package.json
└── .env
```

## Flujo de una Solicitud Completa

### Ejemplo: Obtener mascotas perdidas

```
1. Usuario hace clic en "Buscar Mascotas"
   │
2. React Component:
   └─→ useEffect(() => {
         petsAPI.getMissing()
       })
   │
3. src/api/client.js:
   └─→ fetch('http://localhost:5000/api/pets/missing')
   │
4. Express BFF recibe GET /api/pets/missing
   │
5. routes/pets.js:
   └─→ app.get('/missing', (req, res) => {
         // Fetch de BD o servicio externo
         res.json({ success: true, data: [...] })
       })
   │
6. Respuesta HTTP 200:
   └─→ { success: true, data: [...mascotas...] }
   │
7. client.js retorna respuesta a componente
   │
8. Componente actualiza estado
   │
9. React re-renderiza con datos nuevos
```

## Beneficios del Patrón BFF

```
┌──────────────────────────────────────────────────────────┐
│                                                            │
│  ✅ SEPARACIÓN DE RESPONSABILIDADES                      │
│     Frontend → Presentación                               │
│     BFF → Lógica de negocio y coordinación                │
│                                                            │
│  ✅ ESCALABILIDAD                                         │
│     Frontend y Backend escalan independientemente         │
│                                                            │
│  ✅ MANTENIBILIDAD                                        │
│     Código más organizado y reutilizable                  │
│                                                            │
│  ✅ SEGURIDAD                                             │
│     Backend actúa como intermediario                      │
│     Control de CORS y validación de datos                 │
│                                                            │
│  ✅ FLEXIBILIDAD                                          │
│     Frontend puede consumir múltiples backends            │
│     BFF puede servir múltiples clientes                   │
│                                                            │
│  ✅ TESTING                                               │
│     Pruebas independientes de cada capa                   │
│     Mock fácil de APIs externas                           │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

## Stack Tecnológico

```
┌─────────────────────┐
│   Frontend (React)  │
├─────────────────────┤
│ • Vite              │
│ • ESM Modules       │
│ • Hot Reload        │
└─────────────────────┘
          ↓
┌─────────────────────┐
│   API Client        │
├─────────────────────┤
│ • Fetch API         │
│ • JWT Handling      │
│ • Error Handling    │
└─────────────────────┘
          ↓
┌─────────────────────┐
│   BFF (Express)     │
├─────────────────────┤
│ • Node.js           │
│ • Express 4.x       │
│ • CORS              │
│ • JSON Parsing      │
└─────────────────────┘
          ↓
┌─────────────────────┐
│  Servicios Externos │
├─────────────────────┤
│ • Bases de datos    │
│ • APIs de terceros  │
│ • Servicios en nube │
└─────────────────────┘
```

## Integración con Componentes React

```jsx
// MyComponent.jsx
import { petsAPI } from '../api/client.js';

export function MyComponent() {
  // El componente solo se preocupa por:
  // - Mostrar datos
  // - Manejo de estado
  // - Interacciones de usuario
  
  useEffect(() => {
    petsAPI.getMissing()  // ←─ Delegado al BFF
      .then(response => setPets(response.data))
      .catch(error => setError(error));
  }, []);
  
  return (
    // Render con datos del BFF
  );
}
```

---

**Arquitectura BFF completamente implementada** ✅
