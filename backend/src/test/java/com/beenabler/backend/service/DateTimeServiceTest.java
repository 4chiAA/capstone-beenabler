package com.beenabler.backend.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class DateTimeServiceTest {

    @Test
    void dateTimeNow_whenDateTimeNowCalled_thenValidDateTimeReturned() {
        // GIVEN
        DateTimeService dateTimeService = new DateTimeService();
        String expectedFormat = "\\d{2}\\.\\d{2}\\.\\d{2}, \\d{2}:\\d{2}";

        // WHEN
        String actual = dateTimeService.dateTimeNow();

        // THEN
        assertNotNull(actual);
        assertTrue(actual.matches(expectedFormat));
    }
}
