import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ToastContext } from '../../../context/ToastContext';
import './emailpass.css';

export default function EmailPass({ onBack }) {
  const { 
    register, 
    handleSubmit, 
    watch,
    formState: { errors } 
  } = useForm();
  
  const { showToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const password = watch("password"); // Watches password field

  const handleFormSubmit = (data) => {
    const completeUser = {
      ...JSON.parse(localStorage.getItem('registrationData')),
      email: data.email,
      password: data.password
    };
    
    localStorage.setItem('currentUser', JSON.stringify(completeUser));
    localStorage.removeItem('registrationData');
    
    showToast('Registro completado exitosamente', 'success');
    navigate('/dashboard');
  };

  return (
    <div className="emailpass-modal">
      <div className="modal-header">
        <h1>Crear credenciales</h1>
      </div>
      
      <div className="form-scroll-container">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Email Field */}
          <div className="form-group">
            <label>Correo electrónico*</label>
            <input
              type="email"
              {...register("email", { 
                required: "Campo obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Correo inválido"
                }
              })}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label>Contraseña*</label>
            <input
              type="password"
              {...register("password", { 
                required: "Campo obligatorio",
                minLength: {
                  value: 8,
                  message: "Mínimo 8 caracteres"
                },
                pattern: {
                  value:  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/,
                  message: "Debe contener al menos 1 letra, 1 número y 1 carácter especial"
                }
              })}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label>Confirmar contraseña*</label>
            <input
              type="password"
              {...register("confirmPassword", { 
                required: "Campo obligatorio",
                validate: value => 
                  value === password || "Las contraseñas no coinciden"
              })}
              className={errors.confirmPassword ? 'error' : ''}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword.message}</span>
            )}
          </div>
        </form>
      </div>

      <div className="form-actions">
        <button type="button" className="back-button" onClick={onBack}>
          ← Volver
        </button>
        <button 
          type="submit" 
          className="submit-button"
          onClick={handleSubmit(handleFormSubmit)}
        >
          Completar Registro
        </button>
      </div>
    </div>
  );
}