package com.ungs.docsys.services;

import com.ungs.docsys.dtos.AppUserClaimDto;
import com.ungs.docsys.dtos.JobApplicationApprovalRequestDto;
import com.ungs.docsys.dtos.JobApplicationApprovalResponseDto;
import com.ungs.docsys.exception.BusinessException;
import com.ungs.docsys.mappers.JobApplicationApprovalMapper;
import com.ungs.docsys.models.AppUser;
import com.ungs.docsys.models.JobApplicationApproval;
import com.ungs.docsys.repositories.AppUserRepository;
import com.ungs.docsys.repositories.JobApplicationApprovalRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class JobApplicationApprovalServiceImpl implements JobApplicationApprovalService {

    private final JobApplicationApprovalRepository jobApplicationApprovalRepository;
    private final JobApplicationApprovalMapper jobApplicationApprovalMapper;
    private final AppUserRepository appUserRepository;

    @Override
    public JobApplicationApprovalResponseDto getById(Long id) {
        return jobApplicationApprovalRepository.findById(id)
                .map(jobApplicationApprovalMapper::toResponse)
                .orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Job Application Approval not found"));
    }

    @Override
    public List<JobApplicationApprovalResponseDto> getByParams(Long jobApplicationId) {
        return jobApplicationApprovalRepository.findAllByJobApplicationId(jobApplicationId).stream().map(jobApplicationApprovalMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public JobApplicationApprovalResponseDto create(JobApplicationApprovalRequestDto jobApplicationApprovalRequestDto, AppUserClaimDto appUserClaimDto) {
        final AppUser appUser = appUserRepository
                .findById(appUserClaimDto.getId()).orElseThrow(() -> new BusinessException(HttpStatus.NOT_FOUND, "Job Application Approval not found"));

        final JobApplicationApproval jobApplicationApproval = jobApplicationApprovalMapper.toModel(jobApplicationApprovalRequestDto);
        jobApplicationApproval.setAppUser(appUser);
        return jobApplicationApprovalMapper.toResponse(jobApplicationApprovalRepository.save(jobApplicationApproval));
    }
}
