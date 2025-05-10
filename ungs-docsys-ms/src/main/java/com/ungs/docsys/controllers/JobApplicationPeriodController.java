package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.JobApplicationPeriodResponseDto;
import com.ungs.docsys.services.JobApplicationPeriodService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/v1/job-application-periods")
@AllArgsConstructor
public class JobApplicationPeriodController {
    private final JobApplicationPeriodService jobApplicationPeriodService;

    @Operation(summary = "Get job application period by id")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationPeriodResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationPeriodService.getById(id));
    }

    @Operation(summary = "Get all job application periods")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping()
    public ResponseEntity<List<JobApplicationPeriodResponseDto>> getAll() {
        return ResponseEntity.ok(jobApplicationPeriodService.getAll());
    }
}
