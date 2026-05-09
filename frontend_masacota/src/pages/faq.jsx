import React, { useState } from 'react';
import './faq.css';

export default function FAQ() {
  const faqs = [
    {
      id: 1,
      question: '¿Cuáles son tus horarios de atención?',
      answer: 'Estamos abiertos de lunes a domingo de 9:00 AM a 6:00 PM. En festivos especiales nos encontramos de 10:00 AM a 4:00 PM.'
    },
    {
      id: 2,
      question: '¿Qué servicios de cuidado ofrecen para mascotas?',
      answer: 'Ofrecemos alojamiento para perros, cuidado diurno, baño y aseo, adiestramiento básico, y servicio de adopción. Todos nuestros servicios incluyen cuidado profesional y amoroso.'
    },
    {
      id: 3,
      question: '¿Cómo puedo reservar el servicio de alojamiento?',
      answer: 'Puedes reservar llamando al +098987 876 767, enviando un email a info@website.com, o visitando cualquiera de nuestras sucursales. Te recomendamos hacerlo con anticipación, especialmente en épocas de vacaciones.'
    },
    {
      id: 4,
      question: '¿Qué documentos necesito para adoptar una mascota?',
      answer: 'Para adoptar necesitas presentar un documento de identidad vigente, comprobante de domicilio, y llenar un formulario de adopción. También realizamos una pequeña entrevista para asegurar que sea el hogar adecuado para tu mascota.'
    },
    {
      id: 5,
      question: '¿Cuáles son tus tarifas?',
      answer: 'Nuestras tarifas varían según el servicio. El alojamiento diario cuesta desde $30, el baño desde $20. Para consultar tarifas específicas, contáctanos directamente.'
    },
    {
      id: 6,
      question: '¿Puedo visitar a mi mascota mientras esté alojada?',
      answer: 'Sí, puedes visitarla cuando lo desees. Recomendamos llamar con anticipación para coordinar el horario que mejor te convenga.'
    },
    {
      id: 7,
      question: '¿Ofrecen servicio de emergencia 24/7?',
      answer: 'Sí, contamos con personal de emergencia disponible 24 horas para atender cualquier situación urgente con tu mascota.'
    },
    {
      id: 8,
      question: '¿Qué debo llevar cuando dejo mi perro en alojamiento?',
      answer: 'Te recomendamos traer alimento de tu mascota (o podemos proporcionar), medicinas si es necesario, juguetes favoritos, y mantas con su olor para que se sienta cómodo.'
    }
  ];

  const [expandedId, setExpandedId] = useState(null);

  const toggleFAQ = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="faq-section">
      <div className="faq-container">
        <h1 className="faq-title">Preguntas Frecuentes</h1>
        <p className="faq-subtitle">Encuentra respuestas a las preguntas más comunes sobre nuestros servicios</p>
        
        <div className="faq-list">
          {faqs.map(faq => (
            <div key={faq.id} className={`faq-item ${expandedId === faq.id ? 'active' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleFAQ(faq.id)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">+</span>
              </button>
              {expandedId === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="faq-contact">
          <h3>¿No encontraste lo que buscas?</h3>
          <p>Contáctanos directamente</p>
          <div className="contact-methods">
            <a href="tel:+098987876767" className="contact-btn">📞 +098987 876 767</a>
            <a href="mailto:info@website.com" className="contact-btn">📧 info@website.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
