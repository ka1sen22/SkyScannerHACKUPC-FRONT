import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateParty() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleCreate = () => {
    if (!pin) {
      setError('Debes ingresar un PIN');
      return;
    }

    localStorage.setItem('partyPin', pin);
    localStorage.setItem('partyUsers', JSON.stringify([])); // iniciamos sin usuarios
    navigate('/select');
  };

  return (
    <div className="menu">
      <h2>Crear nueva Party</h2>
      <label>
        Introduce un PIN para la party:
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
      <button onClick={handleCreate}>Crear Party</button>
    </div>
  );
}

export default CreateParty;
