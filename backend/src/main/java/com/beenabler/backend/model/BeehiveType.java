package com.beenabler.backend.model;

public enum BeehiveType {
    COLONY("colony"),
    NUCLEUS("nucleus");

    private final String type;

    BeehiveType(String type){
        this.type = type;
    }

    @Override
    public String toString() {
        return type;
    }
}
