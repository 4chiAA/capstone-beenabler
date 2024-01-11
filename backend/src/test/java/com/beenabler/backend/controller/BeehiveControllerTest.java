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

    private final String BASE_URL = "/api";
    @Autowired
    private MockMvc mvc;

    @Test
    @DirtiesContext
    void findAllBeehives_whenCalledInitially_thenReturnEmptyList() throws Exception {
        mvc.perform(MockMvcRequestBuilders.get(BASE_URL+"/beehives"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("[]"));
    }
}
