package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.JobApplicationRequestDto;
import com.ungs.docsys.dtos.JobApplicationResponseDto;
import com.ungs.docsys.security.JwtUtil;
import com.ungs.docsys.services.JobApplicationService;
import com.ungs.docsys.utils.ExcelExportUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/v1/job-applications")
@Validated
@AllArgsConstructor
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;
    private final JwtUtil jwtUtil;

    @Operation(summary = "Create a job application", description = "Creates a new job application for the authenticated user.")
    @ApiResponse(responseCode = "200", description = "Job application created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid request data")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    @PostMapping()
    public ResponseEntity<JobApplicationResponseDto> create(
            @RequestHeader("Authorization") String authorization,
            @Valid @RequestBody JobApplicationRequestDto request) {
        return ResponseEntity.ok(jobApplicationService.create(request, jwtUtil.extractUserClaim(authorization)));
    }

    @Operation(summary = "Delete a job application")
    @ApiResponse(responseCode = "204", description = "Job application deleted successfully")
    @ApiResponse(responseCode = "404", description = "Job application not found")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return jobApplicationService.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
    }

    @Operation(summary = "Update a job application")
    @ApiResponse(responseCode = "200", description = "Job application updated successfully")
    @ApiResponse(responseCode = "404", description = "Job application not found")
    @ApiResponse(responseCode = "403", description = "Forbidden - user not authorized to update this job application")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    @PatchMapping("/{id}")
    public ResponseEntity<JobApplicationResponseDto> update(
            @PathVariable Long id,
            @RequestBody JobApplicationRequestDto request) {
        JobApplicationResponseDto updated = jobApplicationService.partiallyUpdate(id, request);
        return ResponseEntity.ok(updated);
    }
    @Operation(summary = "Get all jobs applications")
    @ApiResponse(responseCode = "200", description = "Job application updated successfully")
    @ApiResponse(responseCode = "404", description = "Job application not found")
    @ApiResponse(responseCode = "403", description = "Forbidden - user not authorized to update this job application")
    @ApiResponse(responseCode = "500", description = "Internal server error")
    @GetMapping()
    public ResponseEntity<List<JobApplicationResponseDto>> getAll() {
        return ResponseEntity.ok(jobApplicationService.getAll());
    }

    @Operation(summary = "Get identification type by id")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping("/{id}")
    public ResponseEntity<JobApplicationResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(jobApplicationService.getById(id));
    }

    @Operation(summary = "Export a job application")
    @ApiResponse(responseCode = "200", description = "Job application exported successfully")
    @ApiResponse(responseCode = "404", description = "Job application not found")
    @GetMapping("/{id}/export")
    public ResponseEntity<byte[]> export(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id) throws IOException {
        JobApplicationResponseDto jobApplicationResponseDto = jobApplicationService.getById(id);
        byte[] data = jobApplicationService.exportToExcel(id, jwtUtil.extractUserClaim(authorization));
        String fileName = ExcelExportUtils.generateExportFileName(jobApplicationResponseDto.getTitle());
        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        ContentDisposition.attachment().filename(fileName).build().toString())
                .body(data);
    }
}