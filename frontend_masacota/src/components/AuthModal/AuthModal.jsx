import { useState } from 'react';
import './AuthModal.css';

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    contraseña: '',
    contraseña_confirmar: '',
    rut: '',
    comuna: '',
    dirección: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:8000/api';

  // Validar RUT chileno
  const validateRUT = (rut) => {
    if (!rut) return false;
    // Solo números (sin guión ni puntos)
    const rutLimpio = rut.replace(/[^0-9]/g, '');
    if (rutLimpio.length < 7 || rutLimpio.length > 8) {
      return false;
    }
    return true;
  };

  // Formatear RUT chileno
  const formatRUT = (rut) => {
    const rutLimpio = rut.replace(/[^0-9]/g, '');
    if (rutLimpio.length > 8) return rut;
    
    if (rutLimpio.length <= 1) {
      return rutLimpio;
    }
    
    let rutFormato = '';
    for (let i = 0; i < rutLimpio.length - 1; i++) {
      rutFormato += rutLimpio[i];
      if ((rutLimpio.length - i - 1) % 3 === 0 && i !== rutLimpio.length - 2) {
        rutFormato += '.';
      }
    }
    rutFormato += '-' + rutLimpio[rutLimpio.length - 1];
    return rutFormato;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validar RUT: solo números y formatear automáticamente
    if (name === 'rut') {
      const rutLimpio = value.replace(/[^0-9]/g, '');
      if (rutLimpio.length <= 8) {
        setFormData(prev => ({
          ...prev,
          [name]: formatRUT(rutLimpio)
        }));
      }
      return;
    }

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
      if (!validateRUT(formData.rut)) {
        setError('RUT inválido. Use formato: XX.XXX.XXX-X');
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
      if (formData.contraseña !== formData.contraseña_confirmar) {
        setError('Las contraseñas no coinciden');
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
        contraseña_confirmar: '',
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
                  <label htmlFor="rut">RUT (Sin puntos ni guión)</label>
                  <input
                    type="text"
                    id="rut"
                    name="rut"
                    placeholder="12345678"
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

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="contraseña_confirmar">Confirmar Contraseña</label>
              <input
                type="password"
                id="contraseña_confirmar"
                name="contraseña_confirmar"
                placeholder="••••••••"
                value={formData.contraseña_confirmar}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
          )}

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
