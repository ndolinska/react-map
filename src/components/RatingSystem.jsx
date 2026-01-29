import { useState } from 'react';

const RatingSystem = ({ rating, setRating, readOnly = false }) => {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: 'flex' }}>
      {[...Array(5)].map((star, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            {!readOnly && (
              <input
                autoComplete="off" 
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                style={{ display: 'none' }}
              />
            )}
            <span
              onMouseEnter={() => !readOnly && setHover(ratingValue)}
              onMouseLeave={() => !readOnly && setHover(0)}
              style={{
                fontSize: '1.2rem',
                color: ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                transition: 'color 0.2s'
              }}
            >
              ★
            </span>
          </label>
        );
      })}
    </div>
  );
};

export default RatingSystem;