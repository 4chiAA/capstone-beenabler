package com.beenabler.backend.service;

import com.beenabler.backend.exception.BeehiveNotFoundException;
import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.model.BeehiveDTO;
import com.beenabler.backend.repo.BeehiveRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BeehiveService {

    private final BeehiveRepo beehiveRepo;
    private final IdService idService;
    private final DateTimeService dateTimeService;

    private static final String BEEHIVE_NOT_FOUND_MESSAGE = "Beehive not found";

        public List<Beehive> getAllBeehives() {
        return beehiveRepo.findAll();
    }

    public Beehive getBeehiveById(String id) throws BeehiveNotFoundException {
        return beehiveRepo.findById(id)
                .orElseThrow(() -> new BeehiveNotFoundException(BEEHIVE_NOT_FOUND_MESSAGE));
    }

    public Beehive saveBeehive(BeehiveDTO beehiveDTO) {
        Beehive newBeehive = new Beehive(idService.randomID(), dateTimeService.dateTimeNow(), beehiveDTO.name(), beehiveDTO.location(), beehiveDTO.type());
        beehiveRepo.save(newBeehive);
        return newBeehive;
    }

    public Beehive deleteBeehive(String id) throws BeehiveNotFoundException {
        Optional<Beehive> optionalBeehive = beehiveRepo.findById(id);

        if (optionalBeehive.isPresent()) {
            Beehive deletedBeehive = optionalBeehive.get();
            beehiveRepo.deleteById(id);
            return deletedBeehive;
        } else {
            throw new BeehiveNotFoundException(BEEHIVE_NOT_FOUND_MESSAGE);
        }
    }

    public Beehive updateBeehive(String beehiveId, Beehive updatedBeehive) throws BeehiveNotFoundException {
        Optional<Beehive> optionalBeehive = beehiveRepo.findById(beehiveId);

        if (optionalBeehive.isPresent()) {
            Beehive existingBeehive = optionalBeehive.get();

            Beehive updated = existingBeehive.withDateTime(dateTimeService.dateTimeNow())
                                                .withName(updatedBeehive.name())
                                                .withLocation(updatedBeehive.location())
                                                .withType(updatedBeehive.type());

            beehiveRepo.save(updated);
            beehiveRepo.deleteById(beehiveId);
            return updated;
        } else {
            throw new BeehiveNotFoundException(BEEHIVE_NOT_FOUND_MESSAGE);
        }
    }
}
