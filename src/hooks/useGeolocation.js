import { useState } from 'react';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Twoja przeglądarka nie wspiera geolokalizacji.");
      return;
    }
    setIsLoading(true);
    setError(null);
  
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLoading(false);
      },
      (err) => {
        console.log("Nieznany błąd lokalizacji.",err);
        setIsLoading(false);
      },
       {enableHighAccuracy: false, 
      timeout: 15000,            
      maximumAge: 10000 }   
    );
  };

  return { location, error, isLoading, getLocation };
};

export default useGeolocation;