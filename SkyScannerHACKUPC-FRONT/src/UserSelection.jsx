import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
function UserSelection() {
  const [users, setUsers] = useState([]);
  const [pin, setPin] = useState('');
  const navigate = useNavigate();
  const API_BASE_URL = 'http://hg209znye8r.sn.mynetname.net:26969/api/';
  useEffect(() => {
    const currentPin = localStorage.getItem('currentParty');
    setPin(currentPin || '');
    if (currentPin) {
      fetch(`${API_BASE_URL}parties/${currentPin}/users/`)
        .then((res) => {
          if (!res.ok) throw new Error('Error al obtener usuarios');
          return res.json();
        })
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error('Error al cargar usuarios:', error);
          alert('No se pudieron cargar los usuarios.');
        });
    }
  }, []);
  const handleSelect = (user) => {
    alert(`Has seleccionado a ${user.name}`);
    localStorage.setItem('currentUserId', user.id);
    navigate('/preferencias');
  };
  const handleAddUser = () => {
    navigate('/join');
  };
  return (
    <div className="user-selection">
      <h2>¿Quién eres?</h2>
      {pin && (
        <p className="pin-info">
          Código de la party: <strong>{pin}</strong>
        </p>
      )}
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-container">
            <div className="user-card" onClick={() => handleSelect(user)}>
              <p className="user-name">{user.name}</p>
            </div>
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