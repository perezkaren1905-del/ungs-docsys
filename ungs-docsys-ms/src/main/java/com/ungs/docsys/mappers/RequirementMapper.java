package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.RequirementRequestDto;
import com.ungs.docsys.dtos.RequirementResponseDto;
import com.ungs.docsys.models.Requirement;
import com.ungs.docsys.models.RequirementTargetComparator;
import com.ungs.docsys.models.RequirementType;
import com.ungs.docsys.repositories.RequirementTargetComparatorRepository;
import com.ungs.docsys.repositories.RequirementTypeRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public abstract class RequirementMapper {

    @Autowired
    private RequirementTypeRepository requirementTypeRepository;
    @Autowired
    private RequirementTargetComparatorRepository requirementTargetComparatorRepository;

    @Mapping(target = "requirementType", source = "requirementTypeId")
    @Mapping(target = "requirementTargetComparator", source = "requirementTargetComparatorId")
    public abstract Requirement toModel(RequirementRequestDto requirementRequestDto);

    public abstract RequirementResponseDto toResponse(Requirement requirement);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "requirementType", source = "requirementTypeId")
    @Mapping(target = "requirementTargetComparator", source = "requirementTargetComparatorId")
    public abstract void updateModelFromDto(RequirementRequestDto dto, @MappingTarget Requirement entity);

    public abstract Requirement responseToModel(RequirementResponseDto requirementResponseDto);

    protected RequirementType mapRequirementType(Long requirementTypeId) {
        return requirementTypeRepository.findById(requirementTypeId)
                .orElseThrow(() -> new IllegalArgumentException("Requirement type not found"));
    }

    protected RequirementTargetComparator mapRequirementTargetComparator(Long requirementTargetComparatorId) {
        return requirementTargetComparatorRepository.findById(requirementTargetComparatorId)
                .orElseThrow(() -> new IllegalArgumentException("Requirement target comparator not found"));
    }
}
