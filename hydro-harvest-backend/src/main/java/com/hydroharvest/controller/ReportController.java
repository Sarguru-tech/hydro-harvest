package com.hydroharvest.controller;

import com.hydroharvest.entity.Assessment;
import com.hydroharvest.service.AssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final AssessmentService assessmentService;

    @PostMapping("/{assessmentId}")
    public ResponseEntity<Map<String, Object>> generateReport(@PathVariable Long assessmentId) {
        Assessment a = assessmentService.getAssessmentById(assessmentId);
        Map<String, Object> report = new HashMap<>();
        report.put("reportId", "RPT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        report.put("assessmentId", a.getId());
        report.put("title", "Rainwater Harvesting & Artificial Recharge Feasibility Report");
        report.put("generatedAt", new Date());
        report.put("assessment", a);
        report.put("downloadUrl", "/api/reports/" + a.getId() + "/pdf");
        return ResponseEntity.ok(report);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getReportById(@PathVariable Long id) {
        Assessment a = assessmentService.getAssessmentById(id);
        Map<String, Object> report = new HashMap<>();
        report.put("reportId", "RPT-DEMO-" + id);
        report.put("assessmentId", a.getId());
        report.put("assessment", a);
        return ResponseEntity.ok(report);
    }
}
