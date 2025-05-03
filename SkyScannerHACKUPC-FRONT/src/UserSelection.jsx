import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserSelection() {
  const [users, setUsers] = useState([]);
  const [pin, setPin] = useState('');
  const [partyId, setPartyId] = useState(null);
  const navigate = useNavigate();
  const API_BASE_URL = 'http://hg209znye8r.sn.mynetname.net:8000/api/';

  useEffect(() => {
    const currentPin = localStorage.getItem('currentParty');
    setPin(currentPin || '');

    const fetchUsersFiltered = async () => {
      try {
        // 1. Obtener la ID real de la party a partir del PIN
        const partyRes = await fetch(`${API_BASE_URL}parties/${currentPin}/`);
        if (!partyRes.ok) throw new Error('No se pudo obtener la party');
        const partyData = await partyRes.json();
        const currentPartyId = partyData.id;
        setPartyId(currentPartyId);

        // 2. Obtener todos los usuarios
        const usersRes = await fetch(`${API_BASE_URL}users/`);
        if (!usersRes.ok) throw new Error('Error al obtener usuarios');
        const allUsers = await usersRes.json();

        // 3. Filtrar solo los de esta party
        const filteredUsers = allUsers.filter(
          (user) => user.party === currentPartyId
        );

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error:', error);
        alert('No se pudieron cargar los usuarios de esta party.');
      }
    };

    if (currentPin) {
      fetchUsersFiltered();
    }
  }, []);

  const handleSelect = (user) => {
    localStorage.setItem('currentUserId', user.id);
    navigate('/preferencias');
  };

  const handleAddUser = () => {
    navigate('/create');
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
