package com.beenabler.backend.service;

import com.beenabler.backend.repo.BeehiveRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BeehiveService {

    private final BeehiveRepo beehiveRepo;
}
