import { JobApplicationResponseDto } from "./job-application-response.dto";
import { ResumeUserResponseDto } from "./resume-user-response.dto";

export class JobApplicationResumeUserResponseDto {
    jobApplication: JobApplicationResponseDto;
    resumeUser: ResumeUserResponseDto;
    requirementGlobalCount: number;
    requirementMandatoryCount: number;
    requirementGlobalApplied: number;
    requirementMandatoryApplied: number;
    requirementPreferredApplied: number;
}