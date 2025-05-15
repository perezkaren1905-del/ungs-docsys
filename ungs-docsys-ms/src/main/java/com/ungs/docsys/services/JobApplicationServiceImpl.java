package com.ungs.docsys.services;

import com.ungs.docsys.dtos.AppUserResponseDto;
import com.ungs.docsys.dtos.JobApplicationRequestDto;
import com.ungs.docsys.dtos.JobApplicationResponseDto;
import com.ungs.docsys.mappers.AppUserMapper;
import com.ungs.docsys.mappers.JobApplicationMapper;
import com.ungs.docsys.mappers.JobApplicationPeriodMapper;
import com.ungs.docsys.mappers.JobApplicationStatusMapper;
import com.ungs.docsys.models.JobApplication;
import com.ungs.docsys.models.JobApplicationPeriod;
import com.ungs.docsys.models.JobApplicationStatus;
import com.ungs.docsys.repositories.JobApplicationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class JobApplicationServiceImpl implements JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;

    private final JobApplicationPeriodService jobApplicationPeriodService;
    private final JobApplicationStatusService jobApplicationStatusService;
    private final AppUserService appUserService;

    private final JobApplicationMapper jobApplicationMapper;
    private final JobApplicationPeriodMapper jobApplicationPeriodMapper;
    private final JobApplicationStatusMapper jobApplicationStatusMapper;
    private final AppUserMapper appUserMapper;

    @Override
    public JobApplicationResponseDto create(JobApplicationRequestDto request, String username) {

        JobApplicationPeriod jobApplicationPeriod = jobApplicationPeriodMapper.toModel(
                jobApplicationPeriodService.getById(request.getJobApplicationPeriodId()));

        JobApplicationStatus jobApplicationStatus = jobApplicationStatusMapper.toModel(
                jobApplicationStatusService.getById(1L));

        AppUserResponseDto appUser = appUserService.getByUsername(username);

        JobApplication jobApplication = JobApplication.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .jobApplicationStatus(jobApplicationStatus)
                .jobApplicationPeriod(jobApplicationPeriod)
                .minApprovers(request.getMinApprovers())
                .reason(request.getReason())
                .yearPeriod(request.getYearPeriod())
                .active(false)
                .appUser(appUserMapper.toModel(appUser))
                .build();
        jobApplicationRepository.save(jobApplication);

        return jobApplicationMapper.toResponse(jobApplication);
    }
}
