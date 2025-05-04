// src/CreateUser.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateUser.css';

function CreateUser() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [partyId, setPartyId] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    presupuesto: ''
  });

  useEffect(() => {
    const currentPin = localStorage.getItem('currentParty');
    const currentPartyId = localStorage.getItem('currentPartyId');
    const hostFlag = localStorage.getItem('isHost');

    if (!currentPin || !currentPartyId) {
      alert('No active party found.');
      navigate('/');
      return;
    }

    setPin(currentPin);
    setPartyId(currentPartyId);
    setIsHost(hostFlag === 'true');

    if (hostFlag === 'true') {
      // If host, redirect to host view
      navigate('/create');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!partyId) return;

    try {
      const payload = {
        name: formData.nombre,
        city: formData.ubicacion,
        budget: Number(formData.presupuesto),
        is_host: false,
        party: Number(partyId)
      };

      const response = await fetch('http://172.16.0.200:8000/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData ? JSON.stringify(errorData) : 'Error creating user');
      }

      // User created successfully
      localStorage.removeItem('isHost');
      navigate('/select');
    } catch (err) {
      console.error('Error creating user:', err);
      alert('Error creating user. Check console for details.');
    }
  };

  return (
    <div className="create-user-page">
      <button type="button" className="back-button" onClick={() => navigate('/')}>Back</button>
      <div className="create-user-menu">
        <h2 className="form-title">New User</h2>
        <form onSubmit={handleSubmit} className="user-form">
          <input
            name="nombre"
            type="text"
            required
            className="form-input"
            placeholder="Name"
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            name="ubicacion"
            type="text"
            required
            className="form-input"
            placeholder="Location"
            value={formData.ubicacion}
            onChange={handleChange}
          />
          <input
            name="presupuesto"
            type="number"
            required
            className="form-input"
            placeholder="Budget (€)"
            value={formData.presupuesto}
            onChange={handleChange}
          />
          <div className="pin-display">
            Party PIN: <strong>{pin}</strong>
          </div>
          <button type="submit" className="submit-button">Save</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;