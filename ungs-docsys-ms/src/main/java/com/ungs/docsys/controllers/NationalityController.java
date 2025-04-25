package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.NationalityResponseDto;
import com.ungs.docsys.services.NationalityService;
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
@RequestMapping("/v1/nationalities")
@AllArgsConstructor
public class NationalityController {

    private final NationalityService nationalityService;

    @Operation(summary = "Get nationality by id")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping("/{id}")
    public ResponseEntity<NationalityResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(nationalityService.getById(id));
    }

    @Operation(summary = "Get all nationalities")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping()
    public ResponseEntity<List<NationalityResponseDto>> getAll() {
        return ResponseEntity.ok(nationalityService.getAll());
    }
}
