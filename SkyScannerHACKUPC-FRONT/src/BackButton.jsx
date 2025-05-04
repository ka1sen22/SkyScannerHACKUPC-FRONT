import { useNavigate } from 'react-router-dom';
import './index.css'; // para los estilos

function BackButton() {
  const navigate = useNavigate();

  return (
    <button className="back-button" onClick={() => navigate(-1)}>
      Back
    </button>
  );
}

export default BackButton;