package com.qa.finalapp.service;
import com.qa.finalapp.domain.Comment;
import com.qa.finalapp.domain.Ticket;
import com.qa.finalapp.dto.CommentDTO;
import com.qa.finalapp.dto.TicketDTO;
import com.qa.finalapp.repo.TicketRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultMatcher;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@ActiveProfiles(profiles = "test")
public class TicketServiceUnitTest {
    @Autowired
    private TicketService service;

    @MockBean
    private TicketRepository repo;

    @MockBean
    private ModelMapper mapper;
    TicketDTO mapToDTO(Ticket ticket){
        return this.mapper.map(ticket, TicketDTO.class);
    }
    @Test
    void testCreate() {
        Long id = 1L;
        List<Comment> comments = new ArrayList<>();
        Ticket newTicket = new Ticket("a", comments, "b", "c", "d", false, "e",1);
        Ticket savedTicket = new Ticket("a", comments, "b", "c", "d", false, "e",1);

        savedTicket.setId(id);
        Mockito.when(this.repo.save(newTicket)).thenReturn(savedTicket);

        assertThat(this.service.createTicket(newTicket)).isEqualTo(mapToDTO(savedTicket));

        Mockito.verify(this.repo, Mockito.times(1)).save(newTicket);
    }

    @Test
    void testUpdate() {
        Long id = 1L;
        List<Comment> comments = new ArrayList<>();
        Ticket newTicket = new Ticket("a", comments, "b", "c", "d", false, "e",1);
        Ticket oldTicket = new Ticket("a", comments, "b", "c", "d", false, "e",1);
        oldTicket.setId(id);

        Ticket updatedTicket = new Ticket("a", comments, "b", "c", "d", false, "e",1);
        updatedTicket.setId(id);
        Mockito.when(this.repo.findById(id)).thenReturn(Optional.of(oldTicket));

        Mockito.when(this.repo.save(updatedTicket)).thenReturn(updatedTicket);

        assertThat(this.service.updateTicket(id, newTicket)).isEqualTo(mapToDTO(this.repo.save(updatedTicket)));


        Mockito.verify(this.repo, Mockito.times(1)).findById(id);
        Mockito.verify(this.repo, Mockito.times(1)).save(updatedTicket);
    }

    @Test
    void testGet() {

        List<Comment> comments = new ArrayList<>();
        Ticket ticket = new Ticket("a", comments, "b", "c", "d", false, "e",1);
        ticket.setId(1L); // badger object to match the one in badger-data.sql
        List<Ticket> tickets = new ArrayList<>();
        tickets.add(ticket);

        Mockito.when(this.repo.findAll()).thenReturn(tickets);

        // THEN
        assertThat(this.service.readAllTickets()).isEqualTo(tickets.stream().map(this::mapToDTO).collect(Collectors.toList()));

        Mockito.verify(this.repo, Mockito.times(1)).findAll();
    }

    @Test
    void testDelete() {
        // GIVEN
        Long id = 1L;
        boolean found = false;

        // WHEN
        Mockito.when(this.repo.existsById(id)).thenReturn(!found);

        // THEN
        assertThat(this.service.deleteTicket(id)).isEqualTo(!found);

        Mockito.verify(this.repo, Mockito.times(2)).existsById(id);
    }
}





