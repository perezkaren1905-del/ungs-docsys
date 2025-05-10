package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobApplicationStatusResponseDto;

import java.util.List;

public interface JobApplicationStatusService {
    JobApplicationStatusResponseDto getById(Long id);
    List<JobApplicationStatusResponseDto> getAll();
}
