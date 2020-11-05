package com.qa.finalapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "comments"})
public class Ticket {

    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String title;

    @OneToMany(mappedBy = "ticket", fetch = FetchType.EAGER)
    private List<Comment> comments = new ArrayList<>();

    @Column
    private String description;

    @Column
    private String author;

    @Column
    private String time;

    @Column
    private Boolean status;

    @Column
    private String topic;

    public Ticket() {
    }

    public Ticket(String title, List<Comment> comments, String description, String author, String time, Boolean status, String topic) {
        this.title = title;
        this.comments = comments;
        this.description = description;
        this.author = author;
        this.time = time;
        this.status = status;
        this.topic = topic;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
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

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getTime() {
        return time;
    }

    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    public void setTime(String time) {
        this.time = time;
    }
}
