import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/UI/Header";
import "../../../assets/styles/Home.css";
import { JwtService } from "../../../commons/utils/jwt.service";
import { useParams } from "react-router-dom";
import { JobApplicationsService } from "../../../commons/services/job-applications.service";

export default function ViewJobApp() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [jobApplication, setJobApplication] = useState({});
  const [mandatoryRequirements, setMandatoryRequirements] = useState([]);
  const [preferredRequirements, setPreferredRequirements] = useState([]);

  const getUserClaim = () => {
    const claims = JwtService.getClaims();
    return {
      name: `${claims.firstName}, ${claims.lastName}`,
      role: `${claims.roles}`
    }
  }

  const handleSaveChanges = () => {
    setIsEditing(false);
  };

  const fetchJobApplication = async () => {
      try {
        const jobApplicationResponse = await JobApplicationsService.getById(id);
        if (!jobApplicationResponse?.requirements) return;
        const { mandatory, preferred } = jobApplicationResponse.requirements.reduce(
          (acc, req) => {
            if (req.requirementType.name === "MANDATORY") acc.mandatory.push(req);
            else if (req.requirementType.name === "PREFERRED") acc.preferred.push(req);
            return acc;
          },
          { mandatory: [], preferred: [] }
        );

        setJobApplication(jobApplicationResponse);
        setMandatoryRequirements(mandatory);
        setPreferredRequirements(preferred);
      } catch(error) {
        console.error(error);
        setJobApplication({});
      }
    };

  useEffect(() => {
    fetchJobApplication();
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

        <h1 style={{textAlign: 'center'}}>{jobApplication.title}</h1>

        

        <div className="jobapp-info">
          <div className="info-row">
            <span className="label">Tipo de docente:</span>
            <span className="value">{`${jobApplication.jobProfileLevel?.level}, ${jobApplication.jobProfileLevel?.description}`}</span>
          </div>
          <div className="info-row">
            <span className="label">Período de búsqueda:</span>
            <span className="value">{jobApplication.jobApplicationPeriod?.description}</span>
          </div>
          <div className="info-row">
            <span className="label">Estado:</span>
            <span className="value">{jobApplication.jobApplicationStatus?.description}</span>
          </div>
          
        </div>

        <h2 style={{textAlign: 'center'}}>Descripción</h2>
        <div className="jobapp-info">
          <div className="info-row">
            
            <span className="value">{jobApplication.description}</span>
          </div>
          
        </div>

        <div className="requirements-section">
          <h2>Requisitos excluyentes</h2>
          <ul className="requirements-list">
            {mandatoryRequirements.map((req, index) => (
              <li key={index}>
                {req.description}
              </li>
            ))}
          </ul>
        </div>

        <div className="requirements-section">
          <h2>Valoraciones / Deseables</h2>
          <ul className="requirements-list">
            {preferredRequirements.map((req, index) => (
              <li key={index}>
                {req.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}