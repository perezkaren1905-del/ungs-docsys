package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.JobApplicationRequestDto;
import com.ungs.docsys.dtos.JobApplicationResponseDto;
import com.ungs.docsys.dtos.JobApplicationUpdateRequestDto;
import com.ungs.docsys.services.JobApplicationService;
import com.ungs.docsys.utils.SecurityUtils;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

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

    @PatchMapping("/{id}/delete")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        return jobApplicationService.delete(id)
                ? ResponseEntity.noContent().build()
                : ResponseEntity.status(HttpStatus.NOT_MODIFIED).build();
    }

    @PatchMapping("/{id}")
    public ResponseEntity<JobApplicationResponseDto> update(
            @PathVariable Long id,
            @Valid @RequestBody JobApplicationUpdateRequestDto request) {
        JobApplicationResponseDto updated = jobApplicationService.update(id, request);
        return ResponseEntity.ok(updated);
    }
}