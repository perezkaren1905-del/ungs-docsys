package com.ungs.docsys.dtos;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UserInfoRequestDto {
    @NotNull(message = "Role is required")
    @Positive(message = "Role ID must be a positive number")
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
    @Positive(message = "Identification type ID must be a positive number")
    private Long identificationTypeId;

    @NotBlank(message = "Identification number is required")
    @Size(max = 50, message = "Identification number must not exceed 50 characters")
    private String identificationNumber;

    @NotBlank(message = "El CUIL/CUIT es obligatorio.")
    @Size(min = 11, max = 11, message = "El CUIL/CUIT debe tener exactamente 11 dígitos.")
    @Pattern(regexp = "\\d{11}", message = "El CUIL/CUIT debe contener solo números.")
    private String cuilCuit;

    @NotBlank(message = "Phone is required")
    @Size(max = 50, message = "Phone must not exceed 50 characters")
    private String phone;

    @NotNull(message = "Birth date is required")
    private LocalDate birthDate;

    @NotNull(message = "Nationality is required")
    @Positive(message = "Nationality ID must be a positive number")
    private Long nationalityId;


}