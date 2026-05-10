import './Hero.css';

export default function Hero({ setShowLogin, setShowMap }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-subtitle">// Enjoy Your Holiday //</p>
          <h1 className="hero-title">We Keep Them<br />Happy Anytime.</h1>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => setShowLogin(false)}>
              Make Appointment
            </button>
            <button className="btn-phone">
              987-876-876-87
            </button>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="dog-image">
            🐕
          </div>
        </div>
      </div>

      <div className="hero-navigation">
        <button className="nav-arrow prev">&lt;</button>
        <button className="nav-arrow next">&gt;</button>
      </div>
    </section>
  );
}
