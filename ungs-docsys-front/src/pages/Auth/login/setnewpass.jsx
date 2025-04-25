import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContext } from "../../../context/ToastContext";
import initialUserData from "../../../data/users.json";
import "./login.css";

export default function SetNewPass() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || localStorage.getItem("resetEmail");

  const validatePassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasMinLength && hasNumber && hasSpecialChar;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      showToast("Por favor complete todos los campos", "warning");
      return;
    }

    if (!validatePassword(newPassword)) {
      showToast(
        "La contraseña debe tener al menos 8 caracteres, 1 número y 1 caracter especial",
        "error"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      showToast("Las contraseñas no coinciden", "error");
      return;
    }

    let currentUsers = JSON.parse(localStorage.getItem('users')) || initialUserData;
  
    if (Array.isArray(currentUsers)) {
      currentUsers = { users: currentUsers };
    } else if (!currentUsers.users) {
      currentUsers = { users: [] };
    }
  
    const updatedUsers = {
      users: currentUsers.users.map(user => 
        user.email === email 
          ? { ...user, password: newPassword } 
          : user
      )
    };
  
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  
    localStorage.removeItem("resetEmail");
  
    showToast("Contraseña actualizada correctamente", "success");
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="login-modal">
      <h2>Crear nueva contraseña</h2>
      <p>Por favor, ingrese una nueva contraseña para {email}</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Mínimo 8 caracteres con 1 número y 1 especial"
            required
          />
          <div className="password-requirements">
            <p>Deberá tener:</p>
            <ul>
              <li className={newPassword.length >= 8 ? "valid" : ""}>
                Al menos 8 caracteres
              </li>
              <li className={/[a-zA-Z]/.test(newPassword) ? "valid" : ""}>
                Al menos 1 letra
              </li>
              <li className={/\d/.test(newPassword) ? "valid" : ""}>
                Al menos 1 número
              </li>
              <li className={/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? "valid" : ""}>
                Al menos 1 caracter especial
              </li>
            </ul>
          </div>
        </div>

        <div className="form-group">
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme su nueva contraseña"
            required
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="error-text">Las contraseñas no coinciden</p>
          )}
        </div>

        <button type="submit" className="login-btn">
          Crear nueva contraseña
        </button>
      </form>
    </div>
  );
}
