import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JwtService } from "../../commons/utils/jwt.service";
import Header from "../../components/UI/Header";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './job-application-resume-managment.css';
import { JobApplicationResumeUsersService } from "../../commons/services/job-application-resume-users.service";
import { JobApplicationsService } from "../../commons/services/job-applications.service";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FindInPageIcon from '@mui/icons-material/FindInPage';

export default function JobApplicationResumeManagment() {

    const { jobApplicationId } = useParams();
    const [jobApplicationResumeUsers, setJobApplicationResumeUsers] = useState([]);
    const [jobApplication, setJobApplication] = useState({});
    const navigate = useNavigate();

    const getUserClaim = () => {
        const claims = JwtService.getClaims();
        return {
            name: `${claims.firstName}, ${claims.lastName}`,
            role: `${claims.roles}`
        }
    }

    const handleDownloadExcel = async () => {
        await JobApplicationsService.downloadExport(jobApplicationId);
    }

    const fetchJobApplicationResumeUsersByJobApplicationId = async () => {
        try {
            const jobApplicationResumeUser = await JobApplicationResumeUsersService.getByParams(Number(jobApplicationId), null);
            setJobApplicationResumeUsers(jobApplicationResumeUser);
        } catch (error) {
            setJobApplicationResumeUsers([]);
        }
    }

    const fetchJobApplicationById = async () => {
        try {
            const jobApplication = await JobApplicationsService.getById(Number(jobApplicationId));
            setJobApplication(jobApplication);
        } catch (error) {
            setJobApplication({});
        }
    }

    const goToResumeView = (resumeUserId) => {
        navigate(`/resume/${resumeUserId}`)
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchJobApplicationResumeUsersByJobApplicationId();
        fetchJobApplicationById();
    }, [jobApplicationId]);

    return (
        <div className="home-container">
            <Header user={getUserClaim()} />
            <div className="app-container">

                <div className="top-button-section">
                    <div className="back-section">
                        <button
                            className="go-back-button"
                            onClick={() => navigate(-1)}
                        >
                            <ArrowBackIcon fontSize="large" />
                            Volver
                        </button>
                    </div>

                    <div className="managment-top-buttons">
                        <button
                            className="export-button"
                            onClick={() => handleDownloadExcel()}
                        >
                            <FileDownloadIcon fontSize="large"/>
                            Exportar candidatos
                        </button>
                    </div>
                </div>


                <div className="section-title">
                    <h2>Lista de candidatos de {jobApplication.title}</h2>
                </div>

                <div className="info-section">
                    <table className="table-section">
                        <thead>
                            <tr>
                                <th>Ver CV</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Tipo Identificación</th>
                                <th>Número de Identificación</th>
                                <th>CUIT/CUIL</th>
                                <th>Email</th>
                                <th>Teléfono</th>
                                <th>Reglamentaciones totales</th>
                                <th>Requerimientos excluyentes totales</th>
                                <th>Requerimientos deseables totales</th>
                                <th>Reglamentaciones cumplidas</th>
                                <th>Requerimientos excluyentes cumplidas</th>
                                <th>Requerimientos deseables cumplidas</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobApplicationResumeUsers.map(jobApplicationResumeUser => (
                                <tr key={jobApplicationResumeUser.resumeUser.appUser.id}>
                                    <td>
                                        <button className="go-to-resume-button" onClick={() => goToResumeView(jobApplicationResumeUser.resumeUser.id)}>
                                            <FindInPageIcon fontSize="large"/>
                                        </button>
                                    </td>
                                    <td>{jobApplicationResumeUser.resumeUser.userInfo.firstName}</td>
                                    <td>{jobApplicationResumeUser.resumeUser.userInfo.lastName}</td>
                                    <td>{jobApplicationResumeUser.resumeUser.userInfo.identificationType}</td>
                                    <td>{jobApplicationResumeUser.resumeUser.userInfo.identificationNumber}</td>
                                    <td>{jobApplicationResumeUser.resumeUser.userInfo.cuilCuit}</td>
                                    <td>{jobApplicationResumeUser.resumeUser.appUser.email}</td>
                                    <td>{jobApplicationResumeUser.resumeUser.userInfo.phone}</td>
                                    <td>{jobApplicationResumeUser.requirementGlobalCount}</td>
                                    <td>{jobApplicationResumeUser.requirementMandatoryCount}</td>
                                    <td>{jobApplicationResumeUser.requirementPreferredCount}</td>
                                    <td>{jobApplicationResumeUser.requirementGlobalApplied}</td>
                                    <td>{jobApplicationResumeUser.requirementMandatoryApplied}</td>
                                    <td>{jobApplicationResumeUser.requirementPreferredApplied}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>



            </div>
        </div>
    );
}