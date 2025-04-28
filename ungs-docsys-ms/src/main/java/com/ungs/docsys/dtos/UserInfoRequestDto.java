package com.ungs.docsys.dtos;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UserInfoRequestDto {
    private Long roleId;
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Long identificationTypeId;
    private String identificationNumber;
    private String phone;
    private LocalDate birthDate;
    private Long nationalityId;
}