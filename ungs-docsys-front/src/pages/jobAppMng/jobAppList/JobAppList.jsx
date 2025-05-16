import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/UI/Header";
import "../../../assets/styles/Home.css";

export default function JobAppList() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    keywords: "",
    type: "",
    period: "",
    status: ""
  });

  // Sample data - replace with your actual data source
  const jobApplications = [
    {
      id: 1,
      type: "Docente 1º",
      title: "Laboratorio de Construcción de Software/ Proyecto Profesional I",
      period: "2do cuatrimestre 2025",
      status: "Aprobada"
    },
    {
      id: 2,
      type: "Investigador",
      title: "Didáctica de la computación",
      period: "2do cuatrimestre 2025",
      status: "Pendiente"
    },
    {
      id: 3,
      type: "Asistente 2º",
      title: "Sistemas Operativos y Redes II",
      period: "2do cuatrimestre 2025",
      status: "Rechazada"
    }
  ];

  // Filter options
  const typeOptions = ["Docente 1º", "Docente 2º", "Asistente 1º", "Asistente 2º", "Investigador"];
  const periodOptions = ["1er cuatrimestre 2025", "2do cuatrimestre 2025", "Verano 2026"];
  const statusOptions = ["Aprobada", "Pendiente", "Rechazada"];

  const normalizeString = (str) => {
    return str
      .normalize("NFD") // Normalize to decomposed form
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .toLowerCase();
  };

  const filteredApplications = jobApplications.filter(app => {
    const normalizedKeywords = normalizeString(filters.keywords);
    const normalizedTitle = normalizeString(app.title); // <-- Calculate this here
    return (
      (filters.keywords === "" || 
       normalizedTitle.includes(normalizedKeywords)) &&
      (filters.type === "" || app.type === filters.type) &&
      (filters.period === "" || app.period === filters.period) &&
      (filters.status === "" || app.status === filters.status)
    );
  });

  return (
    <div className="home-container">
      <Header 
        user={{ name: "Doe, John", role: "Reclutador" }} 
        navItems={["Gestión de Postulaciones", "Otras opciones", "Opción 2", "Opción 3"]}
      />
      
      <div className="app-container">
        <h1>Lista de Postulaciones</h1>
        <p>Seleccione una postulación de la lista para visualizarla</p>
        
        {/* Filters Section */}
        <div className="filters-section">
          <div className="filter-group">
            <label>Palabras clave:</label>
            <input 
              type="text" 
              value={filters.keywords}
              onChange={(e) => setFilters({...filters, keywords: e.target.value})}
            />
          </div>
          
          <div className="filter-group">
            <label>Tipo:</label>
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="">Todos</option>
              {typeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Período:</label>
            <select
              value={filters.period}
              onChange={(e) => setFilters({...filters, period: e.target.value})}
            >
              <option value="">Todos</option>
              {periodOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Estado:</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="">Todos</option>
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Applications List */}
        <div className="applications-list">
          {filteredApplications.map(app => (
            <div key={app.id} className="application-card" onClick={() => navigate('/viewJobApp')}>
              <h3>{app.type}</h3>
              <h2>{app.title}</h2>
              <p>{app.period}</p>
              <div className={`status-badge ${app.status.toLowerCase().replace(/\s/g, '-')}`}>
                {app.status}
              </div>
            </div>
          ))}
        </div>
        
        {/* Create New Application Button */}
        <button 
          className="create-button"
          onClick={() => navigate("/createJobApp")}
        >
          Crear nueva postulación
        </button>
      </div>
    </div>
  );
}