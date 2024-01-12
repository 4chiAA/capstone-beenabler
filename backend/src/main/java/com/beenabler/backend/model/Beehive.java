package com.beenabler.backend.model;
import java.time.ZonedDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Beehive {
    private String id;
    private ZonedDateTime dateTime;
    private String name;
    private String location;
    private BeehiveType type;
}
