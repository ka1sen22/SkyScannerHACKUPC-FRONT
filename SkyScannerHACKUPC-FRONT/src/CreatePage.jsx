// src/CreatePage.jsx
function CreatePage() {
    return (
      <div className="menu">
        <h2>Crear nueva party</h2>
        <form>
          <label>
            Nombre del viaje:
            <input type="text" />
          </label>
          <br />
          <button type="submit">Guardar</button>
        </form>
      </div>
    );
  }
  
  export default CreatePage;
  