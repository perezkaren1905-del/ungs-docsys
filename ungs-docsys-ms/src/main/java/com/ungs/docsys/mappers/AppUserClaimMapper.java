package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.AppUserClaimDto;
import com.ungs.docsys.models.AppUser;
import com.ungs.docsys.models.UserInfo;
import com.ungs.docsys.repositories.UserRoleRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public abstract class AppUserClaimMapper {
    @Autowired
    private UserRoleRepository userRoleRepository;

    @Mapping(target = "email", expression = "java(getEmail(userInfo.getAppUser()))")
    @Mapping(target = "roles", expression = "java(getRoles(userInfo.getAppUser()))")
    @Mapping(target = "passwordHash", expression = "java(getPasswordHash(userInfo.getAppUser()))")
    public abstract AppUserClaimDto toDto(UserInfo userInfo);

    protected String getEmail(AppUser appUser) {
        return appUser.getEmail();
    }
    protected List<String> getRoles(AppUser appUser) {
        return userRoleRepository.getByAppUser(appUser).stream()
                .map(userRole -> userRole.getRole().getName())
                .toList();
    }

    protected String getPasswordHash(AppUser appUser) {
        return appUser.getPasswordHash();
    }

}
