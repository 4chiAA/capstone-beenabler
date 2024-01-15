package com.beenabler.backend.service;

import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class DateTimeService {

    public String dateTimeNow(){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MMMM.yyyy HH:mm");
        return formatter.format(ZonedDateTime.now());
    }
}
