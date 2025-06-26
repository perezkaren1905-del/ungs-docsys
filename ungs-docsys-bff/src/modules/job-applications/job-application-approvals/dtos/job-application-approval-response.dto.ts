import { AppUserExtendedResponseDto } from "src/modules/login/app-user/dtos/app-user-extended-response.dto";
import { JobApplicationResponseDto } from "../../dtos/job-application-response.dto";

export class JobApplicationApprovalResponseDto {
    id: number;
    jobApplication: JobApplicationResponseDto;
    approved: boolean;
    reason: string;
    appUser: AppUserExtendedResponseDto;
    createdDate: Date;
    updatedDate: Date;
}