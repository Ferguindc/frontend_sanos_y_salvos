import express from 'express';

const router = express.Router();

// Credenciales admin hardcodeadas (en producción usar base de datos)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin'
};

// Middleware para verificar token admin (simple simulación)
const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token === 'admin-token-123') {
    next();
  } else {
    res.status(401).json({ success: false, message: 'No autorizado' });
  }
};

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    res.json({
      success: true,
      token: 'admin-token-123',
      admin: {
        username,
        email: 'admin@sanosalysvos.com',
        name: 'Administrador'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Credenciales inválidas'
    });
  }
});

// GET /api/admin/dashboard - Estadísticas del dashboard
router.get('/dashboard', isAdmin, (req, res) => {
  res.json({
    success: true,
    data: {
      totalPending: 12,
      totalMissing: 45,
      totalFound: 23,
      totalRecovered: 18,
      thisMonth: {
        missing: 8,
        found: 5,
        recovered: 3
      },
      recentActivity: [
        {
          id: 1,
          type: 'missing',
          petName: 'Bruno',
          reporter: 'María González',
          date: '2026-05-12T10:30:00Z',
          status: 'pending'
        },
        {
          id: 2,
          type: 'found',
          petName: 'Luna',
          reporter: 'Juan Pérez',
          date: '2026-05-11T15:45:00Z',
          status: 'pending'
        }
      ]
    }
  });
});

// GET /api/admin/pets - Obtener todos los reportes
router.get('/pets', isAdmin, (req, res) => {
  const { status = 'all', type = 'all', search = '' } = req.query;

  // Datos simulados
  const allPets = [
    {
      id: 1,
      name: 'Bruno',
      type: 'Perro',
      breed: 'Golden Retriever',
      color: 'Dorado',
      reportType: 'missing',
      status: 'pending',
      reporter: 'María González',
      email: 'maria@ejemplo.com',
      phone: '+1-555-0001',
      description: 'Perro desaparecido en zona centro',
      image: 'https://images.unsplash.com/photo-1633722715463-d30628519d24?w=200&h=200&fit=crop',
      location: 'Zona Centro',
      reportDate: '2026-05-12T10:30:00Z',
      clinics: [
        { id: 1, name: 'Clínica Centro', foundAt: null }
      ]
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Gato',
      breed: 'Siames',
      color: 'Gris y blanco',
      reportType: 'found',
      status: 'pending',
      reporter: 'Juan Pérez',
      email: 'juan@ejemplo.com',
      phone: '+1-555-0002',
      description: 'Gato encontrado en barrio norte',
      image: 'https://images.unsplash.com/photo-1574158622682-e40ad41168d5?w=200&h=200&fit=crop',
      location: 'Barrio Norte',
      reportDate: '2026-05-11T15:45:00Z',
      clinics: []
    },
    {
      id: 3,
      name: 'Max',
      type: 'Perro',
      breed: 'Pastor Alemán',
      color: 'Marrón',
      reportType: 'missing',
      status: 'approved',
      reporter: 'Ana Rodríguez',
      email: 'ana@ejemplo.com',
      phone: '+1-555-0003',
      description: 'Perro desaparecido hace 3 días',
      image: 'https://images.unsplash.com/photo-1633722715463-d30628519d24?w=200&h=200&fit=crop',
      location: 'Zona Este',
      reportDate: '2026-05-10T08:00:00Z',
      clinics: [
        { id: 2, name: 'Clínica Norte', foundAt: '2026-05-12T14:20:00Z' }
      ]
    }
  ];

  let filtered = allPets;

  if (status !== 'all') {
    filtered = filtered.filter(pet => pet.status === status);
  }

  if (type !== 'all') {
    filtered = filtered.filter(pet => pet.reportType === type);
  }

  if (search) {
    filtered = filtered.filter(pet =>
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.reporter.toLowerCase().includes(search.toLowerCase())
    );
  }

  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
});

// GET /api/admin/pets/:id - Obtener detalle de reporte
router.get('/pets/:id', isAdmin, (req, res) => {
  const { id } = req.params;

  // Datos simulados
  const pet = {
    id,
    name: 'Bruno',
    type: 'Perro',
    breed: 'Golden Retriever',
    age: '3 años',
    color: 'Dorado',
    microchip: '123ABC456',
    vaccinated: true,
    reportType: 'missing',
    status: 'pending',
    reporter: {
      name: 'María González',
      email: 'maria@ejemplo.com',
      phone: '+1-555-0001',
      address: 'Calle Principal 123'
    },
    description: 'Perro desaparecido cuando se quedó la puerta abierta',
    image: 'https://images.unsplash.com/photo-1633722715463-d30628519d24?w=400&h=400&fit=crop',
    location: {
      area: 'Zona Centro',
      lat: 40.7128,
      lng: -74.0060
    },
    reportDate: '2026-05-12T10:30:00Z',
    clinics: [
      {
        id: 1,
        name: 'Clínica Veterinaria Centro',
        notified: true,
        response: 'Sin novedad'
      },
      {
        id: 2,
        name: 'Clínica Norte',
        notified: true,
        response: 'Sin novedad'
      }
    ],
    notes: 'Se han contactado clínicas locales',
    attachments: [
      { id: 1, name: 'documento.pdf', url: '/files/doc.pdf' }
    ]
  };

  res.json({
    success: true,
    data: pet
  });
});

// PUT /api/admin/pets/:id/approve
router.put('/pets/:id/approve', isAdmin, (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;

  // TODO: Actualizar en BD
  res.json({
    success: true,
    message: 'Reporte aprobado',
    petId: id,
    newStatus: 'approved',
    notes
  });
});

// PUT /api/admin/pets/:id/reject
router.put('/pets/:id/reject', isAdmin, (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  // TODO: Actualizar en BD
  res.json({
    success: true,
    message: 'Reporte rechazado',
    petId: id,
    newStatus: 'rejected',
    reason
  });
});

// PUT /api/admin/pets/:id/recover
router.put('/pets/:id/recover', isAdmin, (req, res) => {
  const { id } = req.params;
  const { clinicId, recoveryDate } = req.body;

  // TODO: Actualizar en BD
  res.json({
    success: true,
    message: 'Mascota marcada como recuperada',
    petId: id,
    newStatus: 'recovered',
    clinicId,
    recoveryDate
  });
});

// DELETE /api/admin/pets/:id - Eliminar reporte
router.delete('/pets/:id', isAdmin, (req, res) => {
  const { id } = req.params;

  // TODO: Eliminar de BD
  res.json({
    success: true,
    message: 'Reporte eliminado',
    petId: id
  });
});

// PUT /api/admin/pets/:id/notes
router.put('/pets/:id/notes', isAdmin, (req, res) => {
  const { id } = req.params;
  const { notes } = req.body;

  res.json({
    success: true,
    message: 'Notas actualizadas',
    petId: id,
    notes
  });
});

export default router;
