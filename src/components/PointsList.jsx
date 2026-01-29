const PointsList = ({ points, onItemClick }) => {
  if (!points || points.length === 0) {
    return <div>Brak wyników</div>;
  }

  return (
    <>
      {points.map(point => (
        <div 
          key={point.id} 
          className="mp-list-item" 
          onClick={() => onItemClick(point)}
        >
          <div className="mp-list-item__content">
            <h4 className="mp-list-item__title">{point.title}</h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default PointsList;