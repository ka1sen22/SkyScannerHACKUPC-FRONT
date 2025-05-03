import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinParty() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    const allParties = JSON.parse(localStorage.getItem('partyUsers')) || {};

    if (allParties[pin]) {
      localStorage.setItem('currentParty', pin);
      navigate('/select');
    } else {
      setError('PIN no válido o la party no existe');
    }
  };

  return (
    <div className="menu">
      <h2>Unirse a una Party</h2>
      <label>
        Introduce el PIN:
        <input
          type="text"
          value={pin}
          onChange={(e) => {
            setPin(e.target.value.toUpperCase());
            setError('');
          }}
        />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleJoin}>Unirse</button>
    </div>
  );
}

export default JoinParty;
