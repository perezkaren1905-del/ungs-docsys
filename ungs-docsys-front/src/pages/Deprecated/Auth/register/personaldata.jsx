import { useForm } from 'react-hook-form';
import './personaldata.css';

export default function PersonalData({ userType, onNext, onBack, onClose }) {
  const { 
    register, 
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      tipoDocumento: "DNI"
    }
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <div className="personaldata-modal">
      <div className="modal-header">
        <button className="close-button" onClick={onClose}>×</button>
        <h1>Ingresá tus datos personales</h1>
      </div>
      
      <div className="form-scroll-container">
        <form onSubmit={handleSubmit(onSubmit)} className="personaldata-form">
          <div className="form-grid">
            {/* Nombre */}
            <div className="form-group">
              <label>Nombre*</label>
              <input
                {...register("nombre", { 
                  required: "Campo obligatorio",
                  minLength: {
                    value: 2,
                    message: "Mínimo 2 caracteres"
                  }
                })}
                className={errors.nombre ? 'error' : ''}
              />
              {errors.nombre && (
                <span className="error-message">{errors.nombre.message}</span>
              )}
            </div>

            {/* Apellido */}
            <div className="form-group">
              <label>Apellido*</label>
              <input
                {...register("apellido", { 
                  required: "Campo obligatorio",
                  minLength: {
                    value: 2,
                    message: "Mínimo 2 caracteres"
                  }
                })}
                className={errors.apellido ? 'error' : ''}
              />
              {errors.apellido && (
                <span className="error-message">{errors.apellido.message}</span>
              )}
            </div>

            {/* Tipo Documento */}
            <div className="form-group">
              <label>Tipo de Documento*</label>
              <select {...register("tipoDocumento")}>
                <option value="DNI">DNI</option>
                <option value="LC">LC</option>
                <option value="LE">LE</option>
              </select>
            </div>

            {/* N° Documento */}
            <div className="form-group">
              <label>N° de Documento*</label>
              <input
                {...register("documento", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Solo números permitidos"
                  }
                })}
                className={errors.documento ? 'error' : ''}
              />
              {errors.documento && (
                <span className="error-message">{errors.documento.message}</span>
              )}
            </div>

            {/* Teléfono */}
            <div className="form-group">
              <label>Teléfono</label>
              <input
                {...register("telefono", {
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Solo números permitidos"
                  }
                })}
                className={errors.telefono ? 'error' : ''}
              />
              {errors.telefono && (
                <span className="error-message">{errors.telefono.message}</span>
              )}
            </div>

            {/* Fecha Nacimiento */}
            <div className="form-group">
              <label>Fecha de nacimiento</label>
              <input type="date" {...register("fechaNacimiento")} />
            </div>

            {/* Nacionalidad */}
            <div className="form-group">
              <label>Nacionalidad</label>
              <input {...register("nacionalidad")} />
            </div>
          </div>
        </form>
      </div>

      <div className="form-actions">
        <button 
          type="button" 
          className="back-button"
          onClick={onBack}
        >
          ← Volver
        </button>
        <button 
          type="submit" 
          className="submit-button"
          onClick={handleSubmit(onSubmit)}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}