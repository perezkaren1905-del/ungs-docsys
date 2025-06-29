package com.ungs.docsys.mappers;

import com.ungs.docsys.dtos.JobApplicationResumeUserRequestDto;
import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;
import com.ungs.docsys.models.JobApplication;
import com.ungs.docsys.models.JobApplicationResumeUser;
import com.ungs.docsys.models.ResumeUser;
import com.ungs.docsys.repositories.JobApplicationRepository;
import com.ungs.docsys.repositories.ResumeUserRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;
import org.springframework.beans.factory.annotation.Autowired;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE, uses = { ResumeUserMapper.class })
public abstract class JobApplicationResumeUserMapper {
    @Autowired
    private JobApplicationRepository jobApplicationRepository;
    @Autowired
    private ResumeUserRepository resumeUserRepository;
    @Autowired
    protected ResumeUserMapper resumeUserMapper;

    @Mapping(target = "resumeUser", expression = "java(resumeUserMapper.toResponse(jobApplicationResumeUser.getResumeUser()))")
    public abstract JobApplicationResumeUserResponseDto toResponse(JobApplicationResumeUser jobApplicationResumeUser);
    @Mapping(target = "jobApplication", source = "jobApplicationId")
    @Mapping(target = "resumeUser", source = "resumeUserId")
    public abstract JobApplicationResumeUser toModel(JobApplicationResumeUserRequestDto jobApplicationResumeUserRequestDto);

    protected JobApplication mapJobApplication(Long jobApplicationId) {
        return jobApplicationRepository.findById(jobApplicationId)
                .orElseThrow(() -> new IllegalArgumentException("Job application not found"));
    }

    protected ResumeUser mapResumeUser(Long resumeUserId) {
        return resumeUserRepository.findById(resumeUserId)
                .orElseThrow(() -> new IllegalArgumentException("Resume user not found"));
    }
}
