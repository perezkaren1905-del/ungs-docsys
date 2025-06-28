package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobApplicationStatusResponseDto;
import com.ungs.docsys.exception.BusinessException;
import com.ungs.docsys.mappers.JobApplicationStatusMapper;
import com.ungs.docsys.repositories.JobApplicationStatusRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class JobApplicationStatusServiceImpl implements JobApplicationStatusService {
    private final JobApplicationStatusRepository jobApplicationStatusRepository;
    private final JobApplicationStatusMapper jobApplicationStatusMapper;

    @Override
    public JobApplicationStatusResponseDto getById(Long id) {
        return jobApplicationStatusRepository.findById(id)
                .map(jobApplicationStatusMapper::toResponse)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Job application status not found"));
    }

    @Override
    public List<JobApplicationStatusResponseDto> getAll() {
        return jobApplicationStatusMapper.toResponses(jobApplicationStatusRepository.findAll());
    }
}
