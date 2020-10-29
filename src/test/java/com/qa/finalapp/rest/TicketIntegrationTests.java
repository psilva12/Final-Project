package com.qa.finalapp.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.finalapp.domain.Comment;
import com.qa.finalapp.domain.Ticket;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts = {"classpath:ticket-data.sql" }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
public class TicketIntegrationTests {

    @Autowired
    private MockMvc mockMVC;

    @Autowired
    private ObjectMapper mapper;
    @Test
    void testCreate() throws Exception {
        List<Comment> comments = new ArrayList<>();
        Ticket newTicket= new Ticket("a", comments, "b", "c", "d", false);
        String requestBody = this.mapper.writeValueAsString(newTicket);
        RequestBuilder request = post("/createTicket").contentType(MediaType.APPLICATION_JSON).content(requestBody);

        ResultMatcher checkStatus = status().is(201);

        Ticket savedTicket= new Ticket("a", comments, "b", "c", "d", false);
        savedTicket.setId(2L);

        String resultBody = this.mapper.writeValueAsString(savedTicket);
        ResultMatcher checkBody = content().json(resultBody);

        this.mockMVC.perform(request).andExpect(checkStatus).andExpect(checkBody);

        MvcResult result = this.mockMVC.perform(request).andExpect(checkStatus).andReturn();

        // In case you need to access the actual result as an object:
        String reqBody = result.getResponse().getContentAsString();

        Ticket ticketResult = this.mapper.readValue(reqBody, Ticket.class);
    }
}
