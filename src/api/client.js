// Cliente API centralizado para consumir el BFF
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Headers por defecto
const getHeaders = () => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Función auxiliar para hacer requests
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: getHeaders(),
      ...options
    });
    
    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ==================== AUTENTICACIÓN ====================
export const authAPI = {
  login: (email, password) => 
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),
  
  register: (email, password, name) => 
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name })
    }),
  
  logout: () => 
    apiCall('/auth/logout', { method: 'POST' }),
  
  getProfile: () => 
    apiCall('/auth/profile')
};

// ==================== MASCOTAS ====================
export const petsAPI = {
  getMissing: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/pets/missing?${params}`);
  },
  
  getPetById: (id) => 
    apiCall(`/pets/${id}`),
  
  reportPet: (petData) => 
    apiCall('/pets/report', {
      method: 'POST',
      body: JSON.stringify(petData)
    }),
  
  updatePet: (id, updates) => 
    apiCall(`/pets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates)
    })
};

// ==================== CLÍNICAS ====================
export const clinicsAPI = {
  getClinics: (filters = {}) => {
    const params = new URLSearchParams(filters);
    return apiCall(`/clinics?${params}`);
  },
  
  getClinicById: (id) => 
    apiCall(`/clinics/${id}`),
  
  registerPetAtClinic: (clinicId, petData) => 
    apiCall(`/clinics/${clinicId}/register-pet`, {
      method: 'POST',
      body: JSON.stringify(petData)
    })
};

// ==================== SALUD ====================
export const healthAPI = {
  check: () => 
    apiCall('/health')
};

export default {
  authAPI,
  petsAPI,
  clinicsAPI,
  healthAPI
};
