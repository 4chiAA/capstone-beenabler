package com.beenabler.backend.controller;

import com.beenabler.backend.exception.BeehiveNotFoundException;
import com.beenabler.backend.model.Entry;
import com.beenabler.backend.model.EntryDTO;
import com.beenabler.backend.service.EntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
@RequiredArgsConstructor
public class EntryController {

    private final EntryService entryService;

    @GetMapping("/{beehiveId}")
    public List<Entry> getAllEntries(@PathVariable String beehiveId) {
        return entryService.getAllEntriesForBeehive(beehiveId);
    }

    @PostMapping("/{beehiveId}")
    public ResponseEntity<Entry> addEntry(@PathVariable String beehiveId, @RequestBody EntryDTO newEntryDTO) {
        try {
            Entry newEntry = entryService.addEntryForBeehive(beehiveId, newEntryDTO);
            return ResponseEntity.ok(newEntry);
        } catch (BeehiveNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }
}
