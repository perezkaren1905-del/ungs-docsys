package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.PermissionResponseDto;
import com.ungs.docsys.models.Permission;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface PermissionMapper {
    PermissionResponseDto toResponse(Permission permission);
    List<PermissionResponseDto> toResponses(List<Permission> permissions);
}
