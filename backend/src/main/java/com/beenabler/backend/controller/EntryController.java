package com.beenabler.backend.controller;

import com.beenabler.backend.model.Entry;
import com.beenabler.backend.service.EntryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/entries")
@RequiredArgsConstructor
public class EntryController {

    private final EntryService entryService;

    @GetMapping("/{id}")
    public List<Entry> getAllEntries(@PathVariable String id) {
        return entryService.getAllEntries(id);
    }
}
