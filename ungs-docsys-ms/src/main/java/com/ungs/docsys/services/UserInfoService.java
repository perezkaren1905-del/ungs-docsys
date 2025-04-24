package com.ungs.docsys.services;

import com.ungs.docsys.dtos.UserInfoRequestDto;

public interface UserInfoService {
    void signUp(UserInfoRequestDto request);
}
