package com.beenabler.backend.exception;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class EntryNotFoundException extends Exception {

    public EntryNotFoundException(String message) {
        super(message);
    }
}
