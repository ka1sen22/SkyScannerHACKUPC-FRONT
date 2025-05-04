// src/Preferences.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './Preferences.css';

function Preferences() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [ratings, setRatings] = useState({
    Culture: 3,
    Food: 3,
    Outdoors: 3,
    Weather: 3,
    Events: 3,
  });
  const API_BASE_URL = 'http://172.16.0.200:8000/api/';

  useEffect(() => {
    const id = localStorage.getItem('currentUserId');
    if (!id) {
      alert('No active user');
      navigate('/');
    } else {
      setUserId(id);
    }
  }, [navigate]);

  const handleChange = (category, value) => {
    setRatings(prev => ({
      ...prev,
      [category]: Number(value),
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const preferences = {
      user: Number(userId),
      green_travel: true,
      culture: ratings.Culture,
      food: ratings.Food,
      outdoors: ratings.Outdoors,
      weather: ratings.Weather,
      events: ratings.Events,
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
      alert('Preferences saved successfully.');
      navigate('/select');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('Unable to save preferences.');
    }
  };

  return (
    <div className="preferences-page">
      <BackButton />
      <form onSubmit={handleSubmit} className="preferences-form">
        <h2 className="form-title">Choose Your Preferences</h2>
        <div className="slider-grid">
          {Object.keys(ratings).map(type => (
            <div key={type} className="slider-column">
              <label className="slider-label">{type}</label>
              <input
                type="range"
                className="slider-vertical"
                min="0"
                max="5"
                step="1"
                value={ratings[type]}
                onChange={e => handleChange(type, e.target.value)}
              />
              <span className="slider-value">{ratings[type]}</span>
            </div>
          ))}
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default Preferences;