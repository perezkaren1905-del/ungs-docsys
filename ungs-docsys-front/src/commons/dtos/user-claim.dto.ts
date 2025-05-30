export class AppUserClaimDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  identificationType: IdentificationTypeResponseDto;
  identificationNumber: string;
  cuilCuit: string;
  phone: string;
  birthDate: Date;
  nationality: NationalityResponseDto;
  roles: string[];
  permissions: string[];
}

export class IdentificationTypeResponseDto {
  id: number;
  code: string;
  description: string;
}

export class NationalityResponseDto {
  id: number;
  code: string;
  description: string;
  iso2: string;
  iso3: string;
}