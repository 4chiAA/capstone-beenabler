package com.beenabler.backend.service;

import org.junit.jupiter.api.Test;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

class IdServiceTest {

    @Test
    void randomID_whenRandomIDCalled_thenValidUUIDReturned() {
        // GIVEN
        IdService idService = new IdService();
        // WHEN
        String actual = idService.randomID();
        // THEN
        assertNotNull(actual);
        assertTrue(isValidUUID(actual));
    }

    private boolean isValidUUID(String uuid) {
        try {
            UUID.fromString(uuid);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}