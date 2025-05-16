package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.RequirementTargetComparatorResponseDto;
import com.ungs.docsys.services.RequirementTargetComparatorService;
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
@RequestMapping("/v1/requirement-target-comparators")
@AllArgsConstructor
public class RequirementTargetComparatorController {
    private RequirementTargetComparatorService requirementTargetComparatorService;

    @Operation(summary = "Get requirement target comparator by id")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping("/{id}")
    public ResponseEntity<RequirementTargetComparatorResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(requirementTargetComparatorService.getById(id));
    }

    @Operation(summary = "Get all requirement target comparators")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping()
    public ResponseEntity<List<RequirementTargetComparatorResponseDto>> getAll() {
        return ResponseEntity.ok(requirementTargetComparatorService.getAll());
    }
}
