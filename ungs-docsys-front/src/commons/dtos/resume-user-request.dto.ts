import { CertificationRequestDto } from './certification-request.dto';
import { ContactRequestDto } from './contact-request.dto';
import { EducationRequestDto } from './education-request.dto';
import { ExperienceRequestDto } from './experience-request.dto';
import { LanguageRequestDto } from './language-request.dto';
import { ResumeFileRequestDto } from './resume-file-request.dto';
import { TechnicalSkillRequestDto } from './technical-skill-request.dto';

export class ResumeUserRequestDto {
  contact: ContactRequestDto;
  educations: EducationRequestDto[] = [];
  experiences: ExperienceRequestDto[] = [];
  languages: LanguageRequestDto[] = [];
  technicalSkills: TechnicalSkillRequestDto[] = [];
  certifications: CertificationRequestDto[] = [];
  references: ContactRequestDto[] = [];
  resumeFiles: ResumeFileRequestDto[] = [];
}