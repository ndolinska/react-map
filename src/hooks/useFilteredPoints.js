import { useState, useMemo } from 'react';
import { calculateDistance } from '../utils/mathHelper.js';
import { CATEGORIES } from '../utils/Consts.js'

export const useFilteredPoints = (allPoints, mapState) => {

  const [radius, setRadius] = useState(20);
  const [isFilterActive, setIsFilterActive] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategories, setActiveCategories] = useState(
    CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat.id]: true }), {})
  );
  const toggleCategory = (catId) => {
    setActiveCategories(prev => ({ ...prev, [catId]: !prev[catId] }));
  };

  const visiblePoints = useMemo(() => {
    if (!allPoints) return [];

    const lowerQuery = searchQuery.toLowerCase();

    return allPoints.filter((point) => {
      const isCategoryVisible = activeCategories[point.type] !== false;
      const matchesSearch = point.title.toLowerCase().includes(lowerQuery);
      
      let isWithinRange = true;
      if (isFilterActive) {
        const dist = calculateDistance(mapState.lat, mapState.lng, point.lat, point.lng);
        isWithinRange = dist <= radius;
      }
      
      return isCategoryVisible && matchesSearch && isWithinRange;
    });
  }, [allPoints, radius, mapState, isFilterActive, activeCategories, searchQuery]);

  return {
    visiblePoints,          
    radius,
    isFilterActive,
    searchQuery,
    activeCategories,
    CATEGORIES,          
    setRadius,
    setIsFilterActive,
    setSearchQuery,
    toggleCategory
  };
};

export default useFilteredPoints;