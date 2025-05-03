import { useEffect, useState } from 'react';
import BackButton from './BackButton';
import LoadingScreen from './LoadingScreen';

function Finalizar() {
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = 'http://hg209znye8r.sn.mynetname.net:8000/api/';
  const currentPin = localStorage.getItem('currentParty');

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}parties/${currentPin}/resultados/`);
        if (!res.ok) throw new Error('No se pudo obtener el resultado');
        const data = await res.json();
        setResultado(data);
      } catch (error) {
        console.error('Error:', error);
        alert('Error al obtener resultados. Consulta consola.');
      } finally {
        setLoading(false);
      }
    };

    fetchResultados();
  }, [currentPin]);

  if (loading) {
    return (
      <div className="menu">
        <LoadingScreen />
      </div>
    );
  }

  if (!resultado) {
    return (
      <div className="menu">
        <BackButton />
        <p>No se han encontrado resultados.</p>
      </div>
    );
  }

  return (
    <div className="menu">
      <BackButton />
      <h2>Destino recomendado</h2>
      <h3>🌍 {resultado.pais}</h3>

      <table className="tabla-resultados">
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Más barato (€)</th>
            <th>Más rápido (€)</th>
            <th>Recomendado (€)</th>
          </tr>
        </thead>
        <tbody>
          {resultado.vuelos.map((vuelo) => (
            <tr key={vuelo.user_id}>
              <td>{vuelo.nombre}</td>
              <td>{vuelo.mas_barato} €</td>
              <td>{vuelo.mas_rapido} €</td>
              <td>{vuelo.recomendado} €</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Finalizar;
