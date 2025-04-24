package com.ungs.docsys.controllers;

import com.ungs.docsys.dtos.UserInfoRequestDto;
import com.ungs.docsys.services.UserInfoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/v1/users")
@AllArgsConstructor
public class UserInfoController {
    private final UserInfoService userInfoService;

    @Operation(summary = "Sign up a new user")
    @ApiResponse(responseCode = "201", description = "User created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input data")
    @ApiResponse(responseCode = "409", description = "User already exists")
    @PostMapping("/signUp")
    public ResponseEntity<Void> signUp(@RequestBody @Valid UserInfoRequestDto request) {
        userInfoService.signUp(request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
