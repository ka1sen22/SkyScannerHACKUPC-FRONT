import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function JoinParty() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    const storedPin = localStorage.getItem('partyPin');

    if (pin === storedPin) {
      navigate('/select');
    } else {
      setError('PIN incorrecto o no existe ninguna party');
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
            setPin(e.target.value);
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
