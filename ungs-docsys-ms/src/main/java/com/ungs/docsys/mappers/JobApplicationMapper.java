package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.JobApplicationRequestDto;
import com.ungs.docsys.dtos.JobApplicationResponseDto;
import com.ungs.docsys.models.JobApplication;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface JobApplicationMapper {
    @Mapping(source = "jobApplicationStatus.name", target = "statusName")
    @Mapping(source = "jobApplicationPeriod.description", target = "periodDescription")
    @Mapping(source = "appUser.email", target = "createdByEmail")
    @Mapping(source = "createdDate", target = "createdDate", dateFormat = "yyyy-MM-dd'T'HH:mm:ss")
    JobApplicationResponseDto toResponse(JobApplication jobApplication);

    JobApplication toModel(JobApplicationRequestDto request);
}
