package com.beenabler.backend.controller;

import com.beenabler.backend.service.BeehiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class BeehiveController {

    private final BeehiveService beehiveService;
}
