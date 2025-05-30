package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.JobProfileLevelResponseDto;
import com.ungs.docsys.services.JobProfileLevelService;
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
@RequestMapping("/v1/job-profile-levels")
@AllArgsConstructor
public class JobProfileLevelController {

    private final JobProfileLevelService jobProfileLevelService;

    @Operation(summary = "Get job profile level by id")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping("/{id}")
    public ResponseEntity<JobProfileLevelResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(jobProfileLevelService.getById(id));
    }

    @Operation(summary = "Get all job profile levels")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping()
    public ResponseEntity<List<JobProfileLevelResponseDto>> getAll() {
        return ResponseEntity.ok(jobProfileLevelService.getAll());
    }
}
