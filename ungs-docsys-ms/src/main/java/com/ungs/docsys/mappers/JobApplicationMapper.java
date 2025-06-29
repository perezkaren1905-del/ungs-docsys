package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.JobApplicationRequestDto;
import com.ungs.docsys.dtos.JobApplicationResponseDto;
import com.ungs.docsys.dtos.JobApplicationUpdateRequestDto;
import com.ungs.docsys.models.JobApplication;
import com.ungs.docsys.models.JobApplicationPeriod;
import com.ungs.docsys.models.JobApplicationStatus;
import com.ungs.docsys.models.JobProfileLevel;
import com.ungs.docsys.repositories.JobApplicationPeriodRepository;
import com.ungs.docsys.repositories.JobApplicationStatusRepository;
import com.ungs.docsys.repositories.JobProfileLevelRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public abstract class JobApplicationMapper {

    @Autowired
    private JobApplicationPeriodRepository jobApplicationPeriodRepository;
    @Autowired
    private JobProfileLevelRepository jobProfileLevelRepository;
    @Autowired
    private JobApplicationStatusRepository jobApplicationStatusRepository;

    public abstract JobApplicationResponseDto toResponse(JobApplication jobApplication);

    @Mapping(target = "jobApplicationPeriod", source = "jobApplicationPeriodId")
    @Mapping(target = "jobProfileLevel", source = "jobProfileLevelId")
    @Mapping(target = "jobApplicationStatus", source = "jobApplicationStatusId")
    public abstract JobApplication toModel(JobApplicationRequestDto request);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "jobApplicationPeriod", source = "jobApplicationPeriodId")
    @Mapping(target = "jobProfileLevel", source = "jobProfileLevelId")
    @Mapping(target = "jobApplicationStatus", source = "jobApplicationStatusId")
    public abstract void updateModelFromDto(JobApplicationRequestDto dto, @MappingTarget  JobApplication entity);

    protected JobApplicationPeriod mapJobApplicationPeriod(Long jobApplicationPeriodId) {
        return jobApplicationPeriodRepository.findById(jobApplicationPeriodId)
                .orElseThrow(() -> new IllegalArgumentException("Job application period not found"));
    }

    protected JobProfileLevel mapJobProfileLevel(Long jobProfileLevelId) {
        return jobProfileLevelRepository.findById(jobProfileLevelId)
                .orElseThrow(() -> new IllegalArgumentException("Job profile level not found"));
    }

    protected JobApplicationStatus mapJobApplicationStatus(Long jobApplicationStatusId) {
        return jobApplicationStatusRepository.findById(jobApplicationStatusId)
                .orElseThrow(() -> new IllegalArgumentException("Job application status not found"));
    }
}
