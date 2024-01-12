package com.beenabler.backend.controller;

import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.service.BeehiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/beehives")
@RequiredArgsConstructor
public class BeehiveController {

    private final BeehiveService beehiveService;

    @GetMapping()
    public List<Beehive> getAllBeehives(){
        return beehiveService.getAllBeehives();
    }
}
