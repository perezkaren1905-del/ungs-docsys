package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.JobApplicationApprovalRequestDto;
import com.ungs.docsys.dtos.JobApplicationApprovalResponseDto;
import com.ungs.docsys.security.JwtUtil;
import com.ungs.docsys.services.JobApplicationApprovalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/job-application-approvals")
@AllArgsConstructor
public class JobApplicationApprovalController {

    private final JobApplicationApprovalService jobApplicationApprovalService;
    private final JwtUtil jwtUtil;

    @Operation(summary = "Create a job application approval", description = "Creates a new job application approval.")
    @ApiResponse(responseCode = "200", description = "Job application approval created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid request data")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    @PostMapping()
    public ResponseEntity<JobApplicationApprovalResponseDto> create(
            @RequestHeader("Authorization") String authorization,
            @Valid @RequestBody JobApplicationApprovalRequestDto request) {
        return ResponseEntity.ok(jobApplicationApprovalService.create(request, jwtUtil.extractUserClaim(authorization)));
    }

    @Operation(summary = "Get all job application approvals")
    @ApiResponse(responseCode = "200", description = "Job application approvals Ok")
    @ApiResponse(responseCode = "403", description = "Forbidden - user not authorized to update this job application")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    @GetMapping()
    public ResponseEntity<List<JobApplicationApprovalResponseDto>> getByParams(
            @RequestParam Long jobApplicationId
    ) {
        return ResponseEntity.ok(jobApplicationApprovalService.getByParams(jobApplicationId));
    }

    @Operation(summary = "Get job application approval by id")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationApprovalResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationApprovalService.getById(id));
    }
}
