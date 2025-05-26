export class SignUpRequestDto {
    roleId: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    identificationTypeId: number;
    identificationNumber: string;
    cuilCuit: string;
    phone: string;
    birthDate: Date;
    nationalityId: number;
}