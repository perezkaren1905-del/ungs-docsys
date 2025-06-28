package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.JobApplicationResumeUserRequestDto;
import com.ungs.docsys.dtos.JobApplicationResumeUserResponseDto;
import com.ungs.docsys.security.JwtUtil;
import com.ungs.docsys.services.JobApplicationResumeUserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/v1/job-application-resume-users")
@AllArgsConstructor
public class JobApplicationResumeUserController {

    private final JobApplicationResumeUserService jobApplicationResumeUserService;
    private final JwtUtil jwtUtil;

    @Operation(summary = "Get Job Application Resume User by ID")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationResumeUserResponseDto> getById(
            @PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationResumeUserService.getById(id));
    }

    @PostMapping()
    public ResponseEntity<JobApplicationResumeUserResponseDto> create(
            @RequestHeader String authorization,
            @RequestBody @Valid JobApplicationResumeUserRequestDto jobApplicationResumeUserRequestDto) {
        return ResponseEntity.ok(jobApplicationResumeUserService.create(jobApplicationResumeUserRequestDto, jwtUtil.extractUserClaim(authorization)));
    }

    @Operation(summary = "Get Job Application Resume Users by params")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping()
    public ResponseEntity<List<JobApplicationResumeUserResponseDto>> getByParams(
            @RequestParam(required = false) Long jobApplicationId, @RequestParam(required = false) Long resumeUserId) {
        return ResponseEntity.ok(jobApplicationResumeUserService.getByParams(jobApplicationId, resumeUserId));
    }
}
