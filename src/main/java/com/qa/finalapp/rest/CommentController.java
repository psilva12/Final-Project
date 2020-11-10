package com.qa.finalapp.rest;

import com.qa.finalapp.domain.Comment;
import com.qa.finalapp.dto.CommentDTO;
import com.qa.finalapp.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;
import java.util.List;

@RestController
public class CommentController {


    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @CrossOrigin
    @GetMapping("/getComments")
    public ResponseEntity<List<CommentDTO>> getAllComments(){
        return ResponseEntity.ok(this.commentService.readAllComments());
    }

    @CrossOrigin
    @PostMapping("/createComment")
    public ResponseEntity<CommentDTO> createComment(@RequestBody Comment comment){
        return new ResponseEntity<CommentDTO>(this.commentService.createComment(comment), HttpStatus.CREATED);
    }

    @CrossOrigin
    @DeleteMapping("/deleteComment/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable Long id){
        return this.commentService.deleteComment(id)
                ? ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build()
                : ResponseEntity.noContent().build();
    }

    @CrossOrigin
    @GetMapping("/getCommentById/{id}")
    public ResponseEntity<CommentDTO> getCommentById(@PathVariable Long id){
        return ResponseEntity.ok(this.commentService.findCommentById(id));

    }

    @CrossOrigin
    @PutMapping("/updateComment/{id}")
    public ResponseEntity<CommentDTO> updateComment(@PathVariable Long id, @RequestBody Comment comment){
        return ResponseEntity.ok(this.commentService.updateComment(id, comment));
    }

    @CrossOrigin
    @PutMapping("/updateCommentWithPathParam")
    public ResponseEntity<CommentDTO> updateCommentWithPathParam(@PathParam("id") Long id, @RequestBody Comment comment){
        // localhost:8080/updateNoteWithPathParam?id=1
        return ResponseEntity.ok(this.commentService.updateComment(id, comment));
    }
}
