package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobApplicationResponseDto;
import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;
import com.ungs.docsys.dtos.RequirementResponseDto;
import com.ungs.docsys.dtos.ResumeUserResponseDto;
import com.ungs.docsys.mappers.JobApplicationMapper;
import com.ungs.docsys.mappers.JobApplicationResumeUserMapper;
import com.ungs.docsys.mappers.RequirementMapper;
import com.ungs.docsys.mappers.ResumeUserMapper;
import com.ungs.docsys.models.JobApplication;
import com.ungs.docsys.models.JobApplicationResumeUser;
import com.ungs.docsys.models.Requirement;
import com.ungs.docsys.repositories.JobApplicationResumeUserRepository;
import com.ungs.docsys.strategy.RequirementComparatorCheckStrategy;
import com.ungs.docsys.strategy.RequirementComparatorCheckStrategyFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class JobApplicationResumeUserServiceImpl implements JobApplicationResumeUserService {

    @Autowired
    private JobApplicationResumeUserRepository jobApplicationResumeUserRepository;

    @Autowired
    private JobApplicationService jobApplicationService;
    @Autowired
    private ResumeUserService resumeUserService;
    @Autowired
    private RequirementService requirementService;
    @Autowired
    private RequirementComparatorCheckStrategyFactory strategyFactory;

    @Autowired
    private JobApplicationResumeUserMapper jobApplicationResumeUserMapper;

    @Autowired
    private JobApplicationMapper jobApplicationMapper;
    @Autowired
    private ResumeUserMapper resumeUserMapper;
    @Autowired
    private RequirementMapper requirementMapper;

    @Override
    public JobApplicationResumeUserResponseDto getById(Long id) {
        System.out.println("Fetching Job Application Resume User with ID: " + id);
        return jobApplicationResumeUserRepository.findById(id)
                .map(jobApplicationResumeUserMapper::toResponse)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Job Application Resume User not found"));
    }

    @Override
    public JobApplicationResumeUserResponseDto apply(Long jobApplicationId, Long resumeUserId) {
        JobApplicationResponseDto jobApplication = jobApplicationService.getById(jobApplicationId);
        ResumeUserResponseDto resumeUser = resumeUserService.getById(resumeUserId);

        List<RequirementResponseDto> requirementList = requirementService.getByJobApplicationId(jobApplicationId);

        long globalCount = 0;
        long mandatoryCount = 0;
        long preferredCount = 0;
        long globalApplied = 0;
        long mandatoryApplied = 0;
        long preferredApplied = 0;

        /*
        for(RequirementResponseDto requirement : requirementList) {
            String targetComparator = requirement.getRequirementTargetComparator().getName();
            RequirementComparatorCheckStrategy strategy = strategyFactory.getStrategy(targetComparator);

        }*/

        JobApplicationResumeUser jobApplicationResumeUser = JobApplicationResumeUser.builder()
                //.jobApplication(jobApplicationMapper.toModel(jobApplication))
                //.resumeUser(resumeUserMapper.toModel(resumeUser))
                .requirementGlobalCount(globalCount)
                .requirementMandatoryCount(mandatoryCount)
                .requirementPreferredCount(preferredCount)
                .requirementGlobalApplied(globalApplied)
                .requirementMandatoryApplied(mandatoryApplied)
                .requirementPreferredApplied(preferredApplied)
                .build();

        return jobApplicationResumeUserMapper.toResponse(jobApplicationResumeUserRepository.save(jobApplicationResumeUser));
    }


}
