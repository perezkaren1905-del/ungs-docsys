package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.AppUserResponseDto;
import com.ungs.docsys.dtos.AppUserAdminResponseDto;
import com.ungs.docsys.models.AppUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface AppUserMapper {
    AppUserResponseDto toResponse(AppUser appUser);

    AppUser toModel(AppUserResponseDto appUserResponseDto);
    // 👇 Nuevo método para el DTO del admin
    @Mapping(target = "fullName", expression = "java(getFullName(appUser))")
    @Mapping(target = "role", expression = "java(getRoleName(appUser))")
    AppUserAdminResponseDto toAdminResponse(AppUser appUser);

    default String getFullName(AppUser appUser) {
        if (appUser.getUserInfos() == null || appUser.getUserInfos().isEmpty()) return null;
        var info = appUser.getUserInfos().get(0);
        return info.getFirstName() + " " + info.getLastName();
    }

    // Extrae el nombre del rol del primer UserRole
    default String getRoleName(AppUser appUser) {
        if (appUser.getUserRoles() == null || appUser.getUserRoles().isEmpty()) return null;
        var role = appUser.getUserRoles().get(0).getRole();
        return role != null ? role.getName() : null;
    }
}
