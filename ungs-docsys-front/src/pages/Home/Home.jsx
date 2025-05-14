import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ToastContext } from "../../context/ToastContext";
import Header from "../../components/UI/Header";
import "../../assets/styles/Home.css";

export default function Home() {
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();

  // Example user data - you can fetch this from your auth context or API
  const currentUser = {
    name: "Doe, John",
    role: "Reclutador",
  };

  // Example navigation items
  const navItems = [
    "Gestión de Postulaciones", 
    "Otras opciones",
    "Opción 2",
    "Opción 3",
  ];

  return (
    <div className="home-container">
      <Header user={currentUser} navItems={navItems} />
      <div className="app-container">
        <h1>Bienvenido, John</h1>
        <p>Selecciona una opción</p>
      </div>
    </div>
  );
}
