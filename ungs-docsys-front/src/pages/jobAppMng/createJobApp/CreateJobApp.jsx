import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../../../components/UI/Header";
import './create-job-app.css';
import "../../../assets/styles/Home.css";
import { JwtService } from "../../../commons/utils/jwt.service";
import { JobProfileLevelsService } from "../../../commons/services/job-profile-levels.service";
import { JobApplicationPeriodsService } from "../../../commons/services/job-application-periods.service";
import { RequirementTargetComparatorsService } from "../../../commons/services/requirement-target-comparators.service";
import { RequirementTypesService } from "../../../commons/services/requirement-types.service";
import { JobApplicationsService } from "../../../commons/services/job-applications.service";

export default function CreateJobApp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [jobProfileLevels, setJobProfileLevels] = useState([]);
  const [jobApplicationPeriods, setJobApplicationPeriods] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [requirementTypes, setRequirementTypes] = useState([]);
  const [requirementTargetComparators, setRequirementTargetComparators] = useState([]);

  const handleAddRequirement = () => {
    setRequirements(prev => [
      ...prev,
      {
        description: "",
        expectedValue: "",
        requirementTypeId: "",
        requirementTargetComparatorId: "",
        operator: ""
      }
    ]);
  };

  const handleSaveJobApplication = async (data) => {
    const requirementsRequest = requirements.map(requirement => {
      return {
        description: requirement.description,
        expectedValue: requirement.expectedValue,
        requirementTypeId: Number(requirement.requirementTypeId),
        requirementTargetComparatorId: Number(requirement.requirementTargetComparatorId),
        operator: requirement.operator
      }
    })
    const request = {
      title: data.title,
      description: data.description,
      jobApplicationPeriodId: Number(data.jobApplicationPeriodId),
      minApprovers: 1,
      reason: data.reason,
      yearPeriod: data.yearPeriod,
      jobProfileLevelId: Number(data.jobProfileLevelId),
      requirements: requirementsRequest
    };
    try {
      await JobApplicationsService.create(request);
      navigate("/jobAppList");
    } catch (error) {
      console.log(error);
    }
    console.log(JSON.stringify(request));
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

  const fetchRequirementTargetComparators = async () => {
    try {
      const requirementTargetComparatorsResponse = await RequirementTargetComparatorsService.getAll();
      setRequirementTargetComparators(requirementTargetComparatorsResponse);
    } catch (error) {
      console.error(error);
      setRequirementTargetComparators([]);
    }
  };

  const fetchRequirementTypes = async () => {
    try {
      const requirementTypesResponse = await RequirementTypesService.getAll();
      setRequirementTypes(requirementTypesResponse);
    } catch (error) {
      console.error(error);
      setRequirementTypes([]);
    }
  };

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
  }, []);

  useEffect(() => {
    fetchJobApplicationPeriods();
    fetchJobProfileLevels();
    fetchRequirementTargetComparators();
    fetchRequirementTypes();
  }, []);

  return (
    <div className="home-container">
      <Header
        user={getUserClaim()}
      />

      <div className="app-container">
        <div className="view-jobapp-header">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
          >
            ← Volver
          </button>
        </div>

        <form onSubmit={handleSubmit(handleSaveJobApplication)}>
          <div className="jobapp-info">
            <div className="info-row">
              <span className="label">Materia:</span>
              <input
                type="text"
                name="course"
                className="form-input"
                placeholder="Nombre la materia"
                {...register("title", { required: "Campo obligatorio" })}
              />
            </div>
            <div className="info-row">
              <span className="label">Tipo de docente:</span>
              <select
                name="position"
                className="form-input"
                {...register("jobProfileLevelId", { required: "Campo obligatorio" })}
              >
                <option value="" disabled hidden>Seleccione una opción</option>
                {jobProfileLevels.map(jobProfileLevel => (
                  <option key={jobProfileLevel.id} value={jobProfileLevel.id}>{`${jobProfileLevel.level}, ${jobProfileLevel.description}`}</option>
                ))}
              </select>
            </div>
            <div className="info-row">
              <span className="label">Período de búsqueda:</span>
              <input
                type="number"
                name="yearPeriod"
                className="form-input"
                placeholder="Escriba el año"
                {...register("yearPeriod", {
                  required: "Campo obligatorio",
                  valueAsNumber: true,
                  min: { value: 0, message: "No puede ser negativo" },
                })}
              />
              <select
                name="period"
                className="form-input"
                {...register("jobApplicationPeriodId", { required: "Campo obligatorio" })}
              >
                <option value="" disabled hidden>Seleccione una opción</option>
                {jobApplicationPeriods.map(jobApplicationPeriod => (
                  <option key={jobApplicationPeriod.id} value={jobApplicationPeriod.id}>{jobApplicationPeriod.description}</option>
                ))}
              </select>
            </div>

          </div>

          <h2 style={{ textAlign: 'center', color: 'black' }}>Descripción</h2>
          <div className="jobapp-info">
            <div className="info-row">
              <textarea
                name="description"
                className="form-textarea"
                rows={4}
                placeholder="Describa los detalles de la postulación..."
                {...register("description", { required: "Campo obligatorio" })}
              />
            </div>
          </div>

          <h2 style={{ textAlign: 'center', color: 'black' }}>¿Por qué desea abrir esta postulación?</h2>
          <div className="jobapp-info">
            <div className="info-row">
              <textarea
                name="motivation"
                className="form-textarea"
                rows={4}
                placeholder="Escriba su razón aquí"
                {...register("reason", { required: "Campo obligatorio" })}
              />
            </div>
          </div>

          <div className="form-group">
            <h3>Requerimientos</h3>

            {requirements.map((req, index) => (
              <div key={index} className="requirement-row">
                <input
                  type="text"
                  placeholder="Descripción"
                  value={req.description}
                  onChange={(e) => handleRequirementChange(index, "description", e.target.value)}
                  className="form-input"
                />

                <input
                  type="text"
                  placeholder="Valores comparativos"
                  value={req.expectedValue}
                  onChange={(e) => handleRequirementChange(index, "expectedValue", e.target.value)}
                  className="form-input"
                />

                <select
                  value={req.operator}
                  onChange={(e) => handleRequirementChange(index, "operator", e.target.value)}
                  className="form-input"
                >
                  <option value="" disabled>Operador</option>
                  <option value="INCLUDES">Incluye</option>
                  <option value="NOT_INCLUDES">No incluye</option>
                </select>

                <select
                  value={req.requirementTargetComparatorId}
                  onChange={(e) => handleRequirementChange(index, "requirementTargetComparatorId", e.target.value)}
                  className="form-input"
                >
                  <option value="" disabled>Tipo de comparación</option>
                  {requirementTargetComparators.map(requirementTargetComparator => (
                    <option key={requirementTargetComparator.id} value={requirementTargetComparator.id}>{requirementTargetComparator.description}</option>
                  ))}
                </select>

                <select
                  value={req.requirementTypeId}
                  onChange={(e) => handleRequirementChange(index, "requirementTypeId", e.target.value)}
                  className="form-input"
                >
                  <option value="" disabled>Tipo de requisito</option>
                  {requirementTypes.map(requirementType => (
                    <option key={requirementType.id} value={requirementType.id}>{requirementType.description}</option>
                  ))}
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
            >
              Crear postulación
            </button>
          </div>

        </form>

      </div>
    </div>

  );
}

{/*
  <div className="home-container">
      <Header
        user={getUserClaim()}
        navItems={["Gestión de Postulaciones", "Otras opciones", "Opción 2", "Opción 3"]}
      />

      <div className="app-container">
        <h1>Nueva postulación</h1>
        <p>Agregue los datos generales de su postulación</p>

        <form onSubmit={handleSubmit(handleSaveJobApplication)} className="create-form">
          <div className="form-group">
            <label>Tipo de docente:</label>
            <select
              name="position"
              className="form-input"
              {...register("jobProfileLevelId", { required: "Campo obligatorio" })}
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
              className="form-input"
              placeholder="Escriba la materia"
              {...register("title", { required: "Campo obligatorio" })}
            />
          </div>

          <div className="form-group">
            <label>Período de búsqueda</label>
            <input
              type="number"
              name="yearPeriod"
              className="form-input"
              placeholder="Escriba el año"
              {...register("yearPeriod", {
                required: "Campo obligatorio",
                valueAsNumber: true,
                min: { value: 0, message: "No puede ser negativo" },
              })}
            />
            <select
              name="period"
              className="form-input"
              {...register("jobApplicationPeriodId", { required: "Campo obligatorio" })}
            >
              <option value="" disabled hidden>Seleccione una opción</option>
              {jobApplicationPeriods.map(jobApplicationPeriod => (
                <option key={jobApplicationPeriod.id} value={jobApplicationPeriod.id}>{jobApplicationPeriod.description}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              className="form-textarea"
              rows={4}
              placeholder="Describa los detalles de la postulación..."
              {...register("description", { required: "Campo obligatorio" })}
            />
          </div>

          <div className="form-group">
            <label>¿Por qué desea abrir esta postulación?</label>
            <textarea
              name="motivation"
              className="form-textarea"
              rows={4}
              placeholder="Escriba su razón aquí"
              {...register("reason", { required: "Campo obligatorio" })}
            />
          </div>

          <div className="form-group">
            <h3>Requerimientos</h3>

            {requirements.map((req, index) => (
              <div key={index} className="requirement-row">
                <input
                  type="text"
                  placeholder="Descripción"
                  value={req.description}
                  onChange={(e) => handleRequirementChange(index, "description", e.target.value)}
                  className="form-input"
                />

                <input
                  type="text"
                  placeholder="Valores comparativos"
                  value={req.expectedValue}
                  onChange={(e) => handleRequirementChange(index, "expectedValue", e.target.value)}
                  className="form-input"
                />

                <select
                  value={req.operator}
                  onChange={(e) => handleRequirementChange(index, "operator", e.target.value)}
                  className="form-input"
                >
                  <option value="" disabled>Operador</option>
                  <option value="INCLUDES">Incluye</option>
                  <option value="NOT_INCLUDES">No incluye</option>
                </select>

                <select
                  value={req.requirementTargetComparatorId}
                  onChange={(e) => handleRequirementChange(index, "requirementTargetComparatorId", e.target.value)}
                  className="form-input"
                >
                  <option value="" disabled>Tipo de comparación</option>
                  {requirementTargetComparators.map(requirementTargetComparator => (
                    <option key={requirementTargetComparator.id} value={requirementTargetComparator.id}>{requirementTargetComparator.description}</option>
                  ))}
                </select>

                <select
                  value={req.requirementTypeId}
                  onChange={(e) => handleRequirementChange(index, "requirementTypeId", e.target.value)}
                  className="form-input"
                >
                  <option value="" disabled>Tipo de requisito</option>
                  {requirementTypes.map(requirementType => (
                    <option key={requirementType.id} value={requirementType.id}>{requirementType.description}</option>
                  ))}
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
            >
              Crear postulación
            </button>
          </div>

        </form>
      </div>
    </div>
  */}