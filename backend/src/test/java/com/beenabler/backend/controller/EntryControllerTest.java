package com.beenabler.backend.controller;

import com.beenabler.backend.model.Beehive;
import com.beenabler.backend.model.BeehiveDTO;
import com.beenabler.backend.model.Entry;
import com.beenabler.backend.model.EntryDTO;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class EntryControllerTest {

    private final String BASE_URL_ENTRIES = "/api/entries";
    private final String BASE_URL_BEEHIVES = "/api/beehives";
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DirtiesContext
    void getAllEntriesForBeehive_whenCalledWithNonExistingId_thenReturnEmptyList() throws Exception {
        //GIVEN
        String beehiveId = "5";
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL_ENTRIES + "/" + beehiveId))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }

    @Test
    void getAllEntriesForBeehive_whenCalledWithValidBeehiveId_thenReturnAllEntriesForThatBeehive() throws Exception {
        //GIVEN
        BeehiveDTO beehiveDTO = new BeehiveDTO("First Beehive", "left", "Colony");
        String beehiveDTOJson = objectMapper.writeValueAsString(beehiveDTO);

        MvcResult resultBeehive = mockMvc.perform(post(BASE_URL_BEEHIVES)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(beehiveDTOJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        Beehive validBeehive = objectMapper.readValue(resultBeehive.getResponse().getContentAsString(), Beehive.class);
        String beehiveId = validBeehive.id();

        EntryDTO entryDTO = new EntryDTO("First entry", 15.0, 12.0, 6.0, false, true, true, true, false);
        String entryDTOJson = objectMapper.writeValueAsString(entryDTO);

        MvcResult resultEntry = mockMvc.perform(post(BASE_URL_ENTRIES + "/" + beehiveId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(entryDTOJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        Entry entry = objectMapper.readValue(resultEntry.getResponse().getContentAsString(), Entry.class);
        String entriesAsJson = objectMapper.writeValueAsString(List.of(entry));
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL_ENTRIES + "/" + beehiveId))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(entriesAsJson));
    }

    @Test
    void addEntryForBeehive_whenAnEntryIsSaved_thenReturnSavedEntry() throws Exception {
        //GIVEN
        BeehiveDTO beehiveDTO = new BeehiveDTO("First Beehive", "left", "Colony");
        String beehiveDTOJson = objectMapper.writeValueAsString(beehiveDTO);

        MvcResult resultBeehive = mockMvc.perform(post(BASE_URL_BEEHIVES)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(beehiveDTOJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        Beehive validBeehive = objectMapper.readValue(resultBeehive.getResponse().getContentAsString(), Beehive.class);
        String beehiveId = validBeehive.id();

        EntryDTO entryDTO = new EntryDTO("First entry", 15.0, 12.0, 6.0, false, true, true, true, false);

        //WHEN
        mockMvc.perform(post(BASE_URL_ENTRIES+ "/" + beehiveId, entryDTO)
                        //THEN
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(entryDTO)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$.title").value("First entry"))
                .andExpect(jsonPath("$.weight").value(15.0))
                .andExpect(jsonPath("$.feeding").value(12.0))
                .andExpect(jsonPath("$.queenCells").value(false));
    }

    @DirtiesContext
    @Test
    void deleteEntry_whenDeleteExistingEntry_thenDeleteentryById() throws Exception {
        //GIVEN
        BeehiveDTO beehiveDTO = new BeehiveDTO("First Beehive", "left", "Colony");
        String beehiveDTOJson = objectMapper.writeValueAsString(beehiveDTO);

        MvcResult resultBeehive = mockMvc.perform(post(BASE_URL_BEEHIVES)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(beehiveDTOJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        Beehive validBeehive = objectMapper.readValue(resultBeehive.getResponse().getContentAsString(), Beehive.class);
        String beehiveId = validBeehive.id();

        EntryDTO entryDTO = new EntryDTO("First entry", 15.0, 12.0, 6.0, false, true, true, true, false);
        String entryDTOJson = objectMapper.writeValueAsString(entryDTO);

        MvcResult resultEntry = mockMvc.perform(post(BASE_URL_ENTRIES + "/" + beehiveId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(entryDTOJson))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn();

        Entry entry = objectMapper.readValue(resultEntry.getResponse().getContentAsString(), Entry.class);
        String entryId = entry.id();
        //WHEN & THEN
        mockMvc.perform(delete("/api/entries/{entryId}", entryId))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
