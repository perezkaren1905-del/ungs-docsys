package com.ungs.docsys.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JobApplicationResponseDto {
    private Long id;
    private String code;
    private String title;
    private String description;
    private String statusName;
    private String periodDescription;
    private Long minApprovers;
    private String reason;
    private Long yearPeriod;
    private Boolean active;
    private String createdByEmail;
    private String createdDate;
}
