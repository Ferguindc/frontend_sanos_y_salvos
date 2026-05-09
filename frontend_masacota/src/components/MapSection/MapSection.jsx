import { useState, useEffect } from 'react';
import './MapSection.css';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';

export default function MapSection({ setShowMap }) {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const MAPBOX_TOKEN = import.meta.env.VITE_maptoken;

  const API_BASE_URL = 'http://localhost:8000/api'; // Cambiar según tu backend Django

  useEffect(() => {
    // Cargar ubicaciones del backend
    const fetchLocations = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/ubicaciones/`);
        if (!response.ok) throw new Error('Failed to fetch locations');
        const data = await response.json();
        setLocations(data.results);
        if (data.results.length > 0) {
          setSelectedLocation(data.results[0]);
        }
      } catch (error) {
        console.error('Error fetching locations:', error);
        // Datos de ejemplo si no hay backend disponible
        setLocations([
          {
            id: 1,
            name: 'Main Branch',
            address: '123 Pet Street, City',
            phone: '+098987 876 767',
            email: 'info@website.com',
            lat: 40.7128,
            lng: -74.0060
          },
          {
            id: 2,
            name: 'Downtown Branch',
            address: '456 Animal Ave, City',
            phone: '+098987 876 768',
            email: 'downtown@website.com',
            lat: 40.7505,
            lng: -73.9972
          }
        ]);
        setSelectedLocation({
          id: 1,
          name: 'Main Branch',
          address: '123 Pet Street, City',
          phone: '+098987 876 767',
          email: 'info@website.com',
          lat: 40.7128,
          lng: -74.0060
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  return (
    <section className="map-section">
      <button className="close-btn" onClick={() => setShowMap(false)}>✕</button>
      
      <div className="map-container">
        <div className="map-header">
          <h2>Encuentra a tu mascota</h2>
        </div>

        {loading ? (
          <div className="loading">Loading locations...</div>
        ) : (
          <div className="map-content">
            <div className="map-sidebar">
              <h3>mascotas perdidas</h3>
              <div className="locations-list">
                {locations.map(location => (
                  <div
                    key={location.id}
                    className={`location-item ${selectedLocation?.id === location.id ? 'active' : ''}`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    <div className="location-icon">📍</div>
                    <div className="location-info">
                      <h4>{location.titulo}</h4>
                      <p>{location.descripcion}</p>
                      <p className="location-phone">{location.phone}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            


            <div className="map-display">
    
                <MapContainer center={[selectedLocation.latitud, selectedLocation.longitud]} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer
                
                        url= {`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`}
                        id="mapbox/streets-v11"
                        tileSize={512}
                        zoomOffset={-1}
            
                    />
                    <Marker position={[selectedLocation.latitud, selectedLocation.longitud]} />
                </MapContainer>
            
    
              

            </div>
          </div>
        )}
      </div>
    </section>
  );
}
