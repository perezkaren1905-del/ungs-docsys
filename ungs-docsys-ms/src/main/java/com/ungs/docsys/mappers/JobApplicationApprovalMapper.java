package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.JobApplicationApprovalRequestDto;
import com.ungs.docsys.dtos.JobApplicationApprovalResponseDto;
import com.ungs.docsys.models.JobApplication;
import com.ungs.docsys.models.JobApplicationApproval;
import com.ungs.docsys.repositories.JobApplicationRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public abstract class JobApplicationApprovalMapper {

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    public abstract JobApplicationApprovalResponseDto toResponse(JobApplicationApproval jobApplicationApproval);

    @Mapping(target = "jobApplication", source = "jobApplicationId")
    public abstract JobApplicationApproval toModel(JobApplicationApprovalRequestDto jobApplicationApprovalRequestDto);

    protected JobApplication mapJobApplication(Long jobApplicationId) {
        return jobApplicationRepository.findById(jobApplicationId)
                .orElseThrow(() -> new IllegalArgumentException("Job application not found"));
    }
}
