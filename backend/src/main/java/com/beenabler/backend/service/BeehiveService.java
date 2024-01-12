package com.beenabler.backend.service;

import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.repo.BeehiveRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BeehiveService {

    private final BeehiveRepo beehiveRepo;

    public List<Beehive> getAllBeehives() {
        return beehiveRepo.findAll();
    }
}
