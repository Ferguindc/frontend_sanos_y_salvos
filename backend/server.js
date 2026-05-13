import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import petsRoutes from './routes/pets.js';
import clinicsRoutes from './routes/clinics.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BFF está funcionando correctamente' });
});

// Rutas modulares
app.use('/api/auth', authRoutes);
app.use('/api/pets', petsRoutes);
app.use('/api/clinics', clinicsRoutes);
app.use('/api/admin', adminRoutes);

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 BFF ejecutándose en http://localhost:${PORT}`);
  console.log(`📡 Disponible para el frontend en http://localhost:${PORT}/api`);
  console.log(`✅ Rutas disponibles:`);
  console.log(`   - POST   /api/auth/login`);
  console.log(`   - POST   /api/auth/register`);
  console.log(`   - POST   /api/auth/logout`);
  console.log(`   - GET    /api/auth/profile`);
  console.log(`   - GET    /api/pets/missing`);
  console.log(`   - POST   /api/pets/report`);
  console.log(`   - GET    /api/pets/:id`);
  console.log(`   - PUT    /api/pets/:id`);
  console.log(`   - GET    /api/clinics`);
  console.log(`   - GET    /api/clinics/:id`);
  console.log(`   - POST   /api/clinics/:id/register-pet`);
});
