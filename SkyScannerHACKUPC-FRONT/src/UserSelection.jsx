import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserSelection() {
  const [users, setUsers] = useState([]);
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentPin = localStorage.getItem('currentParty');
    setPin(currentPin || '');

    const partyUsers = JSON.parse(localStorage.getItem('partyUsers')) || {};
    const usuarios = currentPin ? partyUsers[currentPin] || [] : [];

    setUsers(usuarios);
  }, []);

  const handleSelect = (user) => {
    alert(`Usuario seleccionado: ${user.name}`);
  };

  const handleAddUser = () => {
    navigate('/create');
  };

  return (
    <div className="user-selection">
      <h2>¿Quién eres?</h2>
      {pin && (
        <p className="pin-info">
          PIN de la party: <strong>{pin}</strong>
        </p>
      )}
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-container">
            <div className="user-card" onClick={() => handleSelect(user)}></div>
            <p className="user-name">{user.name}</p>
          </div>
        ))}

        {users.length < 4 && (
          <div className="user-container">
            <div className="user-card add-user" onClick={handleAddUser}>
              <span className="plus-icon">+</span>
            </div>
            <p className="user-name">Añadir</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSelection;
