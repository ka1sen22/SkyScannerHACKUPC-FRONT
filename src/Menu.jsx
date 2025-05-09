// src/Menu.jsx
import { useNavigate } from 'react-router-dom';
import './Menu.css';

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="menu">
      {/* Botón Create */}
      <button onClick={() => navigate('/party')} className="menu-button">
        Create Party
      </button>

      {/* Sección Join con logo arriba */}
      <div className="join-section">
        <img
          src="/vite.svg"
          alt="Skyscanner Logo"
          className="skyscanner-logo"
        />
        <button onClick={() => navigate('/joinparty')} className="menu-button">
          Join Party
        </button>
      </div>
    </div>
  );
}

export default Menu;