package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.AppUserResponseDto;
import com.ungs.docsys.models.AppUser;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AppUserMapper {
    AppUserResponseDto toResponse(AppUser appUser);

    AppUser toModel(AppUserResponseDto appUserResponseDto);
}
