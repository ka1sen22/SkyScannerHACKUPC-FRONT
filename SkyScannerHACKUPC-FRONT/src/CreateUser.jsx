// src/CreateParty.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateParty.css';

function CreateParty() {
  const navigate = useNavigate();
  const API_BASE_URL = 'http://hg209znye8r.sn.mynetname.net:8000/api/';

  useEffect(() => {
    const crearParty = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}parties/`, {
          method: 'POST',
          headers: { 'Content-TypeRevi': 'application/json' },
          body: JSON.stringify({})
        });

        if (!response.ok) throw new Error('Error al crear la party');
        const data = await response.json();

        localStorage.setItem('currentParty', data.code);
        localStorage.setItem('currentPartyId', data.id);
        localStorage.setItem('isHost', 'true');

        navigate('/create');
      } catch (error) {
        console.error('Error creando party:', error);
        alert('No se pudo crear la party. Revisa la consola.');
      }
    };
    crearParty();
  }, [navigate]);

  return (
    <div className="create-party-page">
      <button type="button" className="back-button" onClick={() => navigate('/')}>Volver</button>
      <div className="create-party-menu">
        <p className="create-message">Creando party...</p>
      </div>
    </div>
  );
}

export default CreateParty;