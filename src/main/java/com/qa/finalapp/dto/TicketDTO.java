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


}
