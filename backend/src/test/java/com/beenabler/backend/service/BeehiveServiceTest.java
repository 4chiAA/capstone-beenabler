package com.beenabler.backend.service;

import com.beenabler.backend.exception.BeehiveNotFoundException;
import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.model.BeehiveDTO;
import com.beenabler.backend.repo.BeehiveRepo;
import org.junit.jupiter.api.Test;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
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
        List<Beehive> beehives = List.of(new Beehive("1", dateTimeNow, "First Beehive", "left", "Colony"));
        when(beehiveRepo.findAll()).thenReturn(beehives);
        //WHEN
        List<Beehive> actual = beehiveService.getAllBeehives();
        //THEN
        List<Beehive> expected = List.of(new Beehive("1", dateTimeNow, "First Beehive", "left", "Colony"));

        verify(beehiveRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getBeehiveById_whenCalledBeehiveId_thenReturnThisBeehive() throws BeehiveNotFoundException {
        //GIVEN
        String id = "1";
        DateTimeService dateTimeService = new DateTimeService();
        Beehive expected = new Beehive("1", dateTimeService.dateTimeNow(), "My Beehive", "last spot", "Colony");
        when(beehiveRepo.findById(id)).thenReturn(Optional.of(expected));
        //WHEN
        Beehive actual = beehiveService.getBeehiveById(id);
        //THEN
        verify(beehiveRepo).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void getBeehiveById_whenCalledWithInvalidId_thenThrowBeehiveNotFoundException() throws BeehiveNotFoundException {
        //GIVEN
        String id = "1";
        //WHEN
        //THEN
        try {
            beehiveService.getBeehiveById(id);
            fail();
        } catch (BeehiveNotFoundException e) {
            assertTrue(true);
        }
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
        BeehiveDTO beehiveDTO = new BeehiveDTO("Second Beehive", "under the tree", "Nucleus");
        Beehive beehiveToSave = new Beehive("2", "15.01.2024 11:00", "Second Beehive", "under the tree", "Nucleus");

        when(beehiveRepo.save(beehiveToSave)).thenReturn(beehiveToSave);
        when(idService.randomID()).thenReturn("2");
        when(dateTimeService.dateTimeNow()).thenReturn("15.01.2024 11:00");
        //WHEN
        Beehive actual = beehiveService.saveBeehive(beehiveDTO);
        //THEN
        Beehive expected = new Beehive("2", "15.01.2024 11:00", "Second Beehive", "under the tree", "Nucleus");
        verify(beehiveRepo).save(beehiveToSave);
        assertEquals(expected, actual);
    }

    @Test
    void deleteBeehive_whenDeleteBeehiveWithId_thenDeleteBeehiveById() {
        //GIVEN
        String beehiveIdToDelete = "123";
        //WHEN
        beehiveService.deleteBeehive(beehiveIdToDelete);
        //THEN
        verify(beehiveRepo, times(1)).deleteById(beehiveIdToDelete);
    }

    @Test
    void deleteBeehive_whenDeleteWithNonExistingId_thenReturnNull() {
        //GIVEN
        String nonExistingId = "non-existing-id";
        //WHEN & THEN
        assertDoesNotThrow(() -> beehiveService.deleteBeehive(nonExistingId));
    }
}
