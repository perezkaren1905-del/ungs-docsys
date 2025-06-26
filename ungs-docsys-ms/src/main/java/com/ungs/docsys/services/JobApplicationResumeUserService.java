package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;

public interface JobApplicationResumeUserService {

    JobApplicationResumeUserResponseDto getById(Long id);

    JobApplicationResumeUserResponseDto apply(Long jobApplicationId, Long resumeUserId);
}
