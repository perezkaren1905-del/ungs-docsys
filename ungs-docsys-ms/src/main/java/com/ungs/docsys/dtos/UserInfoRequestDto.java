package com.ungs.docsys.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserInfoRequestDto {
    Long roleId;
    String email;
    String password;
    String firstName;
    String lastName;
    Long identificationTypeId;
    String identificationNumber;
    String phone;
    LocalDate birthDate;
    Long nationalityId;
}