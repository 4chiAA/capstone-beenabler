package com.beenabler.backend.service;

import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.model.BeehiveDTO;
import com.beenabler.backend.repo.BeehiveRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BeehiveService {

    private final BeehiveRepo beehiveRepo;
    private final IdService idService;

    public List<Beehive> getAllBeehives() {
        return beehiveRepo.findAll();
    }

    public Beehive saveBeehive(BeehiveDTO beehiveDTO) {
        Beehive newBeehive = new Beehive(idService.randomID(), ZonedDateTime.now(), beehiveDTO.name(), beehiveDTO.location(), beehiveDTO.type());
        return beehiveRepo.save(newBeehive);
    }
}
