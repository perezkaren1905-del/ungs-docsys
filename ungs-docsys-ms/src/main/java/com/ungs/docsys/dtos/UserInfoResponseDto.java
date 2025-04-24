package com.ungs.docsys.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserInfoResponseDto {
    String email;
    String firstName;
    String lastName;
    Long identificationTypeId;
    String identificationNumber;
    String phone;
    LocalDate birthDate;
    Long nationalityId;
}
