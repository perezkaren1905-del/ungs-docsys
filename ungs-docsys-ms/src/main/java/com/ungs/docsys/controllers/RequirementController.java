package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.PageResponseDto;
import com.ungs.docsys.dtos.RequirementRequestDto;
import com.ungs.docsys.dtos.RequirementResponseDto;
import com.ungs.docsys.security.JwtUtil;
import com.ungs.docsys.services.RequirementService;
import com.ungs.docsys.utils.PageUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/v1/requirements")
@AllArgsConstructor
public class RequirementController {

    private final RequirementService requirementService;
    private final JwtUtil jwtUtil;

    @Operation(summary = "Get Requirement by id")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping("/{id}")
    public ResponseEntity<RequirementResponseDto> getByParams(
            @PathVariable Long id) {
        return ResponseEntity.ok(requirementService.getById(id));
    }

    @Operation(summary = "Get Requirements by params")
    @ApiResponse(responseCode = "200", description = "Success")
    @GetMapping()
    public ResponseEntity<PageResponseDto<RequirementResponseDto>> getByParams(
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "50") int size,
            @RequestParam(required = false) String[] sort) {
        return ResponseEntity.ok(new PageResponseDto<>(requirementService.getByParams(PageUtils.getPageable(page, size, sort))));
    }

    @Operation(summary = "Save requirement")
    @ApiResponse(responseCode = "200", description = "Success")
    @PostMapping()
    public ResponseEntity<RequirementResponseDto> save(
            @RequestHeader("Authorization") String authorization,
            @RequestBody @Valid RequirementRequestDto requirementRequestDto) {
        return ResponseEntity.ok(requirementService.save(requirementRequestDto, jwtUtil.extractUserClaim(authorization)));
    }

    @Operation(summary = "Partially Update requirement")
    @ApiResponse(responseCode = "200", description = "Success")
    @PatchMapping("/{id}")
    public ResponseEntity<RequirementResponseDto> partiallyUpdate(
            @RequestHeader("Authorization") String authorization,
            @PathVariable Long id, @RequestBody RequirementRequestDto requirementRequestDto) {
        return ResponseEntity.ok(requirementService.partiallyUpdate(requirementRequestDto, id, jwtUtil.extractUserClaim(authorization)));
    }
}
