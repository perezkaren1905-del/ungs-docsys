package com.ungs.docsys.dtos;

import com.ungs.docsys.enums.OperatorsEnum;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class RequirementRequestDto {
    @NotNull
    private String description;
    @NotNull
    private Long requirementTypeId;
    @NotNull
    private OperatorsEnum operator;
    @NotNull
    private String expectedValue;
    @NotNull
    private Long requirementTargetComparatorId;
}
