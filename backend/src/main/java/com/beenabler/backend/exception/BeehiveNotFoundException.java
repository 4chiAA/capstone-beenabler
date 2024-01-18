package com.beenabler.backend.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class BeehiveNotFoundException extends Exception {

    public BeehiveNotFoundException(String message) {
        super(message);
    }
}
