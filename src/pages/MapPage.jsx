import { useState, useEffect, use, useCallback } from 'react';
import MapWrapper from '../components/MapWrapper';
import PointsList from '../components/PointsList';
import SearchBar from '../components/SearchBar';
import AddPointForm from '../components/AddPointForm';

import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';
import useGeolocation from '../hooks/useGeolocation';
import useFilteredPoints from '../hooks/useFilteredPoints';

import { calculateDistance } from '../utils/mathHelper';

import './MapPage.scss';

const MapPage = () => {
 const { points, addPoint, updatePoint, deletePoint } = use(DataContext);
  const { user, addReputation } = use(AuthContext);
  
  // Stan Mapy 
  const [mapState, setMapState] = useState({ lat: 52.229, lng: 21.011, zoom: 12 });
  // Jeżeli geolokalizacja włączona to ustaw userLocation za pomocą hooka useGeo
  const { location: userLocation, getLocation, isLoading: isLocating } = useGeolocation();
  // Filtrujemy punkty z użyciem custom hooka
  const filtered = useFilteredPoints(points, mapState);

  // Stan UI (formularze, trasy)
  const [activeRoute, setActiveRoute] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPoint, setEditingPoint] = useState(null);
  const [tempCoords, setTempCoords] = useState(null);


  useEffect(() => {
    if (userLocation) {
      setMapState({ lat: userLocation.lat, lng: userLocation.lng, zoom: 15 });
    }
  }, [userLocation]);
  const handleClearRoute = useCallback(() => {
    setActiveRoute(null);
  }, []);

  const handleMapMove = useCallback((center, zoom) => {
    setMapState({ ...center, zoom });
  }, []);

  const handleNavigateTo = useCallback((targetPoint) => {
    if (!userLocation) {
      alert("Najpierw kliknij 'Znajdź mnie'!"); return;
    }
    const dist = calculateDistance(userLocation.lat, userLocation.lng, targetPoint.lat, targetPoint.lng);
    setActiveRoute({
      from: [userLocation.lat, userLocation.lng],
      to: [targetPoint.lat, targetPoint.lng],
      distance: dist.toFixed(2)
    });
  },[userLocation]);

  const handleMapClick = useCallback((latlng) => {
    if (!user) { alert("Zaloguj się, aby dodawać punkty!"); return; }
    setTempCoords(latlng);
    setIsFormOpen(true);
  },[user]);

  // Obsługa formsa punktu
  const handleSavePoint = (data) => {
    if (editingPoint) {
      updatePoint(editingPoint.id, data);
      alert("Zaktualizowano punkt!");
      setEditingPoint(null);
    }else{
    if (!tempCoords) return;
    addPoint({ ...data, ...tempCoords, id: Date.now(), author: user?.name});
    addReputation(10);
    alert("Dziękujemy za dodanie punktu! +10 pkt");
    setTempCoords(null);}
    setIsFormOpen(false);
  };

  const closeForm = useCallback(() => {
     setTempCoords(null);
     setEditingPoint(null);
     setIsFormOpen(false); 
  },[])
  const handleEditStart = useCallback((point) => {
    setEditingPoint(point); 
    setIsFormOpen(true);  
  },[]);

  const handleDeletePoint = useCallback((e, pointId) => {
    e.stopPropagation()
    deletePoint(pointId);
    if (editingPoint && editingPoint.id === pointId) closeForm();
  }, [deletePoint, editingPoint, closeForm]);

  const handleListItemClick = (point) => {
    setMapState({ lat: point.lat, lng: point.lng, zoom: 16 });
  };

  return (
    <div className="mp-container">
      <div className="mp-toolbar">
        <button onClick={getLocation} disabled={isLocating} className="mp-btn">
          {isLocating ? 'Szukam...' : 'Znajdź mnie!'}
        </button>
      </div>
     <SearchBar
      categories={filtered.CATEGORIES}
        activeCategories={filtered.activeCategories}
        onToggleCategory={filtered.toggleCategory}
        isFilterActive={filtered.isFilterActive}
        onToggleFilter={filtered.setIsFilterActive}
        radius={filtered.radius}
        onRadiusChange={filtered.setRadius}
        searchQuery={filtered.searchQuery}
        onSearchChange={filtered.setSearchQuery}
        resultCount={filtered.visiblePoints.length}>
      <PointsList 
        points={filtered.visiblePoints} 
        onItemClick={handleListItemClick} 
      />
    </SearchBar>
      <MapWrapper 
        center={[mapState.lat, mapState.lng]} 
        zoom={mapState.zoom} 
        points={filtered.visiblePoints} 
        onMapMove={handleMapMove}
        onMapClick={handleMapClick}
        tempMarkerPosition={tempCoords}
        filterRadius={filtered.isFilterActive? filtered.radius : null}
        userPosition={userLocation}
        activeRoute={activeRoute}
        onNavigate={handleNavigateTo}
        onClearRoute={handleClearRoute}
        onEdit={handleEditStart}
        onDelete={handleDeletePoint}
      />
      {isFormOpen && (
        <AddPointForm coords={editingPoint ? { lat: editingPoint.lat, lng: editingPoint.lng } : tempCoords} 
        initialData={editingPoint}
        onSave={handleSavePoint} 
        onCancel={closeForm} />
      )}
    </div>
  );
};

export default MapPage;