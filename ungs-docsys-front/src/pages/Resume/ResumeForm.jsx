import { JwtService } from "../../commons/utils/jwt.service";
import { useState } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import Header from "../../components/UI/Header";
import './resume-form.css';

export default function ResumeForm() {

    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, control } = useForm();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'experience'
    });

    const getUserClaim = () => {
        const claims = JwtService.getClaims();
        return {
            name: `${claims.firstName}, ${claims.lastName}`,
            role: `${claims.roles}`
        }
    };

    const onSubmit = (data) => {
        console.log('Datos guardados:', data);
        setIsEditing(false);
    };

    return (
        <div className="home-container">
            <Header
                user={getUserClaim()}
            />

            <div className="app-container">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="resume-container">

                        <div className="resume-header">
                            <h2>Gestión de Curriculum</h2>
                            <p>Agregue información a su curriculum manualmente, o bien cargando su CV en formato .PDF</p>
                        </div>

                        {isEditing ? (<div className="resume-buttons">
                            <button type="button" className="resume-button" onClick={() => setIsEditing(false)}>
                                Cancelar
                            </button>
                            <button className="resume-button" type="submit">
                                Guardar
                            </button>

                        </div>) : (<div className="resume-buttons">
                            <div className="resume-button" onClick={() => setIsEditing(true)}>
                                <span>Editar datos</span>
                            </div>
                            <div className="resume-button">
                                <span>Cargar CV</span>
                            </div>
                        </div>)}

                    </div>


                    {isEditing ? (
                        <div className="resume-form">
                            <h2>Datos personales</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Nombre:</strong> Jane</p>
                                    <p><strong>Apellido:</strong> Doe</p>
                                    <p><strong>Tipo de identificación:</strong> DNI</p>
                                    <p><strong>Número de identificación:</strong> 123456789</p>
                                </div>

                                <div className="column">
                                    <p><strong>CUIT Nº:</strong> 20-123456789-0</p>
                                    <p><strong>Fecha de nacimiento:</strong> 1/2/1998</p>
                                    <p><strong>Nacionalidad:</strong> Argentina</p>
                                </div>

                                <div className="column picture-container">
                                    <div className="picture">Foto</div>
                                </div>
                            </div>

                            <h2>Contacto</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Teléfono:</strong> <input {...register('contact.phone')} /></p>
                                    <p><strong>Email:</strong> <input {...register('contact.email')} /></p>
                                    <p><strong>Linkedin:</strong> <input {...register('contact.linkedin')} /></p>
                                </div>

                                <div className="column">
                                    <p><strong>Dirección:</strong> <input {...register('contact.address')} /></p>
                                </div>
                            </div>

                            <h2>Experiencia Laboral</h2>
                            {fields.map((item, index) => (
                                <div className="data-form" key={item.id}>
                                    <div className="column">
                                        <p><strong>Nombre del puesto:</strong> <input {...register(`experience.${index}.jobTitle`)} /></p>
                                        <p><strong>Empresa:</strong> <input {...register(`experience.${index}.companyName`)} /></p>
                                        <p><strong>Fecha de Inicio - Fin:</strong>
                                            <input {...register(`experience.${index}.startDate`)} /> - <input {...register(`experience.${index}.endDate`)} />
                                        </p>
                                        <p><strong>Descripción:</strong></p>
                                        <textarea
                                            className="large-textarea"
                                            placeholder="Escriba aquí su experiencia laboral..."
                                            {...register(`experience.${index}.description`)}
                                        ></textarea>
                                        <button type="button" className="delete-button" onClick={() => remove(index)}>Eliminar</button>
                                    </div>
                                </div>
                            ))}

                            <button type="button" className="add-button" onClick={() => append({ jobTitle: '', companyName: '', startDate: '', endDate: '', description: '' })}>
                                Añadir Experiencia
                            </button>

                            <h2>Formación Académica</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Institución:</strong> <input {...register('education.instituteName')} /></p>
                                    <p><strong>Nivel:</strong> <input {...register('education.degreeLevel')} /></p>
                                    <p><strong>Título:</strong> <input {...register('education.degree')} /></p>
                                    <p><strong>Campo de estudio:</strong> <input {...register('education.fieldOfStudy')} /></p>
                                </div>
                            </div>

                            <h2>Certificados</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Nombre:</strong> <input {...register('certification.name')} /></p>
                                    <p><strong>Fecha de emisión:</strong> <input {...register('certification.issueDate')} /></p>
                                    <p><strong>Fecha de vencimiento:</strong> <input {...register('certification.expirationDate')} /></p>
                                    <p><strong>Enlace:</strong> <input {...register('certification.certificationUrl')} /></p>
                                </div>
                            </div>

                            <h2>Habilidades Técnicas</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Nombre:</strong> <input {...register('technicalSkill.name')} /></p>
                                    <p><strong>Nivel:</strong> <input {...register('technicalSkill.level')} /></p>
                                </div>
                            </div>

                            <h2>Idiomas</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Nombre:</strong> <input {...register('language.language')} /></p>
                                    <p><strong>Nivel:</strong> <input {...register('language.level')} /></p>
                                </div>
                            </div>
                        </div>

                    ) : (
                        <div className="resume-form">
                            <h2>Datos personales</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Nombre:</strong> Jane</p>
                                    <p><strong>Apellido:</strong> Doe</p>
                                    <p><strong>Tipo de identificación:</strong> DNI</p>
                                    <p><strong>Número de identificación:</strong> 123456789</p>
                                </div>

                                <div className="column">
                                    <p><strong>CUIT Nº:</strong> 20-123456789-0</p>
                                    <p><strong>Fecha de nacimiento:</strong> 1/2/1998</p>
                                    <p><strong>Nacionalidad:</strong> Argentina</p>
                                </div>

                                <div className="column picture-container">
                                    <div className="picture">Foto</div>
                                </div>
                            </div>
                            <h2>Contacto</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Teléfono:</strong> 11 22345678</p>
                                    <p><strong>Email:</strong> janedoe@gmail.com</p>
                                    <p><strong>Linkedin:</strong> linkedin.com/jane-doe</p>
                                </div>

                                <div className="column">
                                    <p><strong>Dirección:</strong> Calle A 123, Capital Federal, Buenos Aires, Argentina</p>
                                </div>
                            </div>

                            <h2>Experiencia Laboral</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Nombre del puesto:</strong> Profesora de Matemática</p>
                                    <p><strong>Empresa:</strong> Universidad Nacional de La Matanza</p>
                                    <p><strong>Fecha de Inicio - Fin:</strong> 01/01/1998 - 01/01/2004</p>
                                    <p><strong>Descripción:</strong> Materias dictadas: Matemática Discreta y Lógica y Teoría de Números</p>
                                </div>
                            </div>

                            <h2>Formación Académica</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Institución:</strong> Universidad Nacional de General Sarmiento</p>
                                    <p><strong>Nivel:</strong> Universitario</p>
                                    <p><strong>Título:</strong> Profesorado de Matemática</p>
                                    <p><strong>Campo de estudio:</strong> No especifica</p>
                                </div>
                            </div>

                            <h2>Certificados</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Nombre:</strong> Asistencia a Congreso de Matemática</p>
                                    <p><strong>Fecha de emisión:</strong> 19/10/2023</p>
                                    <p><strong>Fecha de vencimiento:</strong> 19/10/2024</p>
                                    <p><strong>Enlace:</strong> congresomatematica.com</p>
                                </div>
                            </div>

                            <h2>Habilidades Técnicas</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Nombre:</strong> Java</p>
                                    <p><strong>Nivel:</strong> Avanzado</p>
                                </div>
                            </div>

                            <h2>Idiomas</h2>
                            <div className="data-form">
                                <div className="column">
                                    <p><strong>Nombre:</strong> Inglés</p>
                                    <p><strong>Nivel:</strong> C2</p>
                                </div>
                            </div>
                        </div>
                    )}


                </form>

            </div>
        </div>
    );
}