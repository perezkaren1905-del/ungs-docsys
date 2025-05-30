export class JobApplicationResponseDto {
  id: number;

  code: string;

  title: string;

  description: string;

  statusName: string;

  periodDescription: string;
  
  minApprovers: number;

  reason: string;

  yearPeriod: number;

  active: boolean;

  createdByEmail: string;

  createdDate: Date;
}