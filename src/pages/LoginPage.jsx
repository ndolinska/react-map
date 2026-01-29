import { useState, use } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Pages.scss';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { login } = use(AuthContext); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    if (!username.trim()) return;
    login(username);
    // Wykorzystanie routera
    navigate('/map');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Witaj w MyMap!</h2>
        <p className="subtitle">Zaloguj się, aby dodawać i edytować punkty.</p>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            autoComplete="on" 
            placeholder="Podaj nazwę użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="login-input"
          />
          <button type="submit" className="login-btn">Zaloguj się</button>
        </form>
        <div className="login-info">
          <p>Info: Wpisz <strong>admin</strong>, aby uzyskać uprawnienia administratora.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;