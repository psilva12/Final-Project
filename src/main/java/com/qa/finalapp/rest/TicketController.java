package com.qa.finalapp.rest;


import com.qa.finalapp.domain.Ticket;
import com.qa.finalapp.dto.TicketDTO;
import com.qa.finalapp.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getTickets")
    public ResponseEntity<List<TicketDTO>> getAllTickets(){
        return ResponseEntity.ok(this.ticketService.readAllTickets());
    }

    @PostMapping("/createTicket")
    public ResponseEntity<TicketDTO> createTicket(@RequestBody Ticket ticket){
        return new ResponseEntity<TicketDTO>(this.ticketService.createTicket(ticket), HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteTicket/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long id){
        return this.ticketService.deleteTicket(id)
                ? ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
                : ResponseEntity.noContent().build();
    }

    @GetMapping("/getTicketById/{id}")
    public ResponseEntity<TicketDTO> getTicketById(@PathVariable Long id){
        return ResponseEntity.ok(this.ticketService.findTicketById(id));

    }

    @PutMapping("/updateTicket/{id}")
    public ResponseEntity<TicketDTO> updateTicket(@PathVariable Long id, @RequestBody Ticket ticket){
        return ResponseEntity.ok(this.ticketService.updateTicket(id, ticket));
    }

    @PutMapping("/updateTicketWithPathParam")
    public ResponseEntity<TicketDTO> updateGameWithPathParam(@PathParam("id") Long id, @RequestBody Ticket ticket){
        // localhost:8080/updateNoteWithPathParam?id=1
        return ResponseEntity.ok(this.ticketService.updateTicket(id, ticket));
    }


}