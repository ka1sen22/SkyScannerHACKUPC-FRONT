import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateParty() {
  const navigate = useNavigate();
  const API_BASE_URL = 'http://hg209znye8r.sn.mynetname.net:8000/api/';

  useEffect(() => {
    const crearParty = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}parties/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}) // El código lo genera el backend
        });

        if (!response.ok) {
          throw new Error('Error al crear la party');
        }

        const data = await response.json();
        const partyCode = data.code;
        const partyId = data.id;

        localStorage.setItem('currentParty', partyCode);
        localStorage.setItem('currentPartyId', partyId);
        localStorage.setItem('isHost', 'true'); // Marcar como host

        navigate('/create');

      } catch (error) {
        console.error('Error creando party:', error);
        alert('No se pudo crear la party. Revisa la consola.');
      }
    };

    crearParty();
  }, [navigate]);

  return null;
}

export default CreateParty;
