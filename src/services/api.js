// src/services/api.js
const GEO_SERVICE_URL = import.meta.env.VITE_GEO_SERVICE_URL || 'http://localhost:8001/api';
const USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_URL || 'http://127.0.0.1:8002';
const AUTH_SERVICE_URL = import.meta.env.VITE_AUTH_SERVICE_URL || 'http://127.0.0.1:8003';

export const geoServiceClient = {
  async getNearbySpontaneous(latitude, longitude, radiusKm = 10, reportType = 'ambos') {
    const response = await fetch(`${GEO_SERVICE_URL}/ubicaciones/buscar_cercanos/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitud: latitude,
        longitud: longitude,
        radio_km: radiusKm,
        tipo_reporte: reportType,
      }),
    });

    if (!response.ok) throw new Error('Error en búsqueda de proximidad');
    return response.json();
  },

  async getLocations(filters = {}) {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${GEO_SERVICE_URL}/ubicaciones/?${params}`);
    if (!response.ok) throw new Error('Error al obtener ubicaciones');
    return response.json();
  },

  async createLocation(locationData) {
    // Generar IDs únicos para reporte_id y pet_id
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(7);
    const reporte_id = `rep_${timestamp}_${random}`;
    const pet_id = `pet_${timestamp}_${random}`;

    const payload = {
      reporte_id: reporte_id,
      pet_id: pet_id,
      latitud: parseFloat(locationData.latitud),
      longitud: parseFloat(locationData.longitud),
      tipo_reporte: locationData.tipo_reporte,
      tipo_animal: locationData.tipo_animal,
      raza_probable: locationData.raza_probable || '',
      color: locationData.color || '',
      tamaño: locationData.tamaño || '',
      titulo: locationData.titulo,
      descripcion: locationData.descripcion,
      fecha_reporte: locationData.fecha_reporte,
    };

    console.log('Enviando a GEO_SERVICE:', payload);

    const response = await fetch(`${GEO_SERVICE_URL}/ubicaciones/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      let errorMsg = `Error ${response.status}`;
      try {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Error del servidor:', errorData);
          errorMsg += `: ${JSON.stringify(errorData)}`;
        } else {
          const text = await response.text();
          console.error('Error del servidor (text):', text);
          errorMsg += `: ${text.substring(0, 200)}`;
        }
      } catch (e) {
        console.error('No se pudo parsear respuesta:', e);
      }
      throw new Error(errorMsg);
    }

    const result = await response.json();
    console.log('Ubicación creada:', result);
    return result;
  },

  async getLocation(id) {
    const response = await fetch(`${GEO_SERVICE_URL}/ubicaciones/${id}/`);
    if (!response.ok) throw new Error('Ubicación no encontrada');
    return response.json();
  },
};

export const userServiceClient = {
  async login(email, password) {
    const response = await fetch(`${AUTH_SERVICE_URL}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Error en login');
    return response.json();
  },

  async register(userData) {
    const response = await fetch(`${USER_SERVICE_URL}/users/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Error en registro');
    return response.json();
  },
};
