package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.RequirementTargetComparatorResponseDto;
import com.ungs.docsys.models.RequirementTargetComparator;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RequirementTargetComparatorMapper {
    RequirementTargetComparatorResponseDto toResponse(RequirementTargetComparator requirementTargetComparator);
    List<RequirementTargetComparatorResponseDto> toResponses(List<RequirementTargetComparator> requirementTargetComparators);
    RequirementTargetComparator toModel(RequirementTargetComparatorResponseDto requirementTargetComparatorResponseDto);
}
