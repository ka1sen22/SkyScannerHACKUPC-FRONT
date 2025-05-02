import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <h1>Nombre app</h1>
      <p>Crea una party para viaje tal tal</p>
      <button onClick={() => navigate('/create')}>Create</button>
      <br />
      <button onClick={() => navigate('/join')}>Join</button>
    </div>
  );
}

export default Menu;
