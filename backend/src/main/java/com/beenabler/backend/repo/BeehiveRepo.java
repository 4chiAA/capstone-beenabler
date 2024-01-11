package com.beenabler.backend.repo;

import com.beenabler.backend.model.Beehive;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BeehiveRepo extends MongoRepository<Beehive, String> {
}
