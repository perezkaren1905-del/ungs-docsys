package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.JobApplicationStatusResponseDto;
import com.ungs.docsys.services.JobApplicationStatusService;
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
@RequestMapping("/v1/job-application-statuses")
@AllArgsConstructor
public class JobApplicationStatusController {
    private final JobApplicationStatusService jobApplicationStatusService;

    @Operation(summary = "Get job application status by id")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationStatusResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationStatusService.getById(id));
    }

    @Operation(summary = "Get all job application statuses")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping()
    public ResponseEntity<List<JobApplicationStatusResponseDto>> getAll() {
        return ResponseEntity.ok(jobApplicationStatusService.getAll());
    }
}
