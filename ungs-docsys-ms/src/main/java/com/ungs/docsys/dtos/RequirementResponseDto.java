package com.ungs.docsys.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RequirementResponseDto {
    private Long id;
    private String description;
    private RequirementTypeResponseDto requirementType;
    private String operator;
    private String expectedValue;
    private Boolean active;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private RequirementTargetComparatorResponseDto requirementTargetComparator;
}
