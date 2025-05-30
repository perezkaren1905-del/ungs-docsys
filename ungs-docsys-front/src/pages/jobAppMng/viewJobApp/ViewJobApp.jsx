import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/UI/Header";
import "../../../assets/styles/Home.css";
import { JwtService } from "../../../commons/utils/jwt.service";
import { useParams } from "react-router-dom";

export default function ViewJobApp() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [jobApp, setJobApp] = useState({
    title: "Laboratorio de Construcción de Software/ Proyecto Profesional I",
    type: "Docente 1º",
    period: "2do cuatrimestre 2025",
    status: "Aprobada",
    exclusiveReqs: [
      "2 años de antigüedad en el puesto",
      "Título de Tec. Universitaria en Informática (o afines)"
    ],
    desiredReqs: [
      "Manejo de entornos ágiles",
      "Experiencia en gestión de proyectos"
    ]
  });
  const [jobApplication, setJobApplication] = useState({});
  const [newExclusiveReq, setNewExclusiveReq] = useState("");
  const [newDesiredReq, setNewDesiredReq] = useState("");

  const getUserClaim = () => {
    const claims = JwtService.getClaims();
    return {
      name: `${claims.firstName}, ${claims.lastName}`,
      role: `${claims.roles}`
    }
  }

  const exclusiveOptions = [
    "Título universitario en Informática",
    "2 años de experiencia docente",
    "Publicaciones en el área",
    "Certificaciones relevantes"
  ];

  const handleAddExclusiveReq = () => {
    if (newExclusiveReq) {
      setJobApp(prev => ({
        ...prev,
        exclusiveReqs: [...prev.exclusiveReqs, newExclusiveReq]
      }));
      setNewExclusiveReq("");
    }
  };

  const handleAddDesiredReq = () => {
    if (newDesiredReq) {
      setJobApp(prev => ({
        ...prev,
        desiredReqs: [...prev.desiredReqs, newDesiredReq]
      }));
      setNewDesiredReq("");
    }
  };

  const handleRemoveReq = (list, index) => {
    if (list === 'exclusive') {
      setJobApp(prev => ({
        ...prev,
        exclusiveReqs: prev.exclusiveReqs.filter((_, i) => i !== index)
      }));
    } else {
      setJobApp(prev => ({
        ...prev,
        desiredReqs: prev.desiredReqs.filter((_, i) => i !== index)
      }));
    }
  };

  const handleSaveChanges = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saved changes:", jobApp);
    setIsEditing(false);
  };

  useEffect(() => {
    // Buscar los datos por ID usando ese id
  }, [id]);

  return (
    <div className="home-container">
      <Header
        user={getUserClaim()}
        navItems={["Gestión de Postulaciones", "Otras opciones", "Opción 2", "Opción 3"]}
      />

      <div className="app-container">
        <div className="view-jobapp-header">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>

          <div className="jobapp-actions">
            <button
              className="action-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancelar edición" : "Editar requisitos"}
            </button>
            {isEditing && (
              <button
                className="action-button primary"
                onClick={handleSaveChanges}
              >
                Guardar cambios
              </button>
            )}
          </div>
        </div>

        <h1>{jobApp.title}</h1>

        <div className="jobapp-info">
          <div className="info-row">
            <span className="label">Tipo de docente:</span>
            <span className="value">{jobApp.type}</span>
          </div>
          <div className="info-row">
            <span className="label">Período de búsqueda:</span>
            <span className="value">{jobApp.period}</span>
          </div>
          <div className="info-row">
            <span className="label">Estado:</span>
            <span className="value">{jobApp.status}</span>
          </div>
        </div>

        <div className="requirements-section">
          <h2>Requisitos excluyentes</h2>
          <ul className="requirements-list">
            {jobApp.exclusiveReqs.map((req, index) => (
              <li key={index}>
                {req}
                {isEditing && (
                  <button
                    className="remove-req"
                    onClick={() => handleRemoveReq('exclusive', index)}
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}
          </ul>

          {isEditing && (
            <div className="add-req-container">
              <select
                value={newExclusiveReq}
                onChange={(e) => setNewExclusiveReq(e.target.value)}
                className="form-input"
              >
                <option value="">Seleccione un requisito</option>
                {exclusiveOptions.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
              <button
                className="add-req-button"
                onClick={handleAddExclusiveReq}
                disabled={!newExclusiveReq}
              >
                +
              </button>
            </div>
          )}
        </div>

        <div className="requirements-section">
          <h2>Valoraciones / Deseables</h2>
          <ul className="requirements-list">
            {jobApp.desiredReqs.map((req, index) => (
              <li key={index}>
                {isEditing ? (
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => {
                      const updated = [...jobApp.desiredReqs];
                      updated[index] = e.target.value;
                      setJobApp(prev => ({
                        ...prev,
                        desiredReqs: updated
                      }));
                    }}
                    className="editable-req"
                  />
                ) : (
                  req
                )}
                {isEditing && (
                  <button
                    className="remove-req"
                    onClick={() => handleRemoveReq('desired', index)}
                  >
                    ✕
                  </button>
                )}
              </li>
            ))}
          </ul>

          {isEditing && (
            <div className="add-req-container">
              <input
                type="text"
                value={newDesiredReq}
                onChange={(e) => setNewDesiredReq(e.target.value)}
                className="form-input"
                placeholder="Agregar valoración/requisito deseable"
              />
              <button
                className="add-req-button"
                onClick={handleAddDesiredReq}
                disabled={!newDesiredReq}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}