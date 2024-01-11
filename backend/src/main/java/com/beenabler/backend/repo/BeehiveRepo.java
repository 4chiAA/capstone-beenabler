package com.beenabler.backend.repo;

import com.beenabler.backend.model.Beehive;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BeehiveRepo extends MongoRepository<Beehive, String> {
}
