import { useState } from 'react';
import './Header.css';
import AuthModal from '../AuthModal/AuthModal';

export default function Header({ onNavigate, currentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleNavClick = (page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-contact">
          <span>✉️ info@website.com</span>
          <span>📞 +098987 876 767</span>
        </div>
        <div className="header-social">
          <a href="#" className="social-link" title="Facebook">f</a>
          <a href="#" className="social-link" title="Twitter">𝕏</a>
          <a href="#" className="social-link" title="LinkedIn">in</a>
          <a href="#" className="social-link" title="Instagram">📷</a>
        </div>
      </div>

      <nav className="navbar">
        <div className="navbar-container">
          <div className="logo" onClick={() => handleNavClick('home')}>
            <span className="logo-icon">🐾</span>
            <div className="logo-text">
              <h1>CarePress</h1>
              <p>Pet Care Website</p>
            </div>
          </div>

          <button 
            className="menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>

          <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <li>
              <a 
                href="#home" 
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
                className={currentPage === 'home' ? 'active' : ''}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#services" 
                onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
                className={currentPage === 'services' ? 'active' : ''}
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#map" 
                onClick={(e) => { e.preventDefault(); handleNavClick('map'); }}
                className={currentPage === 'map' ? 'active' : ''}
              >
                Mapa
              </a>
            </li>
            <li>
              <a 
                href="#faq" 
                onClick={(e) => { e.preventDefault(); handleNavClick('faq'); }}
                className={currentPage === 'faq' ? 'active' : ''}
              >
                FAQ
              </a>
            </li>
            <li>
              <a 
                href="#veterinarias" 
                onClick={(e) => { e.preventDefault(); handleNavClick('veterinarias'); }}
                className={currentPage === 'veterinarias' ? 'active' : ''}
              >
                Veterinarias
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
                className={currentPage === 'contact' ? 'active' : ''}
              >
                Contact
              </a>
            </li>
          </ul>

          <button 
            className="auth-btn"
            onClick={() => setIsAuthModalOpen(true)}
            title="Iniciar Sesión"
          >
            🔐 Iniciar Sesión
          </button>
          <button className="get-appointment-btn">Get Appointment</button>
        </div>
      </nav>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
}
