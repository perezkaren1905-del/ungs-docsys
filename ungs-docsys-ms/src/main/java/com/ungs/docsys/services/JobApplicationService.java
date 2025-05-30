package com.ungs.docsys.services;

import com.ungs.docsys.dtos.AppUserClaimDto;
import com.ungs.docsys.dtos.JobApplicationRequestDto;
import com.ungs.docsys.dtos.JobApplicationResponseDto;
import com.ungs.docsys.dtos.JobApplicationUpdateRequestDto;

import java.util.List;

public interface JobApplicationService {
    JobApplicationResponseDto create(JobApplicationRequestDto request, AppUserClaimDto appUserClaimDto);
    boolean delete(Long id);
    JobApplicationResponseDto partiallyUpdate(Long id, JobApplicationRequestDto request);
    List<JobApplicationResponseDto> getAll();
}
