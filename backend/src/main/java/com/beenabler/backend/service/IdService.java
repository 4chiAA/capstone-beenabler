package com.beenabler.backend.service;

import java.util.UUID;

public class IdService {

    public String randomID(){
        return UUID.randomUUID().toString();
    }
}
