package com.ungs.docsys.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EducationRequestDto {
    private String instituteName;
    private String degreeLevel;
    private String degree;
    private String fieldOfStudy;
}
