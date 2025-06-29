import { ContactResponseDto } from './contact-response.dto';
import { EducationResponseDto } from './education-response.dto';
import { ExperienceResponseDto } from './experience-response.dto';
import { LanguageResponseDto } from './language-response.dto';
import { TechnicalSkillResponseDto } from './technical-skill-response.dto';
import { CertificationResponseDto } from './certification-response.dto';
import { ResumeFileResponseDto } from './resume-file-response.dto';
import { AppUserExtendedResponseDto } from '../../../modules/login/app-user/dtos/app-user-extended-response.dto';
import { UserInfoResponseDto } from '../../../modules/login/user-info/dtos/user-info-response.dto';

export class ResumeUserResponseDto {
  id: number;
  contact: ContactResponseDto;
  educations: EducationResponseDto[];
  experiences: ExperienceResponseDto[];
  languages: LanguageResponseDto[];
  technicalSkills: TechnicalSkillResponseDto[];
  certifications: CertificationResponseDto[];
  resumeFiles: ResumeFileResponseDto[];
  appUser: AppUserExtendedResponseDto;
  userInfo: UserInfoResponseDto;
}