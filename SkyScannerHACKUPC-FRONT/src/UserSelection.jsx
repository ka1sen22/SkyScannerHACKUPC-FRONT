import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserSelection() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('usuarios')) || [];
    setUsers(storedUsers);
  }, []);

  const handleSelect = (user) => {
    alert('Usuario seleccionado: ${user.name}');
    // Aquí puedes redirigir o guardar usuario activo
  };

  const handleAddUser = () => {
    navigate('/create');
  };

  return (
    <div className="user-selection">
      <h2>¿Quién eres?</h2>
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
