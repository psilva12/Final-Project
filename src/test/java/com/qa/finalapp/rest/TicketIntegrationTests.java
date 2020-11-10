package com.qa.finalapp.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.finalapp.domain.Comment;
import com.qa.finalapp.domain.Ticket;
import com.qa.finalapp.dto.TicketDTO;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Sql(scripts = {"classpath:ticket-schema.sql", "classpath:ticket-data.sql" }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
//@Sql(scripts = {"classpath:ticket-data.sql" }, executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@ActiveProfiles(profiles = "test")
public class TicketIntegrationTests {

    @Autowired
    private MockMvc mockMVC;

    @Autowired
    private ObjectMapper mapper;
//    @Test
//    void testCreate() throws Exception {
//        List<Comment> comments = new ArrayList<>();
//        Ticket newTicket= new Ticket("a", comments, "b", "c", "d", false, "e", 1);
//        String requestBody = this.mapper.writeValueAsString(newTicket);
//        RequestBuilder request = post("/createTicket").contentType(MediaType.APPLICATION_JSON).content(requestBody);
//
//        ResultMatcher checkStatus = status().is(201);
//
//        TicketDTO savedTicket= new TicketDTO("a", "b", "d", "c", false, "e",1);
//        savedTicket.setId(2L);
//
//        MvcResult result = this.mockMVC.perform(request).andExpect(checkStatus).andReturn();
//
//        String reqBody = result.getResponse().getContentAsString();
//
//        TicketDTO ticketResult = this.mapper.readValue(reqBody, TicketDTO.class);
//        Assertions.assertThat(ticketResult).isEqualToIgnoringGivenFields(savedTicket);
//    }

    @Test
    void testUpdate() throws Exception {
        List<Comment> comments = new ArrayList<>();
        TicketDTO newTicket= new TicketDTO("a", "b", "c", "d", false, "e",1);
        String requestBody = this.mapper.writeValueAsString(newTicket);

        RequestBuilder request = put("/updateTicket/1").contentType(MediaType.APPLICATION_JSON).content(requestBody);


        ResultMatcher checkStatus = status().isOk();
        TicketDTO savedTicket= new TicketDTO("a", "b", "c", "d", false,"e",1);
        savedTicket.setId(1L);

        MvcResult result = this.mockMVC.perform(request).andExpect(checkStatus).andReturn();

        String reqBody = result.getResponse().getContentAsString();

        TicketDTO ticketResult = this.mapper.readValue(reqBody, TicketDTO.class);
        Assertions.assertThat(ticketResult).isEqualToIgnoringGivenFields(savedTicket);
    }
    @Test
    void testDelete() throws Exception {
        RequestBuilder request = delete("/deleteTicket/1");

        ResultMatcher checkStatus = status().is(204);

        this.mockMVC.perform(request).andExpect(checkStatus);

    }

    @Test
    void testRead() throws Exception {
        List<Comment> comments = new ArrayList<>();
        TicketDTO ticket= new TicketDTO("a", "b", "c", "d", false,"e",1);
        ticket.setId(1L); // badger object to match the one in badger-data.sql
        List<TicketDTO> tickets = new ArrayList<>();
        tickets.add(ticket);
        String responseBody = this.mapper.writeValueAsString(tickets);

        this.mockMVC.perform(get("/getTickets")).andExpect(status().isOk()).andExpect(content().json(responseBody));
    }
}
