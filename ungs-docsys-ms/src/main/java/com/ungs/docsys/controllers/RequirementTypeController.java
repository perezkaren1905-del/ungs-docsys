package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.RequirementTypeResponseDto;
import com.ungs.docsys.services.RequirementTypeService;
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
@RequestMapping("/v1/requirement-types")
@AllArgsConstructor
public class RequirementTypeController {
    private RequirementTypeService requirementTypeService;

    @Operation(summary = "Get requirement type by id")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping("/{id}")
    public ResponseEntity<RequirementTypeResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(requirementTypeService.getById(id));
    }

    @Operation(summary = "Get all requirement types")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping()
    public ResponseEntity<List<RequirementTypeResponseDto>> getAll() {
        return ResponseEntity.ok(requirementTypeService.getAll());
    }
}
