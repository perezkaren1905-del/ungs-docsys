package com.ungs.docsys.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResumeUserRequestDto {
    private Long userId;
    private ContactRequestDto contact;
    private List<EducationRequestDto> educations = new ArrayList<>();
    private List<ExperienceRequestDto> experiences = new ArrayList<>();
    private List<LanguageRequestDto> languages = new ArrayList<>();
    private List<TechnicalSkillRequestDto> technicalSkills = new ArrayList<>();
    private List<CertificationRequestDto> certifications = new ArrayList<>();
    private List<ContactRequestDto> references = new ArrayList<>();
    private List<ResumeFileRequestDto> resumeFiles = new ArrayList<>();
    private Boolean isCurrent;
}
