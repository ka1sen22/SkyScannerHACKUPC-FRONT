import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateParty() {
  const navigate = useNavigate();

  const generarPin = () => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pin = '';
    for (let i = 0; i < 6; i++) {
      pin += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return pin;
  };

  useEffect(() => {
    const nuevoPin = generarPin();

    localStorage.setItem('currentParty', nuevoPin);

    const allParties = JSON.parse(localStorage.getItem('partyUsers')) || {};
    allParties[nuevoPin] = [];
    localStorage.setItem('partyUsers', JSON.stringify(allParties));

    navigate('/select');
  }, [navigate]);

  return null;
}

export default CreateParty;
