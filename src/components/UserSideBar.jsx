import { useState, use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { convertToBase64 } from '../utils/imageConverter';
import './UserSideBar.scss';

const UserSidebar = () => {
  const { user, logout, updateAvatar, getCurrentRank, getNextRankProgress } = use(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const rank = getCurrentRank();
  const progress = getNextRankProgress();

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        updateAvatar(base64);
      } catch (err) {
        alert("Błąd podczas wgrywania zdjęcia.");
      }
    }
  };
  return (
    <>
      <div className="sidebar-toggle" onClick={() => setIsOpen(true)}>
        <span className="toggle-points">{user.points || 0} pkt</span>
        <div className="toggle-avatar" style={{ borderColor: rank.color }}>
          {user.avatar ? (
            <img src={user.avatar} alt="Avatar" />
          ) : (
            <span className="avatar-placeholder-icon">👤</span>
          )}
        </div>
      </div>
      {isOpen && (
        <>
          <div className="sidebar-backdrop" onClick={() => setIsOpen(false)} />
          
          <div className="sidebar-panel">
            <button className="btn-close" onClick={() => setIsOpen(false)}>✕</button>
            <div className="profile-section">
              <div className="avatar-wrapper">
                 <div 
                   className="avatar-container"
                   style={{ borderColor: rank.color }}
                 >
                    {user.avatar ? (
                      <img src={user.avatar} alt="Profile" />
                    ) : (
                      <div className="avatar-placeholder-large">👤</div>
                    )}
                 </div>
                 <label className="upload-icon" title="Zmień zdjęcie">
                   <input type="file" accept="image/*" onChange={handleAvatarChange} />
                   📷
                 </label>
              </div>

              <h2>{user.name}</h2>
              <div className="rank-name" style={{ color: rank.color }}>
                {rank.name}
              </div>
            </div>
            <div className="stats-card">
              <div className="stats-header">
                <span>Punkty: <strong>{user.points || 0}</strong></span>
                <span className="next-rank-info">Następna ranga: {progress.nextThreshold}</span>
              </div>
              
              <div className="progress-bar-track">
                <div 
                  className="progress-bar-fill"
                  style={{ 
                    width: `${progress.percent}%`, 
                    backgroundColor: rank.color 
                  }} 
                />
              </div>
              <div className="progress-text">
                Postęp: {Math.round(progress.percent)}%
              </div>
            </div>
              <button onClick={logout} className="btn-logout">
                Wyloguj mnie!
              </button>
          </div>
        </>
      )}
    </>
  );
};

export default UserSidebar;