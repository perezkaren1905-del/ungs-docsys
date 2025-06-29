package com.ungs.docsys.services;

import com.ungs.docsys.dtos.AppUserClaimDto;
import com.ungs.docsys.dtos.ResumeUserRequestDto;
import com.ungs.docsys.dtos.ResumeUserResponseDto;

import java.util.List;

public interface ResumeUserService {

    ResumeUserResponseDto save(ResumeUserRequestDto resumeUserRequestDto, AppUserClaimDto appUserClaimDto);

    ResumeUserResponseDto getById(Long resumeUserId);

    List<ResumeUserResponseDto> getByParams(Boolean isCurrent, AppUserClaimDto appUserClaimDto);

    ResumeUserResponseDto partiallyUpdate(ResumeUserRequestDto resumeUserRequestDto, Long resumeUserId, AppUserClaimDto appUserClaimDto);

    ResumeUserResponseDto getResumeByUserId(Long userId);
}
