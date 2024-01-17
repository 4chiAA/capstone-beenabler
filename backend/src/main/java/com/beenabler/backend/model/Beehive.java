package com.beenabler.backend.model;

import lombok.With;

@With
public record Beehive (
    String id,
    String dateTime,
    String name,
    String location,
    String type){
}
