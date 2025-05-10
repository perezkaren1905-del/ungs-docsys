package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.RequirementTypeResponseDto;
import com.ungs.docsys.models.RequirementType;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RequirementTypeMapper {
    RequirementTypeResponseDto toResponse(RequirementType requirementType);
    List<RequirementTypeResponseDto> toResponses(List<RequirementType> requirementTypes);
    RequirementType toModel(RequirementTypeResponseDto requirementTypeResponseDto);
}
