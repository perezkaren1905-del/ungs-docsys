import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/UI/Header";
import "../../../assets/styles/Home.css";

export default function LoadResume() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (!file) return;
    // Here you would typically upload the file to your backend
    console.log("Uploading file:", file.name);
    // navigate("/success-page"); // Uncomment to navigate after upload
  };

  return (
    <div className="home-container">
      <Header 
        user={{ name: "Doe, Jane", role: "Postulante" }} 
        navItems={["Gestión de Currículum", "Mis Postulaciones", "Opción 2", "Opción 3"]}
      />
      
      <div className="app-container">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </button>
        
        <h1>Cargar Currículum</h1>
        
        <div 
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="file-info">
              <strong>PDF</strong>
              <p>{file.name}</p>
              <p>Tamaño: {(file.size / (1024 * 1024)).toFixed(2)}MB</p>
            </div>
          ) : (
            <>
              <p>Arrastre su curriculum en formato .PDF aquí</p>
              <p>Tamaño máximo: 50MB</p>
            </>
          )}
        </div>
        
        <div className="file-selector">
          <p>O bien, <label htmlFor="file-upload" className="file-upload-label">Seleccione archivo .PDF manualmente.</label></p>
          <input
            id="file-upload"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="file-input"
          />
        </div>
        
        <button
          className={`update-button ${!file ? 'disabled' : ''}`}
          onClick={handleSubmit}
          disabled={!file}
        >
          Actualizar curriculum
        </button>
      </div>
    </div>
  );
}