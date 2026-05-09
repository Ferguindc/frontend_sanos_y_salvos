import { useState } from 'react';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    rut: '',
    comuna: '',
    dirección: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:8000/api';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.correo || !formData.contraseña) {
      setError('Correo y contraseña son requeridos');
      return false;
    }
    if (!isLogin) {
      if (!formData.nombre || !formData.rut || !formData.comuna || !formData.dirección) {
        setError('Todos los campos son requeridos para registrarse');
        return false;
      }
      if (formData.correo.length < 5) {
        setError('Correo inválido');
        return false;
      }
      if (formData.contraseña.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const endpoint = isLogin ? '/login/' : '/register/';
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || (isLogin ? 'Error en login' : 'Error en registro'));
      }

      const data = await response.json();
      
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user || { nombre: formData.nombre }));
      }

      alert(isLogin ? '¡Bienvenido!' : '¡Registro completado!');
      onClose();
      setFormData({
        nombre: '',
        correo: '',
        contraseña: '',
        rut: '',
        comuna: '',
        dirección: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>✕</button>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
          >
            Iniciar Sesión
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
          >
            Registrarse
          </button>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}

          {!isLogin && (
            <>
              <div className="form-group">
                <label htmlFor="nombre">Nombre Completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Juan Pérez"
                  value={formData.nombre}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rut">RUT</label>
                  <input
                    type="text"
                    id="rut"
                    name="rut"
                    placeholder="12345678-9"
                    value={formData.rut}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="comuna">Comuna</label>
                  <input
                    type="text"
                    id="comuna"
                    name="comuna"
                    placeholder="Santiago"
                    value={formData.comuna}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dirección">Dirección</label>
                <input
                  type="text"
                  id="dirección"
                  name="dirección"
                  placeholder="Calle Principal 123, Apartamento 4"
                  value={formData.dirección}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>
            </>
          )}

          <div className="form-group">
            <label htmlFor="correo">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              placeholder="tu@correo.com"
              value={formData.correo}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contraseña">Contraseña</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              placeholder="••••••••"
              value={formData.contraseña}
              onChange={handleChange}
              disabled={loading}
              required
            />
          </div>

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
          </button>
        </form>

        <div className="auth-footer">
          <p>
            {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
            <button 
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="auth-toggle-btn"
            >
              {isLogin ? 'Regístrate aquí' : 'Inicia sesión aquí'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
