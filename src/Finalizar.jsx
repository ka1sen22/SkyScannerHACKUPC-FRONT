import { useEffect, useState } from 'react';

function FinalizarViaje() {
  const [flightData, setFlightData] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'http://172.16.0.200:8000/api/';
  
  useEffect(() => {
    const partyId = localStorage.getItem('currentPartyId');
    if (!partyId) {
      setError('No se ha encontrado una party activa');
      return;
    }
    fetch(`${API_BASE_URL}flights/?party_id=${partyId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener vuelos');
        return res.json();
      })
      .then((data) => setFlightData(data))
      .catch((err) => setError(err.message));
  }, []);
  if (error) {
    return <p className="text-red-600">{error}</p>;
  }
  if (!flightData) {
    return <p>Cargando vuelos...</p>;
  }
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl font-bold">Resumen de vuelos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(flightData).map(([type, info]) => (
          <div key={type} className="border p-4 rounded-lg shadow-md bg-white">
            <h3 className="text-lg font-semibold mb-2">{type.toUpperCase()}</h3>
            <p><strong>Precio:</strong> €{info[0]}</p>
            <p><strong>Vuelo de ida:</strong> {info[1]} • {info[2]} min • {info[3]}</p>
            <p><strong>Vuelo de vuelta:</strong> {info[4]} • {info[5]} min • {info[6]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default FinalizarViaje;