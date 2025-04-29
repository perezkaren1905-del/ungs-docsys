package com.ungs.docsys.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserInfoRequestDto {
    private Long roleId;

    @NotBlank(message = "Email is required")
    @Size(max = 100, message = "Email must not exceed 100 characters")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 255, message = "Password must be at least 8 characters long")
    private String password;

    @NotBlank(message = "First name is required")
    @Size(max = 150, message = "First name must not exceed 150 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 150, message = "Last name must not exceed 150 characters")
    private String lastName;

    @NotNull(message = "Identification type is required")
    private Long identificationTypeId;

    @NotBlank(message = "Identification number is required")
    @Size(max = 50, message = "Identification number must not exceed 50 characters")
    private String identificationNumber;

    @NotBlank(message = "Phone is required")
    @Size(max = 50, message = "Phone must not exceed 50 characters")
    private String phone;

    @NotNull(message = "Birth date is required")
    private LocalDate birthDate;

    @NotNull(message = "Nationality is required")
    private Long nationalityId;
}