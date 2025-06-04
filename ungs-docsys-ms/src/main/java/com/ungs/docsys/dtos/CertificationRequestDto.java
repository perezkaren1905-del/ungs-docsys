package com.ungs.docsys.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CertificationRequestDto {
    private String name;
    private LocalDate issueDate;
    private LocalDate expirationDate;
    private String certificationUrl;
}
