package com.ungs.docsys.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class JobApplicationResumeUserRequestDto {
    @NotNull
    private Long jobApplicationId;
    @NotNull
    private Long resumeUserId;
}
