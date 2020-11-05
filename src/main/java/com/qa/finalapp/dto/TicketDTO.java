package com.qa.finalapp.dto;

import com.qa.finalapp.domain.Comment;

import java.util.ArrayList;
import java.util.List;

public class TicketDTO {

    private Long id;
    private String title;
    private String description;
    private String time;
    private String author;
    private Boolean status;
    private String topic;
    private List<CommentDTO> comments = new ArrayList<>();

    public TicketDTO() {
    }

    public TicketDTO(String title, String description, String time, String author, Boolean status, String topic) {
        this.title = title;
        this.description = description;
        this.time = time;
        this.author = author;
        this.status = status;
        this.topic = topic;
    }

    public List<CommentDTO> getComments() {
        return comments;
    }

    public void setComments(List<CommentDTO> comments) {
        this.comments = comments;
    }

    public Long getId() {
        return id;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
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
