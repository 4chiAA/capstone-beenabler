package com.beenabler.backend.service;

import com.beenabler.backend.model.Entry;
import com.beenabler.backend.repo.EntryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EntryService {

    private final EntryRepo entryRepo;
    private final IdService idService;
    private final DateTimeService dateTimeService;

    public List<Entry> getAllEntries(String beehiveId) {
        return entryRepo.findAllByBeehiveId(beehiveId);
    }

}
