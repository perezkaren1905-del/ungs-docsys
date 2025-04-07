package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.DictamenDataResponseDto;
import com.ungs.docsys.services.DictamenDataService;
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
@RequestMapping("/dictamen-data")
@AllArgsConstructor
public class DictamenDataController {

    private DictamenDataService dictamenDataService;

    @Operation(summary = "Obtiene un dictamen de ejemplo", description = "Este endpoint retorna un objeto simple de dictamen.")
    @ApiResponse(responseCode = "200", description = "Operación exitosa")
    @GetMapping("/{id}")
    public ResponseEntity<DictamenDataResponseDto> getById(@PathVariable Long id) {
        return ResponseEntity.ok(dictamenDataService.getById(id));
    }

    @Operation(summary = "Obtiene todos los dictámenes", description = "Este endpoint retorna un listado de dictamen.")
    @ApiResponse(responseCode = "200", description = "Operación exitosa")
    @GetMapping()
    public ResponseEntity<List<DictamenDataResponseDto>> getAll() {
        return ResponseEntity.ok(dictamenDataService.getAll());
    }
}
