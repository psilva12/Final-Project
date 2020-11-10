package com.qa.finalapp.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.persistence.EntityNotFoundException;

@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "The USER with this id does not exit")
public class CommentNotFoundException extends EntityNotFoundException {
}
