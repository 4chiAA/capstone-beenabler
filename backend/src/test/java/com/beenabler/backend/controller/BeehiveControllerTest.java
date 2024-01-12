package com.beenabler.backend.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
class BeehiveControllerTest {

    private final String BASE_URL = "/api/beehives";
    @Autowired
    private MockMvc mockMvc;

    @Test
    @DirtiesContext
    void getAllBeehives_whenCalledInitially_thenReturnEmptyList() throws Exception {
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get(BASE_URL))
                //THEN
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }
}
