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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuariosGuardados.length >= 4) {
      alert('Ya hay 4 usuarios. No se pueden crear más.');
      return;
    }

    const nuevoUsuario = {
      id: Date.now(),
      name: formData.nombre,
      ...formData
    };

    const nuevosUsuarios = [...usuariosGuardados, nuevoUsuario];
    localStorage.setItem('usuarios', JSON.stringify(nuevosUsuarios));

    navigate('/select');
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
          <label>Ubicación actual:</label>
          <input
            type="text"
            name="ubicacion"
            value={formData.ubicacion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Presupuesto:</label>
          <input
            type="text"
            name="presupuesto"
            value={formData.presupuesto}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Preferencias:</label>
          <input
            type="text"
            name="preferencias"
            value={formData.preferencias}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
            <label>Fechas:</label>
            <input
              type="date"
              name="fechas"
              value={formData.fechas}
              onChange={handleChange}
            />
        </div>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}

export default CreateUser;
