package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;
import com.ungs.docsys.mappers.JobApplicationResumeUserMapper;
import com.ungs.docsys.models.JobApplicationResumeUser;
import com.ungs.docsys.repositories.JobApplicationResumeUserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobApplicationResumeUserServiceImpl implements JobApplicationResumeUserService {

    private JobApplicationResumeUserRepository jobApplicationResumeUserRepository;
    private JobApplicationResumeUserMapper jobApplicationResumeUserMapper;

    @Override
    public JobApplicationResumeUserResponseDto getById(Long id) {
        return jobApplicationResumeUserRepository.findById(id)
                .map(jobApplicationResumeUserMapper::toResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job Application Resume User not found"));
    }

    @Override
    public List<JobApplicationResumeUserResponseDto> getByParams(Long jobApplicationId) {
        List<JobApplicationResumeUser> jobApplicationResumeUserList = jobApplicationResumeUserRepository.findByJobApplicationId(jobApplicationId);
        return jobApplicationResumeUserList.stream()
                .map(entity -> jobApplicationResumeUserMapper.toResponse(entity))
                .collect(Collectors.toList());
    }
}