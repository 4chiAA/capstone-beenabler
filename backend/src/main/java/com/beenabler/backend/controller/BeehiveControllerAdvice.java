package com.beenabler.backend.controller;

import com.beenabler.backend.exception.BeehiveNotFoundException;
import com.beenabler.backend.model.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@ResponseStatus(HttpStatus.BAD_REQUEST)
public class BeehiveControllerAdvice {

    @ExceptionHandler(BeehiveNotFoundException.class)
    public ErrorMessage handleGlobalException(BeehiveNotFoundException ex) {
        return new ErrorMessage("Ein Fehler ist aufgetreten: " + ex.getMessage());
    }
}