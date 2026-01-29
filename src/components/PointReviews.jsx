import { useState, use } from 'react';
import { DataContext } from '../context/DataContext';
import { AuthContext } from '../context/AuthContext';

import StarRating from './RatingSystem';
import './PointReviews.scss';

const PointReviews = ({ pointId }) => {
  const { getReviewsForPoint, addReview, deleteReview } = use(DataContext);
  const { user, addReputation } = use(AuthContext);
  
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const reviews = getReviewsForPoint(pointId);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Dziękujemy za twoją opinię! +5pkt")
    if (!user) {
      alert("Zaloguj się, aby oceniać!");
      return;
    }

    const newReview = {
      id: Date.now(),
      pointId: pointId, 
      author: user.name,
      authorAvatar: user.avatar,
      rating: rating,
      text: text,
      date: new Date().toLocaleDateString()
    };

    addReview(newReview);
    addReputation(5);

    setText('');
    setRating(5);

  };
  const handleDelete = (e, id) => {
      e.stopPropagation();
      deleteReview(id)
  }
  return (
    <div className="reviews-container">
      <h5 className="reviews-title">Opinie ({reviews.length})</h5>
      <div className="reviews-list">
        {reviews.length === 0 ? (
          <p className="no-reviews">Brak opinii. Bądź pierwszy!</p>
        ) : (
          reviews.map(r => {
            const allowDelete = user?.name === 'admin' || user?.name === r.author;
            return(
              <div key={r.id} className="review-item">
                <div className="review-header">
                  <strong>{r.author}</strong>
                  <span className="stars">★ {r.rating}</span>
                  {allowDelete && (
                  <button onClick={(e) => handleDelete(e, r.id)} title="Usuń opinię">X
                  </button>)}
                </div>
                <div className="review-text">{r.text}</div>
              </div>)
          })
        )}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="review-form">
          <div className="rating-row">
            <span>Twoja ocena:</span>
            <StarRating rating={rating} setRating={setRating} />
          </div>
          <textarea 
            id="review-input"
            autoComplete="off" 
            placeholder="Napisz komentarz..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit">
            Dodaj opinię (+5 pkt)
          </button>
        </form>
      ) : (
        <p className="login-alert">
          Zaloguj się, aby dodać opinię.
        </p>
      )}
    </div>
  );
};

export default PointReviews;