package com.ungs.docsys.services;

import com.ungs.docsys.dtos.AppUserRequestDto;
import com.ungs.docsys.dtos.AppUserResponseDto;

public interface AppUserService {
    AppUserResponseDto singIn(AppUserRequestDto request);
}
