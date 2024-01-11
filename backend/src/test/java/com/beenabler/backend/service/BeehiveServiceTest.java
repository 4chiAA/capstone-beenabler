package com.beenabler.backend.service;

import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.model.BeehiveType;
import com.beenabler.backend.repo.BeehiveRepo;
import org.junit.jupiter.api.Test;

import java.time.Clock;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BeehiveServiceTest {

    BeehiveRepo beehiveRepo = mock(BeehiveRepo.class);
    BeehiveService beehiveService = new BeehiveService(beehiveRepo);

    @Test
    void getAllBeehives_whenCalled_thenReturnAllBeehives() {
        //GIVEN
        ZonedDateTime mockCurrentTime = ZonedDateTime.of(2024, 1, 10, 12, 0, 0, 0, ZoneId.systemDefault());
        Clock fixedClock = Clock.fixed(mockCurrentTime.toInstant(), ZoneId.systemDefault());
        ZonedDateTime fixedDateTime = ZonedDateTime.now(fixedClock);

        List<Beehive> beehives = List.of(new Beehive("1", fixedDateTime, "First Beehive", "left", BeehiveType.COLONY));
        when(beehiveRepo.findAll()).thenReturn(beehives);

        //WHEN
        List<Beehive> actual = beehiveService.getAllBeehives();

        //THEN
        List<Beehive> expected = List.of(new Beehive("1", fixedDateTime, "First Beehive", "left", BeehiveType.COLONY));

        verify(beehiveRepo).findAll();
        assertEquals(expected, actual);
    }
}
