import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';

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
        // 1. Obtener ID real de la party desde el código
        const partyRes = await fetch(`${API_BASE_URL}parties/${currentPin}/`);
        if (!partyRes.ok) throw new Error('No se pudo obtener la party');
        const partyData = await partyRes.json();
        const currentPartyId = partyData.id;
        setPartyId(currentPartyId);

        // 2. Obtener usuarios y preferencias
        const [usersRes, prefsRes] = await Promise.all([
          fetch(`${API_BASE_URL}users/`),
          fetch(`${API_BASE_URL}preferences/`)
        ]);

        if (!usersRes.ok || !prefsRes.ok) throw new Error('Error cargando datos');

        const allUsers = await usersRes.json();
        const allPrefs = await prefsRes.json();

        // 3. Extraer IDs de usuarios con preferencias
        const userIdsWithPrefs = new Set(allPrefs.map((pref) => pref.user));

        // 4. Filtrar usuarios por party y marcar si tienen preferencias
        const filteredUsers = allUsers
          .filter((user) => user.party === currentPartyId)
          .map((user) => ({
            ...user,
            has_preferences: userIdsWithPrefs.has(user.id)
          }));

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
    if (user.has_preferences) {
      const confirmChange = window.confirm(
        `El usuario "${user.name}" ya tiene preferencias guardadas. ¿Quieres modificarlas?`
      );
      if (!confirmChange) return;
    }

    localStorage.setItem('currentUserId', user.id);
    navigate('/preferencias');
  };

  const handleAddUser = () => {
    navigate('/create');
  };

  return (
    <div className="user-selection">
      <BackButton/>
      <h2>¿Quién eres?</h2>
      {pin && (
        <p className="pin-info">
          Código de la party: <strong>{pin}</strong>
        </p>
      )}
  
      <div className="user-grid">
        {users.map((user) => (
          <div key={user.id} className="user-container">
            <div
              className={`user-card ${user.has_preferences ? 'has-preferences' : ''}`}
              onClick={() => handleSelect(user)}
            >
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
  
      {/* ✅ Botón "Listo" visible solo si todos los usuarios tienen preferencias */}
      {users.length > 0 && users.every(user => user.has_preferences) && (
        <button className="btn-listo" onClick={() => navigate('/finalizar')}>
          Listo
        </button>
      )}
    </div>
  );
}

export default UserSelection;
