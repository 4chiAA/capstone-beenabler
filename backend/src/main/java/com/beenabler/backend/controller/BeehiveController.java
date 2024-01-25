package com.beenabler.backend.controller;

import com.beenabler.backend.exception.BeehiveNotFoundException;
import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.model.BeehiveDTO;
import com.beenabler.backend.service.BeehiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/beehives")
@RequiredArgsConstructor
public class BeehiveController {

    private final BeehiveService beehiveService;

    @GetMapping
    public List<Beehive> getAllBeehives(){
        return beehiveService.getAllBeehives();
    }

    @GetMapping("/{id}")
    public Beehive getBeehiveById(@PathVariable String id) throws BeehiveNotFoundException {
        return beehiveService.getBeehiveById(id);
    }

    @PostMapping
    public Beehive addBeehive(@RequestBody BeehiveDTO beehive){
        return beehiveService.addBeehive(beehive);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Beehive> updateBeehive(@PathVariable String id, @RequestBody Beehive updatedBeehive) {
        try {
            Beehive updated = beehiveService.updateBeehive(id, updatedBeehive);
            return ResponseEntity.ok(updated);
        } catch (BeehiveNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteBeehive (@PathVariable String id) throws BeehiveNotFoundException {
        beehiveService.deleteBeehive(id);
    }
}
