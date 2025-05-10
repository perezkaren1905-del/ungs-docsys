package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.JobApplicationPeriodResponseDto;
import com.ungs.docsys.models.JobApplicationPeriod;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface JobApplicationPeriodMapper {
    JobApplicationPeriodResponseDto toResponse(JobApplicationPeriod jobApplicationPeriod);
    List<JobApplicationPeriodResponseDto> toResponses(List<JobApplicationPeriod> jobApplicationPeriods);
    JobApplicationPeriod toModel(JobApplicationPeriodResponseDto jobApplicationPeriodResponseDto);
}
