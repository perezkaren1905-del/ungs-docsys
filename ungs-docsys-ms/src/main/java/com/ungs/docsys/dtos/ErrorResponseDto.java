package com.ungs.docsys.dtos;

import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Getter
public class ErrorResponseDto {
    private final HttpStatus httpStatusDescription;
    private final int httpStatusCode;
    private final String message;
    private final LocalDateTime timestamp;

    public ErrorResponseDto(HttpStatus status, String message) {
        this.httpStatusDescription = status;
        this.httpStatusCode = status.value();
        this.message = message;
        this.timestamp = LocalDateTime.now();
    }
}
