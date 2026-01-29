import { useEffect, use, memo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, Circle, CircleMarker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PointReviews from './PointReviews'; 
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import './MapWrapper.scss';

const ClickHandler = ({ onMapClick }) => {
  useMapEvents({ click: (e) => onMapClick(e.latlng) });
  return null;
};

const MapController = ({ center, zoom, onMapMove }) => {
  const map = useMap();
  useEffect(() => { map.flyTo(center, zoom); }, [center, zoom, map]);
  useMapEvents({ moveend: () => onMapMove(map.getCenter(), map.getZoom()), dragstart: () => {map.closePopup()}});
  return null;
};

const MapWrapper = ({ points, center, zoom, onMapMove, onMapClick, filterRadius, userPosition, activeRoute, onClearRoute, onNavigate, onEdit, onDelete }) => {
  const { toggleFavorite, isFavorite, getAverageRating } = use(DataContext);
  const { user } = use(AuthContext);
  return (
    <div className="map-wrapper">
      {activeRoute && (
        <div className="route-overlay-panel">
          <div className="route-details">
            <span className="route-label">Cel podróży</span>
            <span className="route-dist">{activeRoute.distance} km</span>
          </div>
          <button onClick={onClearRoute} className="btn del">
            Zakończ
          </button>
        </div>
      )}
      <MapContainer 
        center={center} 
        zoom={zoom} 
        className="leaflet-container-custom"
        scrollWheelZoom={true} >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
        <MapController center={center} zoom={zoom} onMapMove={onMapMove} />
        {onMapClick && <ClickHandler onMapClick={onMapClick} />}
        {filterRadius && (
          <Circle 
            center={center} 
            radius={filterRadius * 1000} 
            pathOptions={{fillOpacity: 0.1, weight: 1 }}
          />
        )}
        {activeRoute && (
          <Polyline 
            positions={[activeRoute.from, activeRoute.to]} 
            pathOptions={{ color: 'blue', weight: 4, dashArray: '10, 10' }}
          >
          </Polyline>
        )}
        {userPosition && (
          <CircleMarker 
            center={[userPosition.lat, userPosition.lng]} 
            radius={8} 
            pathOptions={{ color: 'white',fillOpacity: 1, weight: 2 }}>
            <Popup className="custom-popup">Tu jesteś!</Popup>
          </CircleMarker>
        )}
        {points.map((point) => {
          const avgRating = getAverageRating(point.id);
          const allowDelete = user?.name === point.author || user?.name === 'admin';
          return (
            <Marker key={point.id} position={[point.lat, point.lng]}>
              <Popup  autoPan={false} className="custom-popup">
                <div className="popup-content">
                  <div className="popup-header">
                    <strong className="point-title">{point.title}</strong>
                    <button className="like-btn" onClick={(e) => {e.stopPropagation();toggleFavorite(point)}}
                    title={isFavorite(point.id) ? "Usuń z Ulubionych" : "Zapisz Offline"}>
                      {isFavorite(point.id) ? '❤️' : '🤍'}
                    </button>
                    <div className="rating-badge">
                      ★ {avgRating > 0 ? avgRating : '-'}
                    </div>
                  </div>
                  <small className="point-type">{point.type}</small>
                  <small>{point.lat.toFixed(3)} {point.lng.toFixed(3)} </small>
                  <p className="point-description">{point.desc}</p>
                  {point.image && (
                    <img src={point.image} alt={point.title} className="point-image"/>
                  )}
                  <button onClick={() => onNavigate(point)} className='btn nav'>
                      Wyznacz trasę
                  </button>
                  {allowDelete && (
                    <>
                    <button onClick={() =>onEdit(point)} className='btn edit'>
                      Edytuj
                    </button>
                    <button onClick={(e) => {onDelete(e, point.id)}} className='btn del'>
                      Usuń
                    </button>
                    </>
                  )}
                  <div className="reviews-section">
                    <PointReviews pointId={point.id} />
                  </div>
                  <small>Dodane przez: {point.author}</small>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default memo(MapWrapper);