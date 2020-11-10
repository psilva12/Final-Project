package com.qa.finalapp.service;



import com.qa.finalapp.domain.Ticket;
import com.qa.finalapp.dto.TicketDTO;
import com.qa.finalapp.repo.TicketRepository;
import com.qa.finalapp.exceptions.TicketNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.ModelMap;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TicketService {

    private final TicketRepository ticketRepository;
    private final ModelMapper mapper;


    @Autowired
    public TicketService(TicketRepository ticketRepository, ModelMapper mapper) {
        this.ticketRepository = ticketRepository;
        this.mapper = mapper;
    }

    private TicketDTO mapToDTO(Ticket ticket){
        return this.mapper.map(ticket, TicketDTO.class);
    }

    public List<TicketDTO> readAllTickets(){
        return this.ticketRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public TicketDTO createTicket(Ticket ticket ){
        return this.mapToDTO(this.ticketRepository.save(ticket));
    }

    public TicketDTO findTicketById(Long id){
        return this.mapToDTO(this.ticketRepository.findById(id).orElseThrow(TicketNotFoundException::new));
    }

    public TicketDTO updateTicket(Long id, Ticket ticket){
        Ticket update = this.ticketRepository.findById(id).orElseThrow(TicketNotFoundException::new);
        update.setTitle(ticket.getTitle());
        update.setDescription(ticket.getDescription());
        update.setStatus(ticket.getStatus());

        return this.mapToDTO(this.ticketRepository.save(update));
    }

    public boolean deleteTicket(Long id){
        if(!this.ticketRepository.existsById(id)){
            throw new TicketNotFoundException();
        }
        this.ticketRepository.deleteById(id);
        return this.ticketRepository.existsById(id);
    }


}
