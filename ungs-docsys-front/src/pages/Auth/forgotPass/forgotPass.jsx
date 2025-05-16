import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./forgotPass.css";
import userData from "../../../data/users.json";
import { ToastContext } from "../../../context/ToastContext";

const currentUsers = JSON.parse(localStorage.getItem("users")) || userData;

export default function ForgotPass({ onClose, onForgotPassword }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const foundUser = currentUsers.users.find((user) => user.email === email);

    if (!email) {
      showToast("Por favor complete el campo", "warning");
      return;
    }

    if (foundUser) {
      localStorage.setItem("loggedInUser", email);
      showToast(
        "Se ha enviado un enlace a su e-mail para recuperar su contraseña",
        "success"
      );
      navigate("/setNewPass");
      if (onClose) onClose();
    } else {
      showToast(
        "No se ha encontrado una cuenta asociada a este e-mail",
        "error"
      );
    }
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>
        &lt; Volver
      </button>
      <div className="title">
        <h2>Por favor, ingrese el e-mail asociado a su cuenta</h2>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="buttons-section">
          <button type="submit" className="login-button">
            Recuperar contraseña
          </button>
        </div>
      </form>
    </div>
  );
}
