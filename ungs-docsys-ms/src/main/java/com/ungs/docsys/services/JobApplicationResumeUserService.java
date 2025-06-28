package com.ungs.docsys.services;

import com.ungs.docsys.dtos.AppUserClaimDto;
import com.ungs.docsys.dtos.JobApplicationResumeUserRequestDto;
import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;

import java.util.List;

public interface JobApplicationResumeUserService {

    JobApplicationResumeUserResponseDto getById(Long id);

    JobApplicationResumeUserResponseDto create(JobApplicationResumeUserRequestDto jobApplicationResumeUserRequestDto, AppUserClaimDto userClaimDto);

    List<JobApplicationResumeUserResponseDto> getByParams(Long jobApplicationId, Long resumeUserId);
}
