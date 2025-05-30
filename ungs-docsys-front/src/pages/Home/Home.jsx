import { useContext } from "react";
import { ToastContext } from "../../context/ToastContext";
import Header from "../../components/UI/Header";
import "../../assets/styles/Home.css";
import { JwtService } from "../../commons/utils/jwt.service";

export default function Home() {
  const { showToast } = useContext(ToastContext);

  // Example user data - you can fetch this from your auth context or API
  const currentUser = {

    name: "Doe, John",
    role: "Reclutador",
  };

  const getUserClaim = () => {
    const claims = JwtService.getClaims();
    return {
      name: `${claims.firstName}, ${claims.lastName}`,
      role: `${claims.roles}`
    }
  }

  // Example navigation items
  const navItems = [
    "Gestión de Postulaciones", 
    "Otras opciones",
    "Opción 2",
    "Opción 3",
  ];

  return (
    <div className="home-container">
      <Header user={getUserClaim()} navItems={navItems} />
      <div className="app-container">
        <h1>Bienvenido, {getUserClaim().name}</h1>
        <p>Selecciona una opción</p>
      </div>
    </div>
  );
}
