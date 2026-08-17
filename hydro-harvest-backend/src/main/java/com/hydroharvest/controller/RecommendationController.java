package com.hydroharvest.controller;

import com.hydroharvest.entity.Assessment;
import com.hydroharvest.entity.Recommendation;
import com.hydroharvest.service.AssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final AssessmentService assessmentService;

    @GetMapping("/{assessmentId}")
    public ResponseEntity<Recommendation> getRecommendationForAssessment(@PathVariable Long assessmentId) {
        Assessment a = assessmentService.getAssessmentById(assessmentId);
        return ResponseEntity.ok(a.getRecommendation());
    }
}
