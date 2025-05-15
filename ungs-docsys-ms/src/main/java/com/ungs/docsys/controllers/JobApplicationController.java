package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.JobApplicationRequestDto;
import com.ungs.docsys.dtos.JobApplicationResponseDto;
import com.ungs.docsys.services.JobApplicationService;
import com.ungs.docsys.utils.SecurityUtils;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/job-applications")
@Validated
@AllArgsConstructor
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping("/create")
    public ResponseEntity<JobApplicationResponseDto> create(@Valid @RequestBody JobApplicationRequestDto request) {
        String username = SecurityUtils.getCurrentUsername();
        return ResponseEntity.ok(jobApplicationService.create(request, username));
    }
}
