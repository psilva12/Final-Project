package com.qa.finalapp.repo;


import com.qa.finalapp.domain.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
