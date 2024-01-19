package com.beenabler.backend.service;

import com.beenabler.backend.exception.BeehiveNotFoundException;
import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.model.BeehiveDTO;
import com.beenabler.backend.repo.BeehiveRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BeehiveService {

    private final BeehiveRepo beehiveRepo;
    private final IdService idService;
    private final DateTimeService dateTimeService;

    public List<Beehive> getAllBeehives() {
        return beehiveRepo.findAll();
    }

    public Beehive getBeehiveById(String id) throws BeehiveNotFoundException {
        return beehiveRepo.findById(id)
                .orElseThrow(() -> new BeehiveNotFoundException("Beehive not found"));
    }

    public Beehive saveBeehive(BeehiveDTO beehiveDTO) {
        Beehive newBeehive = new Beehive(idService.randomID(), dateTimeService.dateTimeNow(), beehiveDTO.name(), beehiveDTO.location(), beehiveDTO.type());
        return beehiveRepo.save(newBeehive);
    }

    public void deleteBeehive(String id) {
        beehiveRepo.deleteById(id);
    }
}
