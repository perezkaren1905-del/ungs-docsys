package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.JobProfileLevelResponseDto;
import com.ungs.docsys.models.JobProfileLevel;
import org.mapstruct.Mapper;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface JobProfileLevelMapper {
    JobProfileLevelResponseDto toResponse(JobProfileLevel jobProfileLevel);
    List<JobProfileLevelResponseDto> toResponses(List<JobProfileLevel> jobProfileLevels);
}
