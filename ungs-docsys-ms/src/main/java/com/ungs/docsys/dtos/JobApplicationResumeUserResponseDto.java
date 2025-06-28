package com.ungs.docsys.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobApplicationResumeUserResponseDto {
    private JobApplicationResponseDto jobApplication;
    private ResumeUserResponseDto resumeUser;
    private Long requirementGlobalCount;
    private Long requirementMandatoryCount;
    private Long requirementGlobalApplied;
    private Long requirementMandatoryApplied;
    private Long requirementPreferredApplied;
}
