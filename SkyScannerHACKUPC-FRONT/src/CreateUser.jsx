import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function CreateUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    ubicacion: '',
    presupuesto: '',
    preferencias: '',
    fechas: '',
  });
  const API_BASE_URL = 'http://hg209znye8r.sn.mynetname.net:26969/api/'; 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentPin = localStorage.getItem('currentParty');
    if (!currentPin) {
      alert('No hay una party activa.');
      return;
    }
    try {
      // 1. Enviar datos del usuario
      const userResponse = await fetch(`${API_BASE_URL}party/${currentPin}/join/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.nombre,
          city: formData.ubicacion,
          budget: formData.presupuesto,
          start_date: formData.fechas,
          end_date: formData.fechas
        })
      });
      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(JSON.stringify(errorData));
      }
      const userData = await userResponse.json();
      const userId = userData.user_id;
      // 2. Enviar preferencias
      const preferencias = formData.preferencias
        .split(',')
        .map(p => p.trim())
        .filter(p => p.length > 0);
      const prefResponse = await fetch(`${API_BASE_URL}user/${userId}/preferences/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ preferences })
      });
      if (!prefResponse.ok) {
        const errorPref = await prefResponse.json();
        throw new Error(JSON.stringify(errorPref));
      }
      // 3. Redirigir
      navigate('/select');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      alert('Error al crear usuario. Revisa la consola.');
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
        <div className="form-group">
          <label>Preferencias (separadas por comas):</label>
          <input
            type="text"
            name="preferencias"
            value={formData.preferencias}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Fechas de viaje:</label>
          <input
            type="date"
            name="fechas"
            value={formData.fechas}
            onChange={handleChange}
            required
          /> 
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}
export default CreateUser;