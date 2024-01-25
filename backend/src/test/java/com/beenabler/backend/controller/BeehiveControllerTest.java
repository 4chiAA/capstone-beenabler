package com.beenabler.backend.controller;

import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.model.BeehiveDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class BeehiveControllerTest {

    private final String BASE_URL = "/api/beehives";
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void getAllBeehives_whenCalledInitially_thenReturnEmptyList() throws Exception {
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    @DirtiesContext
    void getAllBeehives_whenBeehiveWithValidIdIsGiven_thenReturnListWithBeehive1() throws Exception {
        //GIVEN
        BeehiveDTO firstBeehiveDTO = new BeehiveDTO("First Beehive", "left", "Colony");
        String firstBeehiveDTOJson = objectMapper.writeValueAsString(firstBeehiveDTO);

        MvcResult result = mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(firstBeehiveDTOJson))
                .andReturn();

        Beehive beehiveInDB = objectMapper.readValue(result.getResponse().getContentAsString(), Beehive.class);
        String beehivesAsJson = objectMapper.writeValueAsString(List.of(beehiveInDB));
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(beehivesAsJson));
    }

    @DirtiesContext
    @Test
    void getBeehiveById_whenBeehiveWithIdIsGiven_thenReturnThisBeehive() throws Exception {
        //GIVEN
        BeehiveDTO secondBeehiveDTO = new BeehiveDTO("Second Beehive", "right", "Colony");
        String secondBeehiveDTOJson = objectMapper.writeValueAsString(secondBeehiveDTO);

        String actual = mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(secondBeehiveDTOJson))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Beehive actualBeehive = objectMapper.readValue(actual, Beehive.class);
        String id = actualBeehive.id();
        String dateTime = actualBeehive.dateTime();
        //WHEN
        mockMvc.perform(get(BASE_URL + "/" + id))
                //THEN
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "id": "<ID>",
                            "dateTime": "<DATETIME>",
                            "name": "Second Beehive",
                            "location": "right",
                            "type": "Colony"
                        }
                        """.replaceFirst("<ID>", id)
                        .replaceFirst("<DATETIME>", dateTime)));
    }

    @DirtiesContext
    @Test
    void saveBeehive_whenABeehiveIsSaved_thenReturnSavedBeehive() throws Exception {
        //GIVEN
        BeehiveDTO beehiveDTO = new BeehiveDTO("crazy bees", "up hill", "Nucleus");
        //WHEN
        mockMvc.perform(post(BASE_URL)
                        //THEN
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(beehiveDTO)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$.name").value("crazy bees"))
                .andExpect(jsonPath("$.location").value("up hill"))
                .andExpect(jsonPath("$.type").value("Nucleus"));
    }

    @Test
    void updateBeehive_whenValidIdAndUpdatedInputIsGiven_thenReturnUpdatedBeehive() throws Exception {
        //GIVEN
        BeehiveDTO beehiveDTO = new BeehiveDTO("First Beehive", "left", "Colony");
        String beehiveDTOJson = objectMapper.writeValueAsString(beehiveDTO);

        MvcResult result = mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(beehiveDTOJson))
                        .andReturn();

        Beehive beehiveInDatabase = objectMapper.readValue(result.getResponse().getContentAsString(), Beehive.class);
        String beehiveIdInDatabase = beehiveInDatabase.id();

        Beehive updatedBeehive = new Beehive(beehiveIdInDatabase, beehiveInDatabase.dateTime(), "Updated First Beehive", "right", "Colony");

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/" + beehiveIdInDatabase)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedBeehive)))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.id").value(beehiveIdInDatabase))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(updatedBeehive.name()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.location").value(updatedBeehive.location()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.type").value(updatedBeehive.type()));
    }

    @Test
    void updateBeehive_whenInvalidIdProvided_shouldReturnNotFound() throws Exception {
        //GIVEN
        String invalidId = "999";
        Beehive updatedBeehive = new Beehive("1", "10.01.24, 12:00", "New Hive", "New Location", "Nucleus");

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put(BASE_URL + "/" + invalidId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updatedBeehive)))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isNotFound());
    }

    @DirtiesContext
    @Test
    void deleteBeehive_whenDeleteExistingBeehive_thenDeleteBeehiveById() throws Exception {
        //GIVEN
        BeehiveDTO existingBeehiveDTO = new BeehiveDTO("Beehive", "here", "Colony");

        String existing = mockMvc.perform(post(BASE_URL)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(existingBeehiveDTO)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Beehive existingBeehive = objectMapper.readValue(existing, Beehive.class);
        String existingId = existingBeehive.id();
        //WHEN & THEN
        mockMvc.perform(delete("/api/beehives/{id}", existingId))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
