package com.qa.finalapp.domain;

import javax.persistence.*;

@Entity
public class Comment {

    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String description;

    @Column
    private String author;

    @Column
    private String time;

    public Comment() {
    }

    @ManyToOne(targetEntity = Ticket.class)
    private Ticket ticket;

    public Comment(String description, String author, String time) {
        this.description = description;
        this.author = author;
        this.time = time;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
