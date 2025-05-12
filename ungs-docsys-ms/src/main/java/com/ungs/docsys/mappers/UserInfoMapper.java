package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.UserInfoResponseDto;
import com.ungs.docsys.models.IdentificationType;
import com.ungs.docsys.models.Nationality;
import com.ungs.docsys.models.UserInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserInfoMapper {
    @Mapping(source = "appUser.email", target = "email")
    UserInfoResponseDto toResponse(UserInfo userInfo);

    List<UserInfoResponseDto> toResponses(List<UserInfo> userInfos);

    default String map(IdentificationType identificationType) {
        return identificationType != null ? identificationType.getDescription() : null;
    }

    default String map(Nationality nationality) {
        return nationality != null ? nationality.getDescription() : null;
    }
}
