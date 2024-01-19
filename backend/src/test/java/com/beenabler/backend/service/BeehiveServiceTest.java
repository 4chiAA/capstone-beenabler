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
    DateTimeService dateTimeService = spy(new DateTimeService());
    BeehiveService beehiveService = new BeehiveService(beehiveRepo, idService, dateTimeService);

    String beehiveId = "1";
    String beehiveDateTime = dateTimeService.dateTimeNow();
    String beehiveName = "Buzzing";
    String beehiveLocation = "under the tree";
    String beehiveType = "Colony";
    Beehive testBeehive = new Beehive(beehiveId, beehiveDateTime, beehiveName, beehiveLocation, beehiveType);
    BeehiveDTO beehiveTestDto = new BeehiveDTO(beehiveName, beehiveLocation, beehiveType);

    @Test
    void getAllBeehives_whenCalledWith1Beehive_thenReturnAListWithThatBeehive() {
        //GIVEN
        List<Beehive> beehives = List.of(testBeehive);
        when(beehiveRepo.findAll()).thenReturn(beehives);
        List<Beehive> expected = List.of(testBeehive);
        //WHEN
        List<Beehive> actual = beehiveService.getAllBeehives();
        //THEN
        verify(beehiveRepo).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void getBeehiveById_whenCalledBeehiveId_thenReturnThisBeehive() throws BeehiveNotFoundException {
        //GIVEN
        when(beehiveRepo.findById(beehiveId)).thenReturn(Optional.of(testBeehive));
        Beehive expected = testBeehive;
        //WHEN
        Beehive actual = beehiveService.getBeehiveById(beehiveId);
        //THEN
        verify(beehiveRepo).findById(beehiveId);
        assertEquals(expected, actual);
    }

    @Test
    void getBeehiveById_whenCalledWithInvalidId_thenThrowBeehiveNotFoundException() throws BeehiveNotFoundException {
        //GIVEN
        //WHEN
        //THEN
        try {
            beehiveService.getBeehiveById(beehiveId);
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
        when(idService.randomID()).thenReturn("1");
        when(dateTimeService.dateTimeNow()).thenReturn("10.01.24, 12:00");
        Beehive expected = new Beehive("1", "10.01.24, 12:00", testBeehive.name(), testBeehive.location(), testBeehive.type());
        //WHEN
        Beehive actual = beehiveService.saveBeehive(beehiveTestDto);
        //THEN
        verify(beehiveRepo).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void deleteBeehive_whenDeleteBeehiveWithId_thenDeleteBeehiveById() throws BeehiveNotFoundException {
        //GIVEN
        when(beehiveRepo.findById(beehiveId)).thenReturn(Optional.of(testBeehive));
        Beehive expected = testBeehive;
        //WHEN
        Beehive actual = beehiveService.deleteBeehive(beehiveId);
        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void deleteBeehive_whenDeleteWithNonExistingId_thenReturnNull() {
        //GIVEN
        when(beehiveRepo.findById("Beehive not found")).thenReturn(Optional.empty());
        //WHEN & THEN
        assertThrows(BeehiveNotFoundException.class, () -> beehiveService.deleteBeehive("Beehive not found"));
    }
}
