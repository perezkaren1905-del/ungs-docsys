package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.UserInfoResponseDto;
import com.ungs.docsys.models.UserInfo;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserInfoMapper {
    UserInfoResponseDto toResponse(UserInfo userInfo);

    List<UserInfoResponseDto> toResponses(List<UserInfo> userInfos);
}
