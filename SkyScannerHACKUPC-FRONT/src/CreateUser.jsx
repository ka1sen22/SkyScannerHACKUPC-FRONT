import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [partyId, setPartyId] = useState(null);
  const [isHost, setIsHost] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    presupuesto: '',
    fechas: '',
    fechae: '',
  });

  const API_BASE_URL = 'http://hg209znye8r.sn.mynetname.net:8000/api/';

  useEffect(() => {
    const currentPin = localStorage.getItem('currentParty');
    const currentPartyId = localStorage.getItem('currentPartyId');
    const hostFlag = localStorage.getItem('isHost');

    if (!currentPin || !currentPartyId) {
      alert('No hay una party activa.');
      return;
    }

    setPin(currentPin);
    setPartyId(currentPartyId);
    setIsHost(hostFlag === 'true');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!partyId) {
      alert('No se ha cargado correctamente la ID de la party.');
      return;
    }

    try {
      const payload = {
        name: formData.nombre,
        city: formData.ubicacion,
        budget: Number(formData.presupuesto),
        is_host: isHost,
        party: Number(partyId)
      };

      if (isHost) {
        payload.start_date = formData.fechas;
        payload.end_date = formData.fechae;
      }

      const userResponse = await fetch(`${API_BASE_URL}users/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(JSON.stringify(errorData));
      }

      await userResponse.json();

      // Limpiar el flag después de crear el host
      localStorage.removeItem('isHost');

      navigate('/select');

    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error al crear el usuario. Consulta la consola para más información.');
    }
  };

  return (
    <div className="menu">
      <h2>Crear usuario</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ubicación:</label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Presupuesto (€):</label>
          <input
            type="number"
            name="presupuesto"
            value={formData.presupuesto}
            onChange={handleChange}
            required
          />
        </div>

        {isHost && (
          <>
            <div className="form-group">
              <label>Start Date:</label>
              <input
                type="date"
                name="fechas"
                value={formData.fechas}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date:</label>
              <input
                type="date"
                name="fechae"
                value={formData.fechae}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Party PIN:</label>
          <p><strong>{pin}</strong></p>
        </div>

        <button type="submit" disabled={!partyId}>Guardar</button>
      </form>
    </div>
  );
}

export default CreateUser;
