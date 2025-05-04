// src/CreateParty.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateParty.css';

function CreateParty() {
  const navigate = useNavigate();
  const API_BASE_URL = 'http://hg209znye8r.sn.mynetname.net:8000/api/';

  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    presupuesto: '',
    fechas: '',
    fechae: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Crear party
      const partyResponse = await fetch(`${API_BASE_URL}parties/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      if (!partyResponse.ok) {
        throw new Error(`Party creation failed: ${partyResponse.status}`);
      }
      const partyData = await partyResponse.json();

      // 2. Crear usuario host
      const payload = {
        name: formData.nombre,
        city: formData.ubicacion,
        budget: Number(formData.presupuesto),
        is_host: true,
        party: partyData.id,
        start_date: formData.fechas,
        end_date: formData.fechae
      };
      const userResponse = await fetch(`${API_BASE_URL}users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!userResponse.ok) {
        const errJson = await userResponse.json().catch(() => null);
        throw new Error(`User creation failed: ${userResponse.status} ${JSON.stringify(errJson)}`);
      }

      // Guardar info en localStorage
      localStorage.setItem('currentParty', partyData.code);
      localStorage.setItem('currentPartyId', partyData.id);
      localStorage.setItem('isHost', 'true');

      navigate('/select');
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="create-party-page">
      <button type="button" className="back-button" onClick={() => navigate('/')}>Return</button>
      <div className="create-party-menu">
        <h2 className="form-title">Create Party</h2>
        {error && <p className="form-error">{error}</p>}
        <form onSubmit={handleSubmit} className="party-form">
          <input
            name="nombre"
            type="text"
            required
            className="form-input"
            placeholder="Your Name"
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
          {/* Journey dates group */}
          <div className="dates-group">
            <label className="dates-label">Journey Dates</label>
            <div className="dates-inputs">
              <input
                id="fechas"
                name="fechas"
                type="date"
                required
                className="form-input date-input"
                value={formData.fechas}
                onChange={handleChange}
              />
              <input
                id="fechae"
                name="fechae"
                type="date"
                required
                className="form-input date-input"
                value={formData.fechae}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default CreateParty;