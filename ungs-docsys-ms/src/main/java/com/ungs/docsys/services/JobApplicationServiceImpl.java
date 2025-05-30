package com.ungs.docsys.services;

import com.ungs.docsys.dtos.*;
import com.ungs.docsys.mappers.JobApplicationMapper;
import com.ungs.docsys.mappers.RequirementMapper;
import com.ungs.docsys.models.JobApplication;
import com.ungs.docsys.models.RequirementJobApplication;
import com.ungs.docsys.repositories.AppUserRepository;
import com.ungs.docsys.repositories.JobApplicationRepository;
import com.ungs.docsys.repositories.RequirementJobApplicationRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobApplicationServiceImpl implements JobApplicationService {

    public static final Long PENDING_APPROVAL_ID = 1L;
    private final JobApplicationRepository jobApplicationRepository;
    private final RequirementJobApplicationRepository requirementJobApplicationRepository;
    private final RequirementService requirementService;
    private final JobApplicationMapper jobApplicationMapper;
    private final RequirementMapper requirementMapper;
    private final AppUserRepository appUserRepository;

    @Override
    @Transactional
    public JobApplicationResponseDto create(JobApplicationRequestDto request, AppUserClaimDto appUserClaimDto) {
        request.setJobApplicationStatusId(PENDING_APPROVAL_ID);
        final List<RequirementResponseDto> requirementResponseDtos = request.getRequirements()
                .stream()
                .map(requirementRequestDto -> requirementService.save(requirementRequestDto, appUserClaimDto))
                .toList();
        final JobApplication jobApplication = jobApplicationMapper.toModel(request);
        jobApplication.setAppUser(appUserRepository
                .findById(appUserClaimDto.getId()).orElseThrow(() -> new EntityNotFoundException("User not found")));
        final JobApplication jobApplicationSaved = jobApplicationRepository.save(jobApplication);
        requirementResponseDtos.forEach(requirementResponseDto -> {
            requirementJobApplicationRepository.save(RequirementJobApplication.builder()
                    .requirement(requirementMapper.responseToModel(requirementResponseDto))
                    .jobApplication(jobApplicationSaved)
                    .build());
        });
        final JobApplicationResponseDto jobApplicationResponseDto = jobApplicationMapper.toResponse(jobApplicationSaved);
        jobApplicationResponseDto.setRequirements(requirementResponseDtos);
        return jobApplicationResponseDto;
    }

    @Override
    public boolean delete(Long id) {
        JobApplication jobApplication = getJobApplicationById(id);

        if (Boolean.TRUE.equals(jobApplication.getActive())) {
            jobApplication.setActive(false);
            jobApplicationRepository.save(jobApplication);
            return true;
        }
        return false;
    }

    @Override
    public JobApplicationResponseDto partiallyUpdate(Long id, JobApplicationRequestDto request) {
        final JobApplication jobApplication = getJobApplicationById(id);
        if(request.getRequirements() != null) {

        }
        jobApplicationMapper.updateModelFromDto(request, jobApplication);
        return jobApplicationMapper.toResponse(jobApplicationRepository.save(jobApplication));
    }

    @Override
    public List<JobApplicationResponseDto> getAll() {
        return getJobApplicationsResponse();
    }

    private List<JobApplicationResponseDto> getJobApplicationsResponse() {

        return jobApplicationRepository.findAll().stream()
                .map(jobApplication -> {
                    JobApplicationResponseDto dto = jobApplicationMapper.toResponse(jobApplication);
                    final List<RequirementResponseDto> requirements = requirementJobApplicationRepository.findByJobApplicationId(jobApplication.getId())
                                    .stream().map(requirementJobApplication -> requirementMapper.toResponse(requirementJobApplication.getRequirement()))
                                    .collect(Collectors.toList());
                    dto.setRequirements(requirements);
                    return dto;
                })
                .collect(Collectors.toList());
    }

    private JobApplication getJobApplicationById(Long id) {
        return jobApplicationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Job application not found"));
    }
}
