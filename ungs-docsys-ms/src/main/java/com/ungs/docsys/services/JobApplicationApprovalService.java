package com.ungs.docsys.services;

import com.ungs.docsys.dtos.AppUserClaimDto;
import com.ungs.docsys.dtos.JobApplicationApprovalRequestDto;
import com.ungs.docsys.dtos.JobApplicationApprovalResponseDto;

import java.util.List;

public interface JobApplicationApprovalService {
    JobApplicationApprovalResponseDto getById(Long id);
    List<JobApplicationApprovalResponseDto> getByParams(Long jobApplicationId);
    JobApplicationApprovalResponseDto create(JobApplicationApprovalRequestDto jobApplicationApprovalRequestDto, AppUserClaimDto appUserClaimDto);
}
