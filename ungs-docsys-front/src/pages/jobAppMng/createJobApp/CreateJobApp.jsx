import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/UI/Header";
import './create-job-app.css';
import "../../../assets/styles/Home.css";
import { JwtService } from "../../../commons/utils/jwt.service";
import { JobProfileLevelsService } from "../../../commons/services/job-profile-levels.service";
import { JobApplicationPeriodsService } from "../../../commons/services/job-application-periods.service";

export default function CreateJobApp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    position: "",
    course: "",
    period: "",
    motivation: ""
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [jobProfileLevels, setJobProfileLevels] = useState([]);
  const [jobApplicationPeriods, setJobApplicationPeriods] = useState([]);
  const [requirements, setRequirements] = useState([]);

  const handleAddRequirement = () => {
    setRequirements(prev => [
      ...prev,
      {
        name: "",
        description: "",
        type: "",
        priority: ""
      }
    ]);
  };

  const handleSaveJobApplication = (data) => {
    const request = {
      title: data.title,
      description: data.description,
      jobApplicationPeriodId: data.jobApplicationPeriodId,

    };
  };

  const handleRequirementChange = (index, field, value) => {
    setRequirements(prev => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const handleRemoveRequirement = (indexToRemove) => {
    const updatedRequirements = requirements.filter((_, index) => index !== indexToRemove);
    setRequirements(updatedRequirements);
  };

  const getUserClaim = () => {
    const claims = JwtService.getClaims();
    return {
      name: `${claims.firstName}, ${claims.lastName}`,
      role: `${claims.roles}`
    }
  }

  const fetchJobProfileLevels = async () => {
    try {
      const jobProfileLevelsResponse = await JobProfileLevelsService.getAll();
      setJobProfileLevels(jobProfileLevelsResponse);
    } catch (error) {
      console.error(error);
      setJobProfileLevels([]);
    }
  };

  const fetchJobApplicationPeriods = async () => {
    try {
      const jobApplicationPeriods = await JobApplicationPeriodsService.getAll();
      setJobApplicationPeriods(jobApplicationPeriods);
    } catch (error) {
      console.error(error);
      setJobApplicationPeriods([]);
    }
  };

  // Check form validity whenever formData changes
  useEffect(() => {
    const isValid =
      formData.position &&
      formData.course &&
      formData.period &&
      formData.motivation;
    setIsFormValid(!!isValid);
  }, [formData]);

  useEffect(() => {
    fetchJobApplicationPeriods();
    fetchJobProfileLevels();
  }, []);

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
        user={getUserClaim()}
        navItems={["Gestión de Postulaciones", "Otras opciones", "Opción 2", "Opción 3"]}
      />

      <div className="app-container">
        <h1>Nueva postulación</h1>
        <p>Agregue los datos generales de su postulación</p>

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label>Tipo de docente:</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="form-input"
              style={!formData.position ? { color: '#999' } : {}}
              required
            >
              <option value="" disabled hidden>Seleccione una opción</option>
              {jobProfileLevels.map(jobProfileLevel => (
                <option key={jobProfileLevel.id} value={jobProfileLevel.id}>{`${jobProfileLevel.level}, ${jobProfileLevel.description}`}</option>
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
              style={!formData.course ? { color: '#999' } : {}}
              required
            />
          </div>

          <div className="form-group">
            <label>Período de búsqueda</label>
            <input
              type="text"
              name="yearPeriod"
              value={formData.yearPeriod}
              onChange={handleChange}
              className="form-input"
              placeholder="Escriba el año"
              style={!formData.course ? { color: '#999' } : {}}
              required
            />
            <select
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="form-input"
              style={!formData.period ? { color: '#999' } : {}}
              required
            >
              <option value="" disabled hidden>Seleccione una opción</option>
              {jobApplicationPeriods.map(jobApplicationPerdiod => (
                <option key={jobApplicationPerdiod.id} value={jobApplicationPerdiod.id}>{jobApplicationPerdiod.description}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-textarea"
              rows={4}
              placeholder="Describa los detalles de la postulación..."
              style={!formData.motivation ? { color: '#999' } : {}}
              required
            />
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
              style={!formData.motivation ? { color: '#999' } : {}}
              required
            />
          </div>

          <div className="form-group">
            <h3>Requerimientos</h3>

            {requirements.map((req, index) => (
              <div key={index} className="requirement-row">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={req.name}
                  onChange={(e) => handleRequirementChange(index, "name", e.target.value)}
                  className="form-input"
                />

                <input
                  type="text"
                  placeholder="Descripción"
                  value={req.description}
                  onChange={(e) => handleRequirementChange(index, "description", e.target.value)}
                  className="form-input"
                />

                <select
                  value={req.type}
                  onChange={(e) => handleRequirementChange(index, "type", e.target.value)}
                  className="form-input"
                >
                  <option value="" disabled>Tipo</option>
                  <option value="funcional">Funcional</option>
                  <option value="tecnico">Técnico</option>
                </select>

                <select
                  value={req.priority}
                  onChange={(e) => handleRequirementChange(index, "priority", e.target.value)}
                  className="form-input"
                >
                  <option value="" disabled>Prioridad</option>
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>

                <button type="button" onClick={() => handleRemoveRequirement(index)} className="remove-button">
                  Quitar
                </button>
              </div>

            ))}

            <button type="button" onClick={handleAddRequirement} className="create-button">
              + Agregar nuevo requerimiento
            </button>
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