package com.ungs.docsys.exception;

public class UnauthenticatedUserException extends RuntimeException {
    public UnauthenticatedUserException(String message) {
        super(message);
    }
}
