package com.beenabler.backend.repo;

import com.beenabler.backend.model.Entry;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntryRepo extends MongoRepository<Entry, String> {
    List<Entry> findAllByBeehiveId(String beehiveId);
}
