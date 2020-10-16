package com.qa.finalapp.dto;

public class TicketDTO {

    private Long id;
    private String title;
    private String description;
    private String time;
    private String author;


    public TicketDTO() {
    }

    public TicketDTO(String title, String description, String time, String author) {
        this.title = title;
        this.description = description;
        this.time = time;
        this.author = author;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
