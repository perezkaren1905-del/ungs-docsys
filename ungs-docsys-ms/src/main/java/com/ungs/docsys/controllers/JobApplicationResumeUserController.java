package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;
import com.ungs.docsys.services.JobApplicationResumeUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/job-applications-resume-user")
public class JobApplicationResumeUserController {

    @Autowired
    private JobApplicationResumeUserService jobApplicationResumeUserService;

    @GetMapping("/{jobApplicationId}/apply/{resumeUserId}")
    public ResponseEntity<JobApplicationResumeUserResponseDto> apply(
            @PathVariable Long jobApplicationId,
            @PathVariable Long resumeUserId) {
        JobApplicationResumeUserResponseDto response = jobApplicationResumeUserService.apply(jobApplicationId, resumeUserId);
        return ResponseEntity.ok(response);
    }
}
