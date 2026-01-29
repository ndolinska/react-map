import { use } from 'react';
import { DataContext } from '../context/DataContext';
import './Pages.scss';

const FavoritesPage = () => {
  const { favorites, toggleFavorite } = use(DataContext);
  return (
    <div className="favorites-page">
      <h2 className="page-title">
        Tryb Offline: Zapisane Miejsca
      </h2>

      {favorites.length === 0 ? (
        <p className="empty-state">
          Brak zapisanych miejsc.
        </p>
      ) : (
        <div className="favorites-grid">
          {favorites.map((point) => (
            <div key={point.id} className="favorite-card">
              <div className="card-content">
                <h3 className="card-title">{point.title}</h3>
                <div className="card-desc">
                  {point.desc}
                  <p>
                    {point.lat.toFixed(3)}, {point.lng.toFixed(3)}
                  </p>
                </div>
              </div>
              <div className="card-footer">
                <span className="card-badge">
                  {point.type}
                </span>
                <button 
                  onClick={() => toggleFavorite(point)}
                  className="btn-remove">
                  Usuń
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;