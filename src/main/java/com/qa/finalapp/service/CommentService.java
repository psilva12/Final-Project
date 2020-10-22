package com.qa.finalapp.service;

import com.qa.finalapp.domain.Comment;
import com.qa.finalapp.dto.CommentDTO;
import com.qa.finalapp.exceptions.CommentNotFoundException;
import com.qa.finalapp.repo.CommentRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final ModelMapper mapper;


    @Autowired
    public CommentService(CommentRepository commentRepository, ModelMapper mapper) {
        this.commentRepository = commentRepository;
        this.mapper = mapper;
    }

    private CommentDTO mapToDTO(Comment comment){
        return this.mapper.map(comment, CommentDTO.class);
    }

    public List<CommentDTO> readAllComments(){
        return this.commentRepository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public CommentDTO createComment(Comment comment ){
        return this.mapToDTO(this.commentRepository.save(comment));
    }

    public CommentDTO findCommentById(Long id){
        return this.mapToDTO(this.commentRepository.findById(id).orElseThrow(CommentNotFoundException::new));
    }

    public CommentDTO updateComment(Long id, Comment comment){
        Comment update = this.commentRepository.findById(id).orElseThrow(CommentNotFoundException::new);
        update.setDescription(comment.getDescription());

        return this.mapToDTO(this.commentRepository.save(update));
    }

    public boolean deleteComment(Long id){
        if(!this.commentRepository.existsById(id)){
            throw new CommentNotFoundException();
        }
        this.commentRepository.deleteById(id);
        return this.commentRepository.existsById(id);
    }
}
