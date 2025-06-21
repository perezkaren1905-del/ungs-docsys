import { JwtService } from "../../commons/utils/jwt.service";
import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from "react-hook-form";
import Header from "../../components/UI/Header";
import './resume-form.css';
import { ResumesService } from "../../commons/services/resumes.service";

export default function ResumeForm() {

    const [isEditing, setIsEditing] = useState(false);

    const { register, handleSubmit, control, reset, watch } = useForm({
        contact: {},
        educations: [],
        experiences: [],
        languages: [],
        technicalSkills: [],
        certifications: []
    });

    const { fields: experienceFields, append: appendExperiences, remove: removeExperiences } = useFieldArray({
        control,
        name: 'experiences'
    });

    const { fields: educationFields, append: appendEducations, remove: removeEducations } = useFieldArray({
        control,
        name: 'educations'
    });

    const { fields: certificationFields, append: appendCertifications, remove: removeCertifications } = useFieldArray({
        control,
        name: 'certifications'
    });

    const { fields: technicalSkillFields, append: appendTechnicalSkills, remove: removeTechnicalSkills } = useFieldArray({
        control,
        name: 'technicalSkills'
    });

    const { fields: languageFields, append: appendLanguages, remove: removeLanguages } = useFieldArray({
        control,
        name: 'languages'
    });

    const experiencesOnlyRead = watch('experiences');
    const educationsOnlyRead = watch('educations');
    const certificationsOnlyRead = watch('certifications');
    const technicalSkillsOnlyRead = watch('technicalSkills');
    const languagesOnlyRead = watch('languages');
    const contactOnlyRead = watch('contact');

    const getUserClaim = () => {
        const claims = JwtService.getClaims();
        return {
            name: `${claims.firstName}, ${claims.lastName}`,
            role: `${claims.roles}`
        }
    };

    const fetchCurrentResumeByUser = async () => {
        try {
            const currentResumeList = await ResumesService.getByParams(true);
            if (currentResumeList.length > 0) {
                reset(currentResumeList[0]);
            }
            //setJobApplications(jobApplicationsResponse);
        } catch (error) {
            console.error(error);
        }
    };

    const onSubmit = (data) => {
        console.log('Datos guardados:', data);
        setIsEditing(false);
    };

    useEffect(() => {
        fetchCurrentResumeByUser();
    }, []);

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
                            {experienceFields.map((item, index) => (
                                <div className="data-form" key={item.id}>
                                    <div className="column">
                                        <p><strong>Nombre del puesto:</strong> <input {...register(`experiences.${index}.jobTitle`)} /></p>
                                        <p><strong>Empresa:</strong> <input {...register(`experiences.${index}.companyName`)} /></p>
                                        <p><strong>Fecha de Inicio - Fin:</strong>
                                            <input {...register(`experiences.${index}.startDate`)} /> - <input {...register(`experiences.${index}.endDate`)} />
                                        </p>
                                        <p><strong>Descripción:</strong></p>
                                        <textarea
                                            className="large-textarea"
                                            placeholder="Escriba aquí su experiencia laboral..."
                                            {...register(`experiences.${index}.description`)}
                                        ></textarea>
                                    </div>
                                    <div className="">
                                        <button type="button" className="delete-button-form" onClick={() => removeExperiences(index)}>Eliminar</button>
                                    </div>

                                </div>
                            ))}

                            <button type="button" className="add-button-form" onClick={() => appendExperiences({ jobTitle: '', companyName: '', startDate: '', endDate: '', description: '' })}>
                                Añadir
                            </button>

                            <h2>Formación Académica</h2>
                            {
                                educationFields.map((item, index) => (

                                    <div className="data-form" key={item.id}>
                                        <div className="column">
                                            <p><strong>Institución:</strong> <input {...register(`educations.${index}.instituteName`)} /></p>
                                            <p><strong>Nivel:</strong> <input {...register(`educations.${index}.degreeLevel`)} /></p>
                                            <p><strong>Título:</strong> <input {...register(`educations.${index}.degree`)} /></p>
                                            <p><strong>Campo de estudio:</strong> <input {...register(`educations.${index}.fieldOfStudy`)} /></p>
                                        </div>
                                        <div className="">
                                            <button type="button" className="delete-button-form" onClick={() => removeEducations(index)}>Eliminar</button>
                                        </div>

                                    </div>

                                ))}
                            <button type="button" className="add-button-form" onClick={() => appendEducations({ instituteName: '', degreeLevel: '', degree: '', fieldOfStudy: '' })}>
                                Añadir
                            </button>

                            <h2>Certificados</h2>
                            {
                                certificationFields.map((item, index) => (
                                    <div className="data-form" key={item.id}>
                                        <div className="column">
                                            <p><strong>Nombre:</strong> <input {...register(`certifications.${index}.name`)} /></p>
                                            <p><strong>Fecha de emisión:</strong> <input {...register(`certifications.${index}.issueDate`)} /></p>
                                            <p><strong>Fecha de vencimiento:</strong> <input {...register(`certifications.${index}.expirationDate`)} /></p>
                                            <p><strong>Enlace:</strong> <input {...register(`certifications.${index}.certificationUrl`)} /></p>
                                        </div>
                                        <div className="">
                                            <button type="button" className="delete-button-form" onClick={() => removeCertifications(index)}>Eliminar</button>
                                        </div>
                                    </div>
                                ))
                            }
                            <button type="button" className="add-button-form" onClick={() => appendCertifications({ name: '', issueDate: '', expirationDate: '', certificationUrl: '' })}>
                                Añadir
                            </button>

                            <h2>Habilidades Técnicas</h2>
                            {
                                technicalSkillFields.map((item, index) => (
                                    <div className="data-form" key={item.id}>
                                        <div className="column">
                                            <p><strong>Nombre:</strong> <input {...register(`technicalSkills.${index}.name`)} /></p>
                                            <p><strong>Nivel:</strong> <input {...register(`technicalSkills.${index}.level`)} /></p>
                                        </div>
                                        <div className="">
                                            <button type="button" className="delete-button-form" onClick={() => removeTechnicalSkills(index)}>Eliminar</button>
                                        </div>
                                    </div>
                                ))
                            }
                            <button type="button" className="add-button-form" onClick={() => appendTechnicalSkills({ name: '', level: '' })}>
                                Añadir
                            </button>

                            <h2>Idiomas</h2>
                            {
                                languageFields.map((item, index) => (
                                    <div className="data-form" key={item.id}>
                                        <div className="column">
                                            <p><strong>Nombre:</strong> <input {...register(`languages.${index}.language`)} /></p>
                                            <p><strong>Nivel:</strong> <input {...register(`languages.${index}.level`)} /></p>
                                        </div>
                                        <div className="">
                                            <button type="button" className="delete-button-form" onClick={() => removeLanguages(index)}>Eliminar</button>
                                        </div>
                                    </div>

                                ))
                            }
                            <button type="button" className="add-button-form" onClick={() => appendLanguages({ language: '', level: '' })}>
                                Añadir
                            </button>
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
                                    <p><strong>Teléfono:</strong> {contactOnlyRead?.phone}</p>
                                    <p><strong>Email:</strong> {contactOnlyRead?.email}</p>
                                    <p><strong>Linkedin:</strong> {contactOnlyRead?.linkedin}</p>
                                </div>

                                <div className="column">
                                    <p><strong>Dirección:</strong> Calle A 123, Capital Federal, Buenos Aires, Argentina</p>
                                </div>
                            </div>

                            <h2>Experiencia Laboral</h2>
                            {

                                experiencesOnlyRead?.map((item, index) => (
                                    <div className="data-form" key={`experience-read-${index}`}>
                                        <div className="column">
                                            <p><strong>Nombre del puesto:</strong> {item?.jobTitle}</p>
                                            <p><strong>Empresa:</strong> {item?.companyName}</p>
                                            <p><strong>Fecha de Inicio - Fin:</strong> {item?.startDate} - {item?.endDate ? item?.endDate : 'Actualidad'}</p>
                                            <p><strong>Descripción:</strong> {item?.description}</p>
                                        </div>
                                    </div>
                                ))
                            }


                            <h2>Formación Académica</h2>
                            {
                                educationsOnlyRead?.map((item, index) => (
                                    <div className="data-form" key={`education-read-${index}`}>
                                        <div className="column" >
                                            <p><strong>Institución:</strong> {item?.instituteName}</p>
                                            <p><strong>Nivel:</strong> {item?.degreeLevel}</p>
                                            <p><strong>Título:</strong> {item?.degree}</p>
                                            <p><strong>Campo de estudio:</strong> {item?.fieldOfStudy}</p>
                                        </div>
                                    </div>
                                ))
                            }

                            <h2>Certificados</h2>
                            {
                                certificationsOnlyRead?.map((item, index) => (
                                    <div className="data-form" key={`certification-read-${index}`}>
                                        <div className="column">
                                            <p><strong>Nombre:</strong> {item?.name}</p>
                                            <p><strong>Fecha de emisión:</strong> {item?.issueDate}</p>
                                            <p><strong>Fecha de vencimiento:</strong> {item?.expirationDate}</p>
                                            <p><strong>Enlace:</strong> {item?.certificationUrl}</p>
                                        </div>
                                    </div>
                                ))
                            }

                            <h2>Habilidades Técnicas</h2>
                            {
                                technicalSkillsOnlyRead?.map((item, index) => (
                                    <div className="data-form" key={`technical-skill-read-${index}`}>
                                        <div className="column">
                                            <p><strong>Nombre:</strong> {item?.name}</p>
                                            <p><strong>Nivel:</strong> {item?.level}</p>
                                        </div>
                                    </div>
                                ))
                            }

                            <h2>Idiomas</h2>
                            {
                                languagesOnlyRead?.map((item, index) => (
                                    <div className="data-form" key={`language-read-${index}`}>
                                        <div className="column">
                                            <p><strong>Nombre:</strong> {item?.language}</p>
                                            <p><strong>Nivel:</strong> {item?.level}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}