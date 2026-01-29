const SearchBar = ({categories, activeCategories, onToggleCategory, isFilterActive, onToggleFilter, radius, onRadiusChange,
  searchQuery, onSearchChange, resultCount, children}) => {
  return (
    <div className="mp-filter-panel">
      <div className="mp-filters-section">
        <h4>Warstwy</h4>
        <div className="mp-layer-group">
          {categories.map(cat => (
            <label key={cat.id} className="mp-layer-label">
              <input 
                type="checkbox" 
                checked={!!activeCategories[cat.id]} 
                onChange={() => onToggleCategory(cat.id)} 
              />
              {cat.label}
            </label>
          ))}
        </div>
        
        <hr className="mp-divider" />
        
        <label className="mp-layer-label">
          <input 
            type="checkbox" 
            checked={isFilterActive} 
            onChange={(e) => onToggleFilter(e.target.checked)} 
          />
          Zasięg: {radius} km
        </label>
        
        {isFilterActive && (
          <input 
            type="range" 
            min="1" 
            max="50" 
            value={radius} 
            onChange={(e) => onRadiusChange(Number(e.target.value))} 
            id="mp-range-input"
          />
        )}
        
        <input 
          autoComplete="on" 
          type="text" 
          placeholder="Szukaj..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          id="mp-search-input"
        />
        
        <div className="mp-results-count">Znaleziono: {resultCount}</div>
      </div>
      
      <div className="mp-sidebar-list">
        {children}
      </div>
    </div>
  );
};

export default SearchBar;