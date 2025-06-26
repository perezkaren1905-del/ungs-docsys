package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;
import com.ungs.docsys.models.JobApplicationResumeUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface JobApplicationResumeUserMapper {
    @Mapping(target = "jobApplicationId", source = "jobApplication.id")
    @Mapping(target = "resumeUserId", source = "resumeUser.id")
    JobApplicationResumeUserResponseDto toResponse(JobApplicationResumeUser jobApplicationResumeUser);
    JobApplicationResumeUser toModel(JobApplicationResumeUserResponseDto jobApplicationResumeUserResponseDto);
}
