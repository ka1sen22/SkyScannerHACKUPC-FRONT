// src/UserSelection.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSelection.css';

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
        // 1. Fetch real party ID by code
        const partyRes = await fetch(`${API_BASE_URL}parties/${currentPin}/`);
        if (!partyRes.ok) throw new Error('Failed to fetch party');
        const partyData = await partyRes.json();
        const currentPartyId = partyData.id;
        setPartyId(currentPartyId);

        // 2. Fetch users and preferences
        const [usersRes, prefsRes] = await Promise.all([
          fetch(`${API_BASE_URL}users/`),
          fetch(`${API_BASE_URL}preferences/`)
        ]);

        if (!usersRes.ok || !prefsRes.ok) throw new Error('Error loading data');

        const allUsers = await usersRes.json();
        const allPrefs = await prefsRes.json();

        // 3. Extract IDs of users with preferences
        const userIdsWithPrefs = new Set(allPrefs.map(pref => pref.user));

        // 4. Filter users by party and mark preferences
        const filteredUsers = allUsers
          .filter(user => user.party === currentPartyId)
          .map(user => ({
            ...user,
            has_preferences: userIdsWithPrefs.has(user.id)
          }));

        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error:', error);
        alert('Unable to load party members.');
      }
    };

    if (currentPin) {
      fetchUsersFiltered();
    }
  }, [navigate]);

  const handleSelect = user => {
    if (user.has_preferences) {
      const confirmChange = window.confirm(
        `User "${user.name}" already has preferences. Modify them?`
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
      <h2 className="selection-title">Who are you?</h2>
      {pin && (
        <p className="pin-info">
          Party Code: <strong>{pin}</strong>
        </p>
      )}

      <div className="user-grid">
        {users.map(user => (
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
            <p className="user-name">Add</p>
          </div>
        )}
      </div>

      {users.length > 0 && users.every(user => user.has_preferences) && (
        <button className="btn-ready" onClick={() => navigate('/finalize')}>
          Ready
        </button>
      )}
    </div>
  );
}

export default UserSelection;
