import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/UI/Header";
import "../../../assets/styles/Home.css";

export default function ResumeManagement() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [resume, setResume] = useState({
    personalData: {
      nombre: "Jane",
      apellido: "Doe",
      tipoDocumento: "DNI",
      numeroDocumento: "123456789",
      cuit: "20-123456789-0",
      fechaNacimiento: "1/2/1998",
      nacionalidad: "Argentina"
    },
    contacto: {
      telefono: "11 22345678",
      email: "janedoe@gmail.com",
      linkedin: "linkedin.com/jane-doe",
      direccion: "Calle A 123, Capital Federal, Buenos Aires, Argentina"
    },
    experiencia: [
      {
        puesto: "Profesora de Matemática",
        compania: "Universidad Nacional de La Matanza",
        descripcion: "Materias dictadas: Matemática Discreta y Lógica y Teoría de Números",
        inicio: "7/3/2021",
        fin: "18/12/2024"
      },
      {
        puesto: "Cajera",
        compania: "McDonald's",
        descripcion: "Atención al cliente, cierre de caja",
        inicio: "1/1/1998",
        fin: "1/1/2004"
      }
    ],
    formacion: [
      {
        institucion: "Universidad Nacional de General Sarmiento",
        nivel: "Universitario",
        titulo: "Profesorado de Matemática",
        campoEstudio: "No especifica"
      },
      {
        institucion: "Universidad Nacional de Luján",
        nivel: "Terciario",
        titulo: "Tecnicatura en Informática",
        campoEstudio: "Orientación a objetos"
      }
    ],
    certificados: [
      {
        nombre: "Asistencia a Congreso de Matemática",
        fechaEmision: "19/10/2023",
        fechaVencimiento: "No especifica",
        enlace: "congressomatematica.com"
      }
    ],
    habilidades: [
      {
        nombre: "Lenguaje R",
        nivel: "Avanzado"
      }
    ],
    idiomas: [
      {
        nombre: "Alemán",
        nivel: "Nativo"
      },
      {
        nombre: "Inglés",
        nivel: "C2"
      }
    ]
  });

  const [newItem, setNewItem] = useState({
    section: "",
    data: {}
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      // Reset new item form when canceling edit
      setNewItem({ section: "", data: {} });
    }
  };

  const handleSaveChanges = () => {
    // Save changes to backend here
    console.log("Resume saved:", resume);
    setIsEditing(false);
  };

  const handleInputChange = (section, index, field, value) => {
    const updatedResume = { ...resume };
    updatedResume[section][index][field] = value;
    setResume(updatedResume);
  };

  const handleAddItem = (section) => {
    const emptyItem = {
      experiencia: { puesto: "", compania: "", descripcion: "", inicio: "", fin: "" },
      formacion: { institucion: "", nivel: "", titulo: "", campoEstudio: "" },
      certificados: { nombre: "", fechaEmision: "", fechaVencimiento: "", enlace: "" },
      habilidades: { nombre: "", nivel: "" },
      idiomas: { nombre: "", nivel: "" }
    }[section];

    setResume(prev => ({
      ...prev,
      [section]: [...prev[section], emptyItem]
    }));
  };

  const handleRemoveItem = (section, index) => {
    setResume(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const renderSection = (title, sectionKey, fields) => {
    return (
      <div className="resume-section">
        <h2>{title}</h2>
        {resume[sectionKey].map((item, index) => (
          <div key={index} className="resume-item">
            {fields.map(field => (
              <div key={field.key} className="resume-field">
                <span className="field-label">{field.label}:</span>
                {isEditing && sectionKey !== 'personalData' && sectionKey !== 'contacto' ? (
                  <input
                    type="text"
                    value={item[field.key]}
                    onChange={(e) => handleInputChange(sectionKey, index, field.key, e.target.value)}
                    className="editable-field"
                  />
                ) : (
                  <span className="field-value">{item[field.key]}</span>
                )}
              </div>
            ))}
            {isEditing && sectionKey !== 'personalData' && sectionKey !== 'contacto' && (
              <button 
                className="remove-button"
                onClick={() => handleRemoveItem(sectionKey, index)}
              >
                ✕ Eliminar
              </button>
            )}
          </div>
        ))}
        {isEditing && sectionKey !== 'personalData' && sectionKey !== 'contacto' && (
          <button 
            className="add-button"
            onClick={() => handleAddItem(sectionKey)}
          >
            + Agregar {title.toLowerCase()}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="home-container">
      <Header 
        user={{ name: "Doe, Jane", role: "Postulante" }} 
        navItems={["Gestión de Curriculum", "Otras opciones", "Opción 2", "Opción 3"]}
      />
      
      <div className="app-container">
        <div className="resume-header">
          <h1>Gestión de Currículum</h1>
          <p>Agregue información a su currículum manualmente, o bien cargando su CV en formato .PDF</p>
          
          <div className="resume-actions">
            <button 
              className="action-button"
              onClick={handleEditToggle}
            >
              {isEditing ? "Cancelar edición" : "Editar datos"}
            </button>
            <button
              className={`action-button ${isEditing ? "primary" : "secondary"}`}
              onClick={isEditing ? handleSaveChanges : () => navigate("/loadResume")}
            >
              {isEditing ? "Guardar cambios" : "Cargar CV"}
            </button>
          </div>
        </div>

        {/* Personal Data - Non-editable */}
        <div className="resume-section">
          <h2>Datos personales</h2>
          <div className="personal-data-grid">
            <div className="personal-data-field">
              <span className="field-label">Nombre:</span>
              <span className="field-value">{resume.personalData.nombre}</span>
            </div>
            <div className="personal-data-field">
              <span className="field-label">Apellido:</span>
              <span className="field-value">{resume.personalData.apellido}</span>
            </div>
            <div className="personal-data-field">
              <span className="field-label">Tipo de documento:</span>
              <span className="field-value">{resume.personalData.tipoDocumento}</span>
            </div>
            <div className="personal-data-field">
              <span className="field-label">N° de documento:</span>
              <span className="field-value">{resume.personalData.numeroDocumento}</span>
            </div>
            <div className="personal-data-field">
              <span className="field-label">CUIT:</span>
              <span className="field-value">{resume.personalData.cuit}</span>
            </div>
            <div className="personal-data-field">
              <span className="field-label">Fecha de nacimiento:</span>
              <span className="field-value">{resume.personalData.fechaNacimiento}</span>
            </div>
            <div className="personal-data-field">
              <span className="field-label">Nacionalidad:</span>
              <span className="field-value">{resume.personalData.nacionalidad}</span>
            </div>
          </div>
        </div>
        {/* Contact Info - Editable */}
        <div className="resume-section">
          <h2>Contacto</h2>
          <div className="contact-info-grid">
            {Object.entries(resume.contacto).map(([key, value]) => (
              <div key={key} className="contact-field">
                <span className="field-label">
                  {key.charAt(0).toUpperCase() + key.slice(1)}:
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => {
                      const updated = { ...resume.contacto, [key]: e.target.value };
                      setResume(prev => ({ ...prev, contacto: updated }));
                    }}
                    className="editable-field"
                  />
                ) : (
                  <span className="field-value">{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Render editable sections */}
        {renderSection("Experiencia Laboral", "experiencia", [
          { key: "puesto", label: "Nombre del puesto" },
          { key: "compania", label: "Compañía" },
          { key: "descripcion", label: "Descripción" },
          { key: "inicio", label: "Fecha inicio" },
          { key: "fin", label: "Fecha cese" }
        ])}

        {renderSection("Formación Académica", "formacion", [
          { key: "institucion", label: "Institución" },
          { key: "nivel", label: "Nivel" },
          { key: "titulo", label: "Título" },
          { key: "campoEstudio", label: "Campo de estudio" }
        ])}

        {renderSection("Certificados", "certificados", [
          { key: "nombre", label: "Nombre" },
          { key: "fechaEmision", label: "Fecha de emisión" },
          { key: "fechaVencimiento", label: "Fecha de vencimiento" },
          { key: "enlace", label: "Enlace" }
        ])}

        {renderSection("Habilidades Técnicas", "habilidades", [
          { key: "nombre", label: "Nombre" },
          { key: "nivel", label: "Nivel" }
        ])}

        {renderSection("Idiomas", "idiomas", [
          { key: "nombre", label: "Nombre" },
          { key: "nivel", label: "Nivel" }
        ])}
      </div>
    </div>
  );
}