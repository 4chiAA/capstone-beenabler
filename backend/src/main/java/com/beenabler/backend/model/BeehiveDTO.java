package com.beenabler.backend.model;

import lombok.With;

@With
public record BeehiveDTO(
    String name,
    String location,
    BeehiveType type){
}
