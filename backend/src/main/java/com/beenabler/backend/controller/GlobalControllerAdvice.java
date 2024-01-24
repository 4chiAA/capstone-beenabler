package com.beenabler.backend.controller;

import com.beenabler.backend.exception.BeehiveNotFoundException;
import com.beenabler.backend.model.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(BeehiveNotFoundException.class)
    public ResponseEntity<ErrorMessage> handleBeehiveNotFoundException(BeehiveNotFoundException ex) {
        ErrorMessage errorMessage = new ErrorMessage("Ein Fehler ist aufgetreten: " + ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorMessage);
    }
}