package com.hydroharvest.controller;

import com.hydroharvest.entity.IksKnowledge;
import com.hydroharvest.repository.IksKnowledgeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class IksController {

    private final IksKnowledgeRepository repository;

    @GetMapping({"/iks", "/water-heritage"})
    public ResponseEntity<List<IksKnowledge>> getAllIksKnowledge() {
        return ResponseEntity.ok(repository.findAll());
    }

    @PostMapping({"/iks", "/water-heritage"})
    public ResponseEntity<IksKnowledge> createIksKnowledge(@RequestBody IksKnowledge iks) {
        return ResponseEntity.ok(repository.save(iks));
    }
}
