package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobApplicationRequestDto;
import com.ungs.docsys.dtos.JobApplicationResponseDto;

public interface JobApplicationService {
    JobApplicationResponseDto create(JobApplicationRequestDto request, String username);
}
