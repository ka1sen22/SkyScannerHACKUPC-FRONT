import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

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
      // Si la party existe:
      localStorage.setItem('currentParty', pin);
      setError('');
      navigate('/select');
    } catch (error) {
      console.error('Error al buscar la party:', error);
      setError('PIN no válido o la party no existe');
    }
  };
  return (
    <div className="menu">
      <BackButton/>
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