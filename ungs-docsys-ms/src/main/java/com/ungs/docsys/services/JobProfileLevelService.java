package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobProfileLevelResponseDto;

import java.util.List;

public interface JobProfileLevelService {
    JobProfileLevelResponseDto getById(Long id);
    List<JobProfileLevelResponseDto> getAll();
}
