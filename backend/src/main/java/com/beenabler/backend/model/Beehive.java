package com.beenabler.backend.model;
import java.time.ZonedDateTime;

import lombok.With;

@With
public record Beehive (
    String id,
    ZonedDateTime dateTime,
    String name,
    String location,
    BeehiveType type){
}
