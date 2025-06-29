export class ExperienceRequestDto {
  jobTitle: string;
  companyName: string;
  description: string;
  startDate: string;
  endDate?: string;
  isCurrentJob: boolean;
}