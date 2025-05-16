import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import { NationalititesService } from "../../../commons/services/nationalities.service";

export default function SignUp() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tipoDocumento: "DNI",
    },
  });

  const [fecha, setFecha] = useState("");
  const [nationalities, setNationalities] = useState([]);
  const [step, setStep] = useState(1);

  const onSubmit = (data) => {
    onNext(data);
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

    getAllNationalities();
  }, []);

  const handleNext = () => {
    if (step === 3) {
      window.location.href = "/home";
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handleBack = () => {
    if (step === 1) {
      window.location.href = "/";
    } else {
      setStep((prevStep) => prevStep - 1);
    }
  };

  const validateFecha = (value) => {
    if (!value) {
      return "La fecha es obligatoria.";
    }
    return true;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
      <button className="back-button" onClick={handleBack}>
        &lt; Volver
      </button>
      {step === 1 && (
        <div className="step-1-container">
          <h1>¿Con qué objetivo vas a registrarte?</h1>
          <div className="option-buttons-row">
            <button
              className="option-button"
              type="button"
              onClick={handleNext}
            >
              Gestionar las vacantes de trabajo
            </button>
            <button
              className="option-button"
              type="button"
              onClick={handleNext}
            >
              Buscar y postularte a vacantes de trabajo
            </button>
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
                className={errors.firstName ? "input-error" : ""}
                type="text"
                {...register("firstName", { required: "Campo obligatorio" })}
              />
            </div>

            <div className="form-group">
              <label>Apellido</label>
              <input
                className={errors.lastName ? "input-error" : ""}
                type="text"
                {...register("lastName", { required: "Campo obligatorio" })}
              />
            </div>

            <div className="form-group">
              <label>Tipo de Documento</label>
              <select
                className={errors.documentNumber ? "input-error" : ""}
                {...register("documentType", { required: "Campo obligatorio" })}
              >
                <option value="">Seleccione</option>
                <option value="dni">DNI</option>
                <option value="pasaporte">Pasaporte</option>
              </select>
            </div>

            <div className="form-group">
              <label>N° de Documento</label>
              <input
                className={errors.documentNumber ? "input-error" : ""}
                type="text"
                {...register("documentNumber", {
                  required: "Campo obligatorio",
                })}
              />
            </div>

            <div className="form-group">
              <label>CUIL</label>
              <input
                className={errors.cuil ? "input-error" : ""}
                type="text"
                {...register("cuil", { required: "Campo obligatorio" })}
              />
            </div>

            <div className="form-group">
              <label>Teléfono</label>
              <input
                className={errors.phone ? "input-error" : ""}
                type="tel"
                {...register("phone", { required: "Campo obligatorio" })}
              />
            </div>

            <div className="form-group">
              <label>Fecha de nacimiento</label>
              <input
                type="text"
                className={errors.fecha ? "input-error" : ""}
                {...register("fecha", {
                  required: "La fecha es obligatoria.",
                  validate: validateFecha,
                })}
                placeholder="DD/MM/YYYY"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Nacionalidad</label>

              <select
                className={errors.nationality ? "input-error" : ""}
                {...register("nationality", { required: "Campo obligatorio" })}
              >
                <option key="000" value="000">
                  {" "}
                  Seleccione su nacionalidad
                </option>
                {nationalities.map((nationality) => (
                  <option key={nationality.code} value={nationality.code}>
                    {nationality.description}
                  </option>
                ))}
              </select>
            </div>

            <button className="next-button" type="button" onClick={handleNext}>
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
              ></input>
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
              <input type="password" placeholder="Crea una contraseña"></input>
            </div>

            <div class="form-group">
              <h3>Repetir contraseña</h3>
              <input type="password" placeholder="Repite tu contraseña"></input>
            </div>

            <button type="submit" className="login-button" onClick={handleNext}>
              Registrarme
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
