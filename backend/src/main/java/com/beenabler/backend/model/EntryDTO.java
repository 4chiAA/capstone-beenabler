package com.beenabler.backend.model;

public record EntryDTO (
    String title,
    double weight,
    double feeding,
    double honeyHarvest,
    boolean varroaTreatment,
    boolean queen,
    boolean eggs,
    boolean brood,
    boolean queenCells
) {
}
