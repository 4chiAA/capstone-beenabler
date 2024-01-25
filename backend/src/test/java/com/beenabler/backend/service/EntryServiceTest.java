package com.beenabler.backend.service;

import com.beenabler.backend.exception.BeehiveNotFoundException;
import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.model.Entry;
import com.beenabler.backend.model.EntryDTO;
import com.beenabler.backend.repo.BeehiveRepo;
import com.beenabler.backend.repo.EntryRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;


class EntryServiceTest {

    EntryRepo entryRepo = mock(EntryRepo.class);
    BeehiveRepo beehiveRepo = mock(BeehiveRepo.class);
    IdService idService = mock(IdService.class);
    DateTimeService dateTimeService = spy(new DateTimeService());
    EntryService entryService = new EntryService(entryRepo, beehiveRepo, idService, dateTimeService);

    String entryId = "1";
    String beehiveId = "111";
    String dateTime = dateTimeService.dateTimeNow();
    String entryTitle = "First entry";
    double entryWeight = 18;
    double entryFeeding = 12;
    double entryHoneyHarvest = 6.5;
    boolean entryVarroaTreatment = false;
    boolean entryQueen = true;
    boolean entryEggs = true;
    boolean entryBrood = true;
    boolean entryQueenCells = false;

    Entry entryTest = new Entry(entryId, beehiveId, dateTime, entryTitle, entryWeight, entryFeeding, entryHoneyHarvest, entryVarroaTreatment, entryQueen, entryEggs, entryBrood, entryQueenCells);
    EntryDTO entryDTOTest = new EntryDTO(entryTitle, entryWeight, entryFeeding, entryHoneyHarvest, entryVarroaTreatment, entryQueen, entryEggs, entryBrood, entryQueenCells);
    Beehive beehiveTest = new Beehive(beehiveId, dateTime, "First", "Front", "Colony");

    @Test
    void getAllEntriesForBeehive_whenCalledWithBeehiveId_thenReturnAllEntriesForThatBeehive() {
        //GIVEN
        List<Entry> allEntries = List.of(entryTest);
        when(entryRepo.findAllByBeehiveId(beehiveId)).thenReturn(allEntries);
        List<Entry> expected = List.of(entryTest);
        //WHEN
        List<Entry> actual = entryService.getAllEntriesForBeehive(beehiveId);
        //THEN
        verify(entryRepo).findAllByBeehiveId(beehiveId);
        assertEquals(expected, actual);
    }

    @Test
    void getAllEntriesForBeehive_whenCalledWithNoEntries_thenReturnEmptyList() {
        //GIVEN
        List<Entry> expected = List.of();
        //WHEN
        List<Entry> actual = entryService.getAllEntriesForBeehive(beehiveId);
        //THEN
        assertEquals(expected, actual);
    }

    @Test
    void addEntryForBeehive_whenAddNewEntryForBeehive_thenReturnAddedEntries() throws BeehiveNotFoundException {
        //GIVEN
        when(beehiveRepo.findById(beehiveId)).thenReturn(Optional.of(beehiveTest));
        when(idService.randomID()).thenReturn(entryId);
        when(dateTimeService.dateTimeNow()).thenReturn(dateTime);
        Entry expected = entryTest;
        //WHEN
        Entry actual = entryService.addEntryForBeehive(beehiveId, entryDTOTest);
        //THEN
        verify(entryRepo).save(expected);
        assertEquals(expected, actual);
    }

    @Test
    void addEntryForBeehive_whenAddNewEntryForNonExistingId_thenThrowException() {
        //GIVEN
        when(beehiveRepo.findById("invalidId")).thenReturn(Optional.empty());
        //WHEN & THEN
        assertThrows(BeehiveNotFoundException.class, () -> entryService.addEntryForBeehive("invalidId", entryDTOTest));
    }
}
