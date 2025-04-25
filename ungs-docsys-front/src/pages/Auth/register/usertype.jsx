import './usertype.css';

export default function UserType({ onSelect, onClose }) {
  const handleSelect = (userType) => {
    // This will trigger App.jsx to show the personaldata modal
    onSelect(userType); 
  };

  return (
    <div className="usertype-modal">
      <button className="close-button" onClick={onClose}>×</button>
      <h1>¿En qué podemos ayudarte?</h1>
      
      <div className="options-container">
        <button 
          className="option-card docente"
          onClick={() => handleSelect('docente')}
        >
          <h2>Postularme como docente y/o investigador</h2>
          <p>Registro para nuevos postulantes</p>
        </button>

        <button 
          className="option-card admin"
          onClick={() => handleSelect('admin')}
        >
          <h2>Buscar postulantes a docentes y/o investigadores</h2>
          <p>Acceso para comisiones evaluadoras</p>
        </button>
      </div>
    </div>
  );
}