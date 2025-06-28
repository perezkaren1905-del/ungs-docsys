package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;

import java.util.List;

public interface JobApplicationResumeUserService {
    JobApplicationResumeUserResponseDto getById(Long id);
    List<JobApplicationResumeUserResponseDto> getByParams(Long jobApplicationId);
}