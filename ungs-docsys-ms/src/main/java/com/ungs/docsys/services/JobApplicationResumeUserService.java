package com.ungs.docsys.services;

import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface JobApplicationResumeUserService {

    JobApplicationResumeUserResponseDto apply(Long jobApplicationId, Long resumeUserId);
}
