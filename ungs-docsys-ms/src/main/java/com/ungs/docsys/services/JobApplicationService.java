package com.ungs.docsys.services;

import com.ungs.docsys.dtos.*;

import java.io.IOException;
import java.util.List;

public interface JobApplicationService {
    JobApplicationResponseDto create(JobApplicationRequestDto request, AppUserClaimDto appUserClaimDto);
    boolean delete(Long id);
    JobApplicationResponseDto partiallyUpdate(Long id, JobApplicationRequestDto request);
    List<JobApplicationResponseDto> getAll();
    JobApplicationResponseDto getById(Long id);
    byte[] exportToExcel(Long id) throws IOException;
}
