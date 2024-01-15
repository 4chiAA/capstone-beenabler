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
    IdService idService = new IdService();
    BeehiveService beehiveService = new BeehiveService(beehiveRepo, idService);

    @Test
    void getAllBeehives_whenCalledWith1Beehive_thenReturnAListWithThatBeehive() {
        //GIVEN
        ZonedDateTime dateTimeNow = ZonedDateTime.now();

        List<Beehive> beehives = List.of(new Beehive("1", dateTimeNow, "First Beehive", "left", BeehiveType.COLONY));
        when(beehiveRepo.findAll()).thenReturn(beehives);

        //WHEN
        List<Beehive> actual = beehiveService.getAllBeehives();

        //THEN
        List<Beehive> expected = List.of(new Beehive("1", dateTimeNow, "First Beehive", "left", BeehiveType.COLONY));

        verify(beehiveRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getAllBeehives_whenCalledWithNoBeehives_thenReturnEmptyList() {
        //GIVEN
        //WHEN
        List<Beehive> actual = beehiveService.getAllBeehives();
        //THEN
        List<Beehive> expected = List.of();
        assertEquals(expected, actual);
    }
}
