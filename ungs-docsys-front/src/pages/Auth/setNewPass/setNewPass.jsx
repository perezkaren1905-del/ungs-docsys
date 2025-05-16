import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./setNewPass.css";
import userData from "../../../data/users.json";
import { ToastContext } from "../../../context/ToastContext";

export default function SetNewPass() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasLetter && hasMinLength && hasNumber && hasSpecialChar;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      showToast("Por favor complete todos los campos", "warning");
      return;
    }

    if (!validatePassword(newPassword)) {
      showToast(
        "La contraseña debe tener al menos 8 caracteres, 1 letra, 1 número y 1 caracter especial",
        "error"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Las contraseñas no coinciden", "error");
      return;
    }
    showToast("Contraseña actualizada correctamente", "success");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>
        &lt; Volver
      </button>
      <div className="title">
        <h2>Por favor, ingrese una nueva contraseña</h2>
        <h3>
          Deberá tener al menos 8 caracteres, 1 letra, 1 número y 1 caracter
          especial
        </h3>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nueva contraseña"
            required
          />
          <h3>Repita la contraseña</h3>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repetir contraseña"
            required
          />
        </div>
        <div className="buttons-section">
          <button type="submit" className="login-button">
            Cambiar contraseña
          </button>
        </div>
      </form>
    </div>
  );
}
