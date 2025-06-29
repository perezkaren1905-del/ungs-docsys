package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobProfileLevelResponseDto;
import com.ungs.docsys.exception.BusinessException;
import com.ungs.docsys.mappers.JobProfileLevelMapper;
import com.ungs.docsys.repositories.JobProfileLevelRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobProfileLevelServiceImpl implements JobProfileLevelService {
    private final JobProfileLevelRepository jobProfileLevelRepository;
    private final JobProfileLevelMapper jobProfileLevelMapper;

    @Override
    public JobProfileLevelResponseDto getById(Long id) {
        return jobProfileLevelRepository.findById(id)
                .map(jobProfileLevelMapper::toResponse)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Job profile lvel not found"));
    }

    @Override
    public List<JobProfileLevelResponseDto> getAll() {
        return jobProfileLevelMapper.toResponses(jobProfileLevelRepository.findAll());
    }
}
