package com.ungs.docsys.services;

import com.ungs.docsys.dtos.*;
import com.ungs.docsys.enums.RequirementTargetComparator;
import com.ungs.docsys.exception.BusinessException;
import com.ungs.docsys.mappers.JobApplicationResumeUserMapper;
import com.ungs.docsys.models.*;
import com.ungs.docsys.repositories.JobApplicationResumeUserRepository;
import com.ungs.docsys.repositories.JobApplicationResumeUserSpecification;
import com.ungs.docsys.strategy.RequirementComparatorCheckStrategyFactory;
import lombok.AllArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobApplicationResumeUserServiceImpl implements JobApplicationResumeUserService {
    private final JobApplicationResumeUserRepository jobApplicationResumeUserRepository;
    private final RequirementComparatorCheckStrategyFactory strategyFactory;
    private final JobApplicationResumeUserMapper jobApplicationResumeUserMapper;

    @Override
    public JobApplicationResumeUserResponseDto getById(Long id) {
        return jobApplicationResumeUserRepository.findById(id)
                .map(jobApplicationResumeUserMapper::toResponse)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Job Application Resume User not found"));
    }

    @Override
    public JobApplicationResumeUserResponseDto create(JobApplicationResumeUserRequestDto jobApplicationResumeUserRequestDto, AppUserClaimDto userClaimDto) {
        final JobApplicationResumeUser jobApplicationResumeUser = jobApplicationResumeUserMapper.toModel(jobApplicationResumeUserRequestDto);
        throwIfCandidateHasApplied(jobApplicationResumeUser.getResumeUser().getAppUser(), userClaimDto);
        final List<RequirementJobApplication> requirementJobApplications = jobApplicationResumeUser.getJobApplication().getRequirementJobApplications();
        setRequirementsAppliedValues(jobApplicationResumeUserRequestDto, requirementJobApplications, jobApplicationResumeUser);
        return jobApplicationResumeUserMapper.toResponse(jobApplicationResumeUserRepository.save(jobApplicationResumeUser));
    }

    private void throwIfCandidateHasApplied(AppUser appUser, AppUserClaimDto userClaimDto) {
        if(Objects.equals(appUser.getId(), userClaimDto.getId())) {
            throw new BusinessException(HttpStatus.CONFLICT, "Candidate already applied to job application");
        }
    }

    private void setRequirementsAppliedValues(JobApplicationResumeUserRequestDto jobApplicationResumeUserRequestDto, List<RequirementJobApplication> requirementJobApplications, JobApplicationResumeUser jobApplicationResumeUser) {
        final Map<Long, List<Requirement>> groupedRequirements = requirementJobApplications.stream()
                .map(RequirementJobApplication::getRequirement)
                .collect(Collectors.groupingBy(req -> req.getRequirementType().getId()));
        final List<Requirement> globalRequirements = groupedRequirements.getOrDefault(1L, List.of());
        final List<Requirement> mandatoryRequirements = groupedRequirements.getOrDefault(2L, List.of());
        final List<Requirement> preferredRequirements = groupedRequirements.getOrDefault(3L, List.of());

        jobApplicationResumeUser.setRequirementGlobalCount((long) globalRequirements.size());
        jobApplicationResumeUser.setRequirementMandatoryCount((long) mandatoryRequirements.size());
        jobApplicationResumeUser.setRequirementPreferredCount((long) preferredRequirements.size());

        final Long globalRequirementApplied = globalRequirements.stream()
                .filter(globalRequirement -> strategyFactory.get(RequirementTargetComparator.valueOf(globalRequirement.getRequirementTargetComparator().getName()))
                        .isApplied(globalRequirement, jobApplicationResumeUserRequestDto.getResumeUserId()))
                .count();
        final Long mandatoryRequirementApplied = mandatoryRequirements.stream()
                .filter(mandatoryRequirement -> strategyFactory.get(RequirementTargetComparator.valueOf(mandatoryRequirement.getRequirementTargetComparator().getName()))
                        .isApplied(mandatoryRequirement, jobApplicationResumeUserRequestDto.getResumeUserId()))
                .count();
        final Long preferredRequirementApplied = preferredRequirements.stream()
                .filter(preferredRequirement -> strategyFactory.get(RequirementTargetComparator.valueOf(preferredRequirement.getRequirementTargetComparator().getName()))
                        .isApplied(preferredRequirement, jobApplicationResumeUserRequestDto.getResumeUserId()))
                .count();
        jobApplicationResumeUser.setRequirementGlobalApplied(globalRequirementApplied);
        jobApplicationResumeUser.setRequirementMandatoryApplied(mandatoryRequirementApplied);
        jobApplicationResumeUser.setRequirementPreferredApplied(preferredRequirementApplied);
    }

    @Override
    public List<JobApplicationResumeUserResponseDto> getByParams(Long jobApplicationId, Long resumeUserId) {
        Specification<JobApplicationResumeUser> spec = Specification
                .where(JobApplicationResumeUserSpecification.hasJobApplicationId(jobApplicationId))
                .and(JobApplicationResumeUserSpecification.hasResumeUserId(resumeUserId));

        return jobApplicationResumeUserRepository.findAll(spec).stream()
                .map(jobApplicationResumeUserMapper::toResponse)
                .collect(Collectors.toList());
    }

}
