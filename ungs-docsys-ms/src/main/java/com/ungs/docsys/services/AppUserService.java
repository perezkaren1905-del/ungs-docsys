package com.ungs.docsys.services;

import com.ungs.docsys.dtos.AppUserRequestDto;

public interface AppUserService {
    void singIn(AppUserRequestDto request);
}
