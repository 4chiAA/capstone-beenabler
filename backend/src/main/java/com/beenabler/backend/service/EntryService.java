package com.beenabler.backend.service;

import com.beenabler.backend.exception.BeehiveNotFoundException;
import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.model.Entry;
import com.beenabler.backend.model.EntryDTO;
import com.beenabler.backend.repo.BeehiveRepo;
import com.beenabler.backend.repo.EntryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EntryService {

    private final EntryRepo entryRepo;
    private final BeehiveRepo beehiveRepo;
    private final IdService idService;
    private final DateTimeService dateTimeService;

    private static final String BEEHIVE_NOT_FOUND_MESSAGE = "Beehive not found";

    public List<Entry> getAllEntriesForBeehive(String beehiveId) {
        return entryRepo.findAllByBeehiveId(beehiveId);
    }

    public Entry addEntryForBeehive(String beehiveId, EntryDTO entryDTO) throws BeehiveNotFoundException {
        Optional<Beehive> optionalBeehive = beehiveRepo.findById(beehiveId);
        if (optionalBeehive.isPresent()) {
            Entry newEntry = new Entry(idService.randomID(),
                    beehiveId,
                    dateTimeService.dateTimeNow(),
                    entryDTO.title(),
                    entryDTO.weight(),
                    entryDTO.feeding(),
                    entryDTO.honeyHarvest(),
                    entryDTO.varroaTreatment(),
                    entryDTO.queen(),
                    entryDTO.eggs(),
                    entryDTO.brood(),
                    entryDTO.queenCells());
            entryRepo.save(newEntry);
            return newEntry;
        } else {
            throw new BeehiveNotFoundException(BEEHIVE_NOT_FOUND_MESSAGE);
        }
    }
}
