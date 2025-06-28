import { ResumeUserResponseDto } from "src/modules/resume-user/dtos/resume-user-response.dto";
import { JobApplicationResponseDto } from "../../dtos/job-application-response.dto";

export class JobApplicationResumeUserResponseDto {
    jobApplication: JobApplicationResponseDto;
    resumeUser: ResumeUserResponseDto;
    requirementGlobalCount: number;
    requirementMandatoryCount: number;
    requirementGlobalApplied: number;
    requirementMandatoryApplied: number;
    requirementPreferredApplied: number;
}