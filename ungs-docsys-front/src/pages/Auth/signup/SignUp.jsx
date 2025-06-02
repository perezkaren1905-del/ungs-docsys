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
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      tipoDocumento: "DNI",
    },
  });

  const [fecha, setFecha] = useState("");
  const [nationalities, setNationalities] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [step, setStep] = useState(1);
  const [isGestionarVacantes, setIsGestionarVacantes] = useState(null);

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

  const onSubmit = async (data) => {
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

  const handleNext = () => {
    if (step === 3) {
      if (!isGestionarVacantes) {
        navigate("/viewResume")
      }
      else {
        navigate("/jobAppList");
      }
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };
  const handleBack = () => {
    if (step === 1) {
      navigate("/");
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

  const handleRole = (roleId) => {
    setValue("roleId", roleId);
    setStep((prevStep) => prevStep + 1);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-container">
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
              /*onClick={() => {
                setIsGestionarVacantes(true);
                handleNext();
              }}*/
              onClick={() => handleRole(1)}
            >
              Gestionar las vacantes de trabajo
            </button>
            <button
              className="option-button"
              type="button"
             /* onClick={() => {
                setIsGestionarVacantes(false);
                handleNext();
              }}*/
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
            </div>

            <div className="form-group">
              <label>N° de Documento</label>
              <input
                className={errors.identificationTypeId ? "input-error" : ""}
                type="text"
                {...register("identificationNumber", {
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
                {...register("birthDate", {
                  required: "La fecha es obligatoria.",
                  validate: validateFecha,
                })}
                placeholder="YYYY-MM-DD"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
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
            </div>

            <button className="next-button" type="submit">
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
                {...register("email", { required: "Campo obligatorio" })}
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
              <input type="password" placeholder="Crea una contraseña" {...register("password", { required: "Campo obligatorio" })}></input>
            </div>

            <div class="form-group">
              <h3>Repetir contraseña</h3>
              <input type="password" placeholder="Repite tu contraseña"></input>
            </div>

            <button type="submit" className="login-button">
              Registrarme
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
