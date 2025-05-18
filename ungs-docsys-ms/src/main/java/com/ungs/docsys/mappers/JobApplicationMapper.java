package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.JobApplicationRequestDto;
import com.ungs.docsys.dtos.JobApplicationResponseDto;
import com.ungs.docsys.dtos.JobApplicationUpdateRequestDto;
import com.ungs.docsys.models.JobApplication;
import com.ungs.docsys.models.JobApplicationPeriod;
import com.ungs.docsys.repositories.JobApplicationPeriodRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public abstract class JobApplicationMapper {

    @Autowired
    private JobApplicationPeriodRepository jobApplicationPeriodRepository;

    @Mapping(source = "jobApplicationStatus.name", target = "statusName")
    @Mapping(source = "jobApplicationPeriod.description", target = "periodDescription")
    @Mapping(source = "appUser.email", target = "createdByEmail")
    @Mapping(source = "createdDate", target = "createdDate", dateFormat = "yyyy-MM-dd'T'HH:mm:ss")
    public abstract JobApplicationResponseDto toResponse(JobApplication jobApplication);

    public abstract JobApplication toModel(JobApplicationRequestDto request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "jobApplicationPeriod", source = "jobApplicationPeriodId")
    public abstract void updateModelFromDto(JobApplicationUpdateRequestDto dto, @MappingTarget  JobApplication entity);

    protected JobApplicationPeriod mapJobApplicationPeriod(Long jobApplicationPeriodId) {
        return jobApplicationPeriodRepository.findById(jobApplicationPeriodId)
                .orElseThrow(() -> new IllegalArgumentException("Job application period not found"));
    }
}
