package com.ungs.docsys.services;

import com.ungs.docsys.dtos.UserInfoRequestDto;
import com.ungs.docsys.dtos.UserInfoResponseDto;

public interface UserInfoService {
    UserInfoResponseDto signUp(UserInfoRequestDto request);
}
