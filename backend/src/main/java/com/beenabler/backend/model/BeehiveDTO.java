package com.beenabler.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BeehiveDTO {
    private String name;
    private String location;
    private BeehiveType type;
}
