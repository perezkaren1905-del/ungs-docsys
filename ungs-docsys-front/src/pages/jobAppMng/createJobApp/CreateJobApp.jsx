import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/UI/Header";
import "../../../assets/styles/Home.css";

export default function CreateJobApp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    position: "",
    course: "",
    period: "",
    motivation: ""
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const positionOptions = [
    "Docente 1°",
    "Docente 2°",
    "Asistente 1°",
    "Asistente 2°",
    "Investigador"
  ];

  const periodOptions = [
    "1er cuatrimestre 2025",
    "2do cuatrimestre 2025",
    "Verano 2026"
  ];

  // Check form validity whenever formData changes
  useEffect(() => {
    const isValid = 
      formData.position && 
      formData.course && 
      formData.period && 
      formData.motivation;
    setIsFormValid(!!isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    console.log("Form submitted:", formData);
    navigate("/ViewJobApp");
  };

  return (
    <div className="home-container">
      <Header 
        user={{ name: "Doe, John", role: "Reclutador" }} 
        navItems={["Gestión de Postulaciones", "Otras opciones", "Opción 2", "Opción 3"]}
      />
      
      <div className="app-container">
        <h1>Nueva postulación</h1>
        <p>Agregue los datos generales de su postulación</p>
        
        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label>Cargo</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="form-input"
              style={!formData.position ? {color: '#999'} : {}}
              required
            >
              <option value="" disabled hidden>Seleccione una opción</option>
              {positionOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Materia</label>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="form-input"
              placeholder="Escriba la materia"
              style={!formData.course ? {color: '#999'} : {}}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Período</label>
            <select
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="form-input"
              style={!formData.period ? {color: '#999'} : {}}
              required
            >
              <option value="" disabled hidden>Seleccione una opción</option>
              {periodOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>¿Por qué desea abrir esta postulación?</label>
            <textarea
              name="motivation"
              value={formData.motivation}
              onChange={handleChange}
              className="form-textarea"
              rows={4}
              placeholder="Escriba su razón aquí"
              style={!formData.motivation ? {color: '#999'} : {}}
              required
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => navigate("/jobAppList")}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="create-button"
              disabled={!isFormValid}
            >
              Crear postulación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}