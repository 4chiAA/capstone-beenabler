package com.beenabler.backend.model;

import lombok.With;

@With
public record Entry(
        String id,
        String beehiveId,
        String dateTime,
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
