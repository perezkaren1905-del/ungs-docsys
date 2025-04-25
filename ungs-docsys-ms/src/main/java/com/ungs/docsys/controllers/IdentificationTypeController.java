package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.IdentificationTypeResponseDto;
import com.ungs.docsys.services.IdentificationTypeService;
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
@RequestMapping("/v1/identification-types")
@AllArgsConstructor
public class IdentificationTypeController {
    private final IdentificationTypeService identificationTypeService;

    @Operation(summary = "Get identification type by id")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping("/{id}")
    public ResponseEntity<IdentificationTypeResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(identificationTypeService.getById(id));
    }

    @Operation(summary = "Get all identification types")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping()
    public ResponseEntity<List<IdentificationTypeResponseDto>> getAll() {
        return ResponseEntity.ok(identificationTypeService.getAll());
    }
}
