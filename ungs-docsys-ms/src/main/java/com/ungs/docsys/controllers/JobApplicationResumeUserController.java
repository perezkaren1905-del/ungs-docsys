package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;
import com.ungs.docsys.services.JobApplicationResumeUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/job-applications-resume-user")
@AllArgsConstructor
public class JobApplicationResumeUserController {
    private final JobApplicationResumeUserService jobApplicationResumeUserService;

    @Operation(summary = "Get Job Application Resume User by ID")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationResumeUserResponseDto> getById(
            @PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationResumeUserService.getById(id));
    }

    @Operation(summary = "Get Job Application Resume User by ID")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping()
    public ResponseEntity<List<JobApplicationResumeUserResponseDto>> getByParams(
            @RequestParam Long jobApplicationId) {
        return ResponseEntity.ok(jobApplicationResumeUserService.getByParams(jobApplicationId));
    }
}