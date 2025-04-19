package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.RoleResponseDto;
import com.ungs.docsys.models.Role;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface RoleMapper {
    RoleResponseDto toResponse(Role role);
    List<RoleResponseDto> toResponses(List<Role> roles);
}
