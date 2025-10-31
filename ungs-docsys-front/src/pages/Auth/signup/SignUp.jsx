import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import { NationalititesService } from "../../../commons/services/nationalities.service";
import { IdentificationTypeService } from "../../../commons/services/identification-types.service";
import { SignUpService } from "../../../commons/services/sign-up.service";

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      tipoDocumento: "DNI",
    },
  });

  const [fecha, setFecha] = useState("");
  const [nationalities, setNationalities] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [step, setStep] = useState(1);

  const onNext = async (data) => {
    console.log(JSON.stringify(data));
    if(step === 3 ) {
      const signUpRequest = {
        roleId: Number(data.roleId),
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        identificationTypeId: Number(data.identificationTypeId),
        identificationNumber: data.identificationNumber,
        cuilCuit: data.cuil,
        phone: data.phone,
        birthDate: data.birthDate,
        nationalityId: Number(data.nationalityId)
      }
      await SignUpService.signUp(signUpRequest);
      window.location.href = "/";
    } else {
      setStep((prevStep) => prevStep + 1);
    }
    console.log(step);
  };
  
  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prev) => prev - 1);
  // Validar paso 1
  const handleRole = async (roleId) => {
    setValue("roleId", roleId);
    const valid = await trigger("roleId");
    if (valid) handleNext();
  };
  // Validar paso 2
  const handleNextStep2 = async () => {
    const valid = await trigger([
      "firstName",
      "lastName",
      "identificationTypeId",
      "identificationNumber",
      "cuil",
      "phone",
      "birthDate",
      "nationalityId",
    ]);
    if (valid) handleNext();
  };

  useEffect(() => {
    const getAllNationalities = async () => {
      try {
        const data = await NationalititesService.getAll();
        setNationalities(data);
      } catch (error) {
        console.error(error);
      }
    };

    const getAllIdentificationTypes = async () => {
      try {
        const data = await IdentificationTypeService.getAll();
        setDocumentTypes(data);
      } catch (error) {
        console.error(error);
      }
    }

    getAllNationalities();
    getAllIdentificationTypes();
  }, []);

  // Observa si los campos del paso actual son válidos
  const roleId = watch("roleId");
  const step2Fields = watch([
    "firstName",
    "lastName",
    "identificationTypeId",
    "identificationNumber",
    "cuil",
    "phone",
    "birthDate",
    "nationalityId",
  ]);
  const step3Fields = watch(["email", "password", "confirmPassword"]);
  
  // Helpers para saber si los pasos están completos
  const isStep1Complete = !!roleId;
  const isStep2Complete = step2Fields.every((v) => v && v !== "" && !Object.keys(errors).length);
  const isStep3Complete = step3Fields.every((v) => v && v !== "" && !Object.keys(errors).length);
  
  const onSubmit = async (data) => {
    onNext(data);
  };

  const validateFecha = (value) => {
    if (!value) {
      return "La fecha es obligatoria.";
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="form-container">
      <button className="back-button" type="button" onClick={handleBack}>
        &lt; Volver
      </button>
      {step === 1 && (
        <div className="step-1-container">
          <h1>¿Con qué objetivo vas a registrarte?</h1>
          <div className="option-buttons-row">
            <button
              className="option-button"
              type="button"
              onClick={() => handleRole(1)}
            >
              Gestionar las vacantes de trabajo
            </button>
            <button
              className="option-button"
              type="button"
              onClick={() => handleRole(2)}
            >
              Buscar y postularte a vacantes de trabajo
            </button>
            <input
                className={errors.firstName ? "input-error" : ""}
                type="hidden"
                {...register("roleId", { required: "Campo obligatorio" })}
              />
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Ingresá tus datos personales</h2>
          <div className="form-inner">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                className={errors.firstName ? "input-error" : ""}
                {...register("firstName", {
                  required: "Campo obligatorio",
                  maxLength: { value: 150, message: "Máximo 150 caracteres" },
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "Solo se permiten letras"
                  }
                })}
              />
              {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
            </div>

            <div className="form-group">
              <label>Apellido</label>
              <input
                type="text"
                className={errors.lastName ? "input-error" : ""}
                {...register("lastName", {
                  required: "Campo obligatorio",
                  maxLength: { value: 150, message: "Máximo 150 caracteres" },
                  pattern: {
                    value: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
                    message: "Solo se permiten letras"
                  }
                })}
              />
              {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
            </div>

            <div className="form-group">
              <label>Tipo de Documento</label>
              <select
                className={errors.documentNumber ? "input-error" : ""}
                {...register("identificationTypeId", { required: "Campo obligatorio" })}
              >
                <option key="000" value="0">
                  {" "}
                  Seleccione
                </option>
                {documentTypes.map((documentType) => (
                  <option key={documentType.code} value={documentType.id}>
                    {documentType.code}
                  </option>
                ))}
              </select>
              {errors.identificationTypeId && <p className="error-text">{errors.identificationTypeId.message}</p>}
            </div>

            <div className="form-group">
              <label>N° de Documento</label>
              <input
                type="text"
                className={errors.identificationNumber ? "input-error" : ""}
                {...register("identificationNumber", {
                  required: "Campo obligatorio",
                  maxLength: { value: 50, message: "Máximo 50 caracteres" },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Solo se permiten números"
                  }
                })}
              />
              {errors.identificationNumber && <p className="error-text">{errors.identificationNumber.message}</p>}
            </div>

            <div className="form-group">
              <label>CUIL</label>
              <input
                type="text"
                className={errors.cuil ? "input-error" : ""}
                {...register("cuil", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^\d{11}$/,
                    message: "Debe contener exactamente 11 dígitos numéricos"
                  }
                })}
              />
              {errors.cuil && <p className="error-text">{errors.cuil.message}</p>}
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="tel"
                className={errors.phone ? "input-error" : ""}
                {...register("phone", {
                  required: "Campo obligatorio",
                  maxLength: { value: 50, message: "Máximo 50 caracteres" },
                  pattern: {
                    value: /^[0-9+\-\s]+$/,
                    message: "Formato inválido de teléfono"
                  }
                })}
              />
              {errors.phone && <p className="error-text">{errors.phone.message}</p>}
            </div>

            <div className="form-group">
              <label>Fecha de nacimiento</label>
              <input
                type="text"
                className={errors.birthDate ? "input-error" : ""}
                {...register("birthDate", {
                  required: "La fecha es obligatoria",
                  pattern: {
                    value: /^\d{4}-\d{2}-\d{2}$/,
                    message: "Formato inválido (YYYY-MM-DD)"
                  }
                })}
                placeholder="YYYY-MM-DD"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
              {errors.birthDate && <p className="error-text">{errors.birthDate.message}</p>}
            </div>

            <div className="form-group">
              <label>Nacionalidad</label>
              <select
                className={errors.nationality ? "input-error" : ""}
                {...register("nationalityId", { required: "Campo obligatorio" })}
              >
                <option key="000" value="0">
                  {" "}
                  Seleccione su nacionalidad
                </option>
                {nationalities.map((nationality) => (
                  <option key={nationality.code} value={nationality.id}>
                    {nationality.description}
                  </option>
                ))}
              </select>
              {errors.nationalityId && <p className="error-text">{errors.nationalityId.message}</p>}
            </div>

            <button
              className="next-button"
              type="button"
              onClick={handleNextStep2}
              disabled={!isStep2Complete}
            >
              Siguiente
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Ingresa tus datos de inicio de sesión</h2>
          <div class="container">
            <div class="form-group">
              <h3>Correo electrónico</h3>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className={errors.email ? "input-error" : ""}
                {...register("email", {
                  required: "Campo obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Formato de correo inválido"
                  }
                })}
              />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </div>

            <div class="form-group">
              <h3>Contraseña</h3>
              <div class="password-requirements">
                Deberá tener:
                <ul>
                  <li>Al menos 1 letra y un número</li>
                  <li>Al menos 8 caracteres</li>
                  <li>Al menos 1 caracter especial</li>
                </ul>
              </div>
              <input
                type="password"
                placeholder="Crea una contraseña"
                className={errors.password ? "input-error" : ""}
                {...register("password", {
                  required: "Campo obligatorio",
                  minLength: { value: 8, message: "Mínimo 8 caracteres" },
                  maxLength: { value: 255, message: "Máximo 255 caracteres" },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    message: "Debe tener al menos una letra, un número y un carácter especial"
                  }
                })}
              />
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </div>

            <div class="form-group">
              <h3>Repetir contraseña</h3>
              <input
                type="password"
                placeholder="Repite tu contraseña"
                className={errors.confirmPassword ? "input-error" : ""}
                {...register("confirmPassword", {
                  required: "Campo obligatorio",
                  validate: (value, formValues) =>
                    value === formValues.password || "Las contraseñas no coinciden"
                })}
              />
              {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              className="login-button"
              disabled={!isStep3Complete || !isValid}
            >
              Registrarme
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
