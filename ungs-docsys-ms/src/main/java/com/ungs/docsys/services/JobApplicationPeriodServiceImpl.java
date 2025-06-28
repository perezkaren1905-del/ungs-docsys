package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobApplicationPeriodResponseDto;
import com.ungs.docsys.exception.BusinessException;
import com.ungs.docsys.mappers.JobApplicationPeriodMapper;
import com.ungs.docsys.repositories.JobApplicationPeriodRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobApplicationPeriodServiceImpl implements  JobApplicationPeriodService {
    private final JobApplicationPeriodRepository jobApplicationPeriodRepository;
    private final JobApplicationPeriodMapper jobApplicationPeriodMapper;

    @Override
    public JobApplicationPeriodResponseDto getById(Long id) {
        return jobApplicationPeriodRepository.findById(id)
                .map(jobApplicationPeriodMapper::toResponse)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Job Application Period not found"));
    }

    @Override
    public List<JobApplicationPeriodResponseDto> getAll() {
        return jobApplicationPeriodMapper.toResponses(jobApplicationPeriodRepository.findAll());
    }
}
