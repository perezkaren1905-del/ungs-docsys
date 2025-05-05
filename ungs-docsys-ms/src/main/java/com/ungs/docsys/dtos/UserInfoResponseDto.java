package com.ungs.docsys.dtos;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
public class UserInfoResponseDto {
    private String email;
    private String firstName;
    private String lastName;
    private String identificationType;
    private String identificationNumber;
    private String cuilCuit;
    private String phone;
    private LocalDate birthDate;
    private String nationality;
}
