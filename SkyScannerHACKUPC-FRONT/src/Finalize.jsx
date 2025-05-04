// src/Finalize.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import './Finalize.css';

const API_BASE_URL = 'http://hg209znye8r.sn.mynetname.net:8000/api/';

export default function Finalize() {
  const [country, setCountry] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const partyCode = localStorage.getItem('currentParty');
    if (!partyCode) {
      setError('No party selected');
      setLoading(false);
      return;
    }

    // 1. Fetch all parties
    fetch(`${API_BASE_URL}parties/`)
      .then(res => {
        if (!res.ok) throw new Error(`Party list failed: ${res.status}`);
        return res.json();
      })
      .then(parties => {
        // 2. Find by code
        const party = parties.find(p => p.code === partyCode);
        if (!party) throw new Error('Invalid party code');
        return party.id;
      })
      .then(partyId =>
        // 3. Recommendation endpoint
        fetch(`${API_BASE_URL}buscarpaisgrupo/${partyId}/`)
      )
      .then(res => {
        if (!res.ok) throw new Error(`Recommendation failed: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setCountry(data.pais_recomendado);
      })
      .catch(err => {
        console.error(err);
        setError('Error generating recommendation');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  // Once country is set, fetch image
  useEffect(() => {
    if (!country) return;
    fetch(`${API_BASE_URL}city-image/?city=${encodeURIComponent(country)}`)
      .then(res => {
        if (!res.ok) throw new Error(`Image fetch failed: ${res.status}`);
        return res.json();
      })
      .then(data => setImageUrl(data.url))
      .catch(err => console.error('Error loading city image:', err));
  }, [country]);

  if (loading) {
    return (
      <div className="finalize">
        <div className="finalize-content">
          <p>Loading destination...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="finalize">
        <div className="finalize-content">
          <p className="error">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="finalize">
      <BackButton />
      <div className="finalize-content">
        <h2>You Have A Destination!</h2>
        <div className="recommendation-card">
          <span className="country-name">{country}</span>
        </div>
        {imageUrl && (
          <div className="image-container">
            <img src={imageUrl} alt={`View of ${country}`} className="city-image" />
          </div>
        )}
        <button className="confirm-button" onClick={() => navigate('/')}>Done</button>
      </div>
    </div>
  );
}