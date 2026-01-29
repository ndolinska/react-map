import { createContext, useState, useEffect } from 'react';
import { START_DATA, REVIEW_DATA } from '../utils/Consts.js'

export const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const [points, setPoints] = useState(() => {
    try {
      const stored = localStorage.getItem('geoApp_points');
      return stored ? JSON.parse(stored): START_DATA;
    } catch (error) {
      console.error("Nie udało się wczytać punktów:", error);
      return START_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem('geoApp_points', JSON.stringify(points));
  }, [points]);


  const [reviews, setReviews] = useState(() => {
    try {
      const stored = localStorage.getItem('geoApp_reviews');
      return stored ? JSON.parse(stored) : REVIEW_DATA;
    } catch (error) {
      console.error("Błąd odczytu opinii:", error);
      return REVIEW_DATA;
    }
  });

  useEffect(() => {
    localStorage.setItem('geoApp_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const [favorites, setFavorites] = useState(() => {
  try {
    const storedFavs = localStorage.getItem('myFavorites');
    return storedFavs ? JSON.parse(storedFavs) : [];
  } catch (error) {
    console.error("Błąd odczytu ulubionych z localStorage", error);
    return [];
  }});

  useEffect(() => {
  localStorage.setItem('myFavorites', JSON.stringify(favorites));
}, [favorites]);
  
  const addPoint = (newPoint) => setPoints(prev => [...prev, newPoint]);

  const updatePoint = (id, updatedData) => {
      setPoints(prevPoints => 
        prevPoints.map(point => 
          point.id === id ? { ...point, ...updatedData } : point)
        );
      setFavorites(prevFavs => 
        prevFavs.map(fav => 
          fav.id === id ? { ...fav, ...updatedData } : fav)
        );
    };
  
  const deletePoint = (id) => {
    setPoints(prev => prev.filter(p => p.id !== id));
    setReviews(prev => prev.filter(r => r.pointId !== id)); 
    setFavorites(prev => prev.filter(f => f.id !== id));
  };

  const addReview = (newReview) => {
    setReviews(prev => [newReview, ...prev]);
  };

  const deleteReview = (reviewId) => {
    setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId));
};

  const getReviewsForPoint = (pointId) => {
    return reviews.filter(r => r.pointId === pointId);
  };

  const getAverageRating = (pointId) => {
    const pointReviews = getReviewsForPoint(pointId);
    if (pointReviews.length === 0) return 0;
    const sum = pointReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / pointReviews.length).toFixed(1);
  };

  const toggleFavorite = (point) => {
    setFavorites(prevFavs => {
        const exists = prevFavs.find(fav => fav.id === point.id);
        if (exists) {
            return prevFavs.filter(fav => fav.id !== point.id);
        } else {
            return [...prevFavs, point];
        }
    });
  };
  const isFavorite = (pointId) => {
    return favorites.some(fav => fav.id === pointId);
  };

  return (
    <DataContext value={{ 
      points, addPoint, updatePoint, deletePoint, 
      reviews, addReview, deleteReview, getReviewsForPoint, getAverageRating,
      favorites, toggleFavorite, isFavorite
    }}>
      {children}
    </DataContext>
  );
};

