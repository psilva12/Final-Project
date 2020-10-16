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

    public TicketDTO createTickets(Ticket ticket ){
        return this.mapToDTO(this.ticketRepository.save(ticket));
    }

    public TicketDTO findTicketById(Long id){
        return this.mapToDTO(this.ticketRepository.findById(id).orElseThrow(TicketNotFoundException::new));
    }

    public TicketDTO updatedTicket(Long id, Ticket ticket){
        Ticket update = this.ticketRepository.findById(id).orElseThrow(TicketNotFoundException::new);
        update.setTitle(ticket.getTitle());
        update.setDescription(ticket.getDescription());

        return this.mapToDTO(this.ticketRepository.save(ticket));
    }

    public boolean deleteTicket(Long id){
        if(!this.ticketRepository.existsById(id)){
            throw new TicketNotFoundException();
        }
        this.ticketRepository.deleteById(id);
        return this.ticketRepository.existsById(id);
    }

    // Before DTO
//    public List<Game> readAllGames(){
//        return this.gameRepository.findAll();
//    }
//
//    public Game createGame (Game game){
//        return this.gameRepository.save(game);
//    }
//
//    public Game findGameById(Long id){
//        return this.gameRepository.findById(id).orElseThrow(GameNotFoundException::new);
//    }
//
//    public Game updateGame(Long id, Game game){
//        Game update = findGameById(id);
//        update.setName(game.getName());
//        update.setGenre(game.getGenre());
//        return this.gameRepository.save(update);
//
//    }
//
//    public boolean deleteGame(Long id){
//        if(!this.gameRepository.existsById(id)){
//            throw new GameNotFoundException();
//        }
//        this.gameRepository.deleteById(id);
//        return !this.gameRepository.existsById(id);
//    }

}
