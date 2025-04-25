package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.NationalityResponseDto;
import com.ungs.docsys.dtos.PermissionResponseDto;
import com.ungs.docsys.services.PermissionService;
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
@RequestMapping("/v1/permissions")
@AllArgsConstructor
public class PermissionController {
    private final PermissionService permissionService;

    @Operation(summary = "Get permission by id")
    @ApiResponse(responseCode = "200", description = "Success")
    @ApiResponse(responseCode = "404", description = "Not found")
    @GetMapping("/{id}")
    public ResponseEntity<PermissionResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(permissionService.getById(id));
    }

    @Operation(summary = "Get all permissions")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping()
    public ResponseEntity<List<PermissionResponseDto>> getAll() {
        return ResponseEntity.ok(permissionService.getAll());
    }
}
