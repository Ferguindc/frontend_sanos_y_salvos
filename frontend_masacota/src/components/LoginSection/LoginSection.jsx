import { useState } from 'react';
import './LoginSection.css';

export default function LoginSection({ setShowLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_BASE_URL = 'http://localhost:8000/api'; // Cambiar según tu backend Django

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Guardar token si viene en la respuesta
      if (data.token) {
        localStorage.setItem('authToken', data.token);
      }

      alert('Login successful!');
      setShowLogin(false);
    } catch (err) {
      setError(err.message || 'Error during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-section">
      <button className="close-btn" onClick={() => setShowLogin(false)}>✕</button>
      
      <div className="login-container">
        <div className="login-box">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="login-btn"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-links">
            <a href="#forgot">Forgot password?</a>
            <span>•</span>
            <a href="#register">Create account</a>
          </div>
        </div>

        <div className="login-image">
          <div className="image-placeholder">🔐</div>
          <h3>Secure Login</h3>
          <p>Your information is secure with us</p>
        </div>
      </div>
    </section>
  );
}
