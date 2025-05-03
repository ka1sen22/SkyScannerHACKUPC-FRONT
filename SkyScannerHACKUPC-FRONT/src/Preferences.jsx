import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
function Preferencias() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [ratings, setRatings] = useState({
    Culture: 3,
    Food: 3,
    Outdoors: 3,
    Weather: 3,
    Events: 3,
  });
  const API_BASE_URL = 'http://hg209znye8r.sn.mynetname.net:8000/api/';
  useEffect(() => {
    const id = localStorage.getItem('currentUserId');
    if (!id) {
      alert('No hay usuario activo');
      navigate('/');
    } else {
      setUserId(id);
    }
  }, [navigate]);
  const handleChange = (category, value) => {
    setRatings((prev) => ({
      ...prev,
      [category]: Number(value),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const preferences = {
      user: Number(userId),
      green_travel: true, 
      culture: ratings.Culture,
      food: ratings.Food,
      outdoors: ratings.Outdoors,
      weather: ratings.Weather,
      events: ratings.Events
    };
    try {
      const res = await fetch(`${API_BASE_URL}preferences/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(JSON.stringify(err));
      }
      alert('Preferencias guardadas correctamente.');
      navigate('/select'); 
    } catch (error) {
      console.error('Error al guardar preferencias:', error);
      alert('No se pudieron guardar las preferencias.');
    }
  };
  return (
    <div className="menu">
      <BackButton />
      <h2>Elige tus preferencias</h2>
      <form onSubmit={handleSubmit} className="preferencias-form">
        <div className="slider-grid">
          {Object.keys(ratings).map((type) => (
            <div className="slider-column" key={type}>
              <label>{type}</label>
              <input
                type="range"
                className="slider-vertical"
                min="0"
                max="5"
                step="1"
                value={ratings[type]}
                onChange={(e) => handleChange(type, e.target.value)}
              />
              <span>{ratings[type]}</span>
            </div>
          ))}
        </div>
        <button type="submit">Guardar preferencias</button>
      </form>
    </div>
  );
}
export default Preferencias;