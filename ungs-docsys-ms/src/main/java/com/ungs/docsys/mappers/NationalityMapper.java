package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.NationalityResponseDto;
import com.ungs.docsys.models.Nationality;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface NationalityMapper {
    NationalityResponseDto toResponse(Nationality nationality);

    List<NationalityResponseDto> toResponses(List<Nationality> nationalities);

    Nationality toModel(NationalityResponseDto nationalityResponseDto);

    List<Nationality> toModels(List<NationalityResponseDto> nationalityResponseDtos);
}
