package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.IdentificationTypeResponseDto;
import com.ungs.docsys.models.IdentificationType;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface IdentificationTypeMapper {
    IdentificationTypeResponseDto toResponse(IdentificationType identificationType);
    List<IdentificationTypeResponseDto> toResponses(List<IdentificationType> identificationType);
}
