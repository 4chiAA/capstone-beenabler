package com.beenabler.backend.service;

import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.model.BeehiveDTO;
import com.beenabler.backend.model.BeehiveType;
import com.beenabler.backend.repo.BeehiveRepo;
import org.junit.jupiter.api.Test;

import java.time.ZonedDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BeehiveServiceTest {

    BeehiveRepo beehiveRepo = mock(BeehiveRepo.class);
    IdService idService = mock(IdService.class);
    DateTimeService dateTimeService = mock(DateTimeService.class);
    BeehiveService beehiveService = new BeehiveService(beehiveRepo, idService, dateTimeService);

    @Test
    void getAllBeehives_whenCalledWith1Beehive_thenReturnAListWithThatBeehive() {
        //GIVEN
        String dateTimeNow = ZonedDateTime.now().toString();

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

    @Test
    void saveBeehive_whenSaveNewBeehive_thenReturnSavedBeehive() {
        //GIVEN
        BeehiveDTO beehiveDTO = new BeehiveDTO("Second Beehive", "under the tree", BeehiveType.NUCLEUS);
        Beehive beehiveToSave = new Beehive("2", "15.01.2024 11:00", "Second Beehive", "under the tree", BeehiveType.NUCLEUS);
        System.out.println(beehiveDTO);
        System.out.println(beehiveToSave);

        when(beehiveRepo.save(beehiveToSave)).thenReturn(beehiveToSave);
        when(idService.randomID()).thenReturn("2");
        when(dateTimeService.dateTimeNow()).thenReturn("15.01.2024 11:00");
        //WHEN
        Beehive actual = beehiveService.saveBeehive(beehiveDTO);
        //THEN
        Beehive expected = new Beehive("2", "15.01.2024 11:00", "Second Beehive", "under the tree", BeehiveType.NUCLEUS);
        verify(beehiveRepo).save(beehiveToSave);
        assertEquals(expected, actual);
    }
}
