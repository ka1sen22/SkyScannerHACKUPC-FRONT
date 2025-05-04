import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './JoinParty.css';

function JoinParty() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_BASE_URL = 'http://hg209znye8r.sn.mynetname.net:8000/api/';

  const handleJoin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}parties/code/${pin}/`);
      if (!response.ok) {
        throw new Error('La party no existe');
      }
      localStorage.setItem('currentParty', pin);
      setError('');
      navigate('/select');
    } catch (err) {
      console.error('Error al buscar la party:', err);
      setError('PIN no válido o la party no existe');
    }
  };

  return (
    <div className="join-party-page">
      <BackButton />
      <div className="menu join-party-menu">
        <label htmlFor="pin-input" className="join-label">
          Introduce el PIN
        </label>
        <input
          id="pin-input"
          type="text"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.toUpperCase());
            setError('');
          }}
          className="join-input"
        />
        {error && <p className="join-error">{error}</p>}
        <button onClick={handleJoin} className="join-button">
          Unirse
        </button>
      </div>
    </div>
  );
}

export default JoinParty;
