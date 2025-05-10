package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.JobApplicationStatusResponseDto;
import com.ungs.docsys.models.JobApplicationStatus;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface JobApplicationStatusMapper {
    JobApplicationStatusResponseDto toResponse(JobApplicationStatus jobApplicationStatus);
    List<JobApplicationStatusResponseDto> toResponses(List<JobApplicationStatus> jobApplicationStatuses);
    JobApplicationStatus toModel(JobApplicationStatusResponseDto jobApplicationStatusResponseDto);
}
