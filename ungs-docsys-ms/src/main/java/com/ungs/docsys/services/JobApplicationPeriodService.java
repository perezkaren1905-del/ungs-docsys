package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobApplicationPeriodResponseDto;

import java.util.List;

public interface JobApplicationPeriodService {
    JobApplicationPeriodResponseDto getById(Long id);
    List<JobApplicationPeriodResponseDto> getAll();
}
