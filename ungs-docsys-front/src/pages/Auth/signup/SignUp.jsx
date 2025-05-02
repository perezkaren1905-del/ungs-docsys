import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './SignUp.css';
import { NationalititesService } from '../../../commons/services/nationalities.service'

export default function SignUp() {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors }
    } = useForm({
        defaultValues: {
            tipoDocumento: "DNI"
        }
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

    const handleNext = () => setStep(2);
    const handleBack = () => setStep(1);

    const validateFecha = (value) => {
        // Verificamos que no esté vacío
        if (!value) {
            return "La fecha es obligatoria.";
        }

        //TODO Validar formato de fecha DD/MM/YYYY

        return true;
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form-container">
            {step === 1 && (
                <div>
                    <h2>Ingresá tus datos personales</h2>
                    <div className="form-inner">
                        <div className="form-group">
                            <label>Nombre</label>
                            <input className={errors.firstName ? "input-error" : ""} type="text" {...register("firstName", { required: "Campo obligatorio" })} />

                        </div>

                        <div className="form-group">
                            <label>Apellido</label>
                            <input className={errors.lastName ? "input-error" : ""} type="text" {...register("lastName", { required: "Campo obligatorio" })} />
                        </div>

                        <div className="form-group">
                            <label>Tipo de Documento</label>
                            <select className={errors.documentNumber ? "input-error" : ""} {...register("documentType", { required: "Campo obligatorio" })}>
                                <option value="">Seleccione</option>
                                <option value="dni">DNI</option>
                                <option value="pasaporte">Pasaporte</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>N° de Documento</label>
                            <input className={errors.documentNumber ? "input-error" : ""} type="text" {...register("documentNumber", { required: "Campo obligatorio" })} />
                        </div>

                        <div className="form-group">
                            <label>Teléfono</label>
                            <input className={errors.phone ? "input-error" : ""} type="tel" {...register("phone", { required: "Campo obligatorio" })} />
                        </div>

                        <div className="form-group">
                            <label>Fecha de nacimiento</label>
                            <input
                                type="text"
                                className={errors.fecha ? "input-error" : ""}
                                {...register("fecha", {
                                    required: "La fecha es obligatoria.",
                                    validate: validateFecha
                                })}
                                placeholder="DD/MM/YYYY"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label>Nacionalidad</label>

                            <select className={errors.nationality ? "input-error" : ""} {...register("nationality", { required: "Campo obligatorio" })}>
                                <option key="000" value="000"> Seleccione su nacionalidad</option>
                                {nationalities.map((nationality) => (
                                    <option key={nationality.code} value={nationality.code}>
                                        {nationality.description}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {Object.keys(errors).length > 0 && (
                            <p className="form-error-general">Por favor completá todos los campos obligatorios correctamente.</p>
                        )}

                        <button className="next-button" type="button" onClick={handleNext}>Siguiente</button>
                    </div>

                </div>
            )}

            {step === 2 && (
                <div>
                    COMO TAN MUCHACHO
                    <button className="next-button" type="submit">Crear cuenta</button>
                    <button className="next-button" type="button" onClick={handleBack}>Atrás</button>
                </div>
            )}


        </form>
    );
}
