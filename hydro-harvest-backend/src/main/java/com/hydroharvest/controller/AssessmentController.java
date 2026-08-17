package com.hydroharvest.controller;

import com.hydroharvest.dto.AssessmentRequestDTO;
import com.hydroharvest.entity.Assessment;
import com.hydroharvest.entity.User;
import com.hydroharvest.repository.UserRepository;
import com.hydroharvest.service.AssessmentService;
import com.hydroharvest.service.AuditService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@RequiredArgsConstructor
public class AssessmentController {

    private final AssessmentService assessmentService;
    private final UserRepository userRepository;
    private final AuditService auditService;

    @PostMapping
    public ResponseEntity<Assessment> createAssessment(@RequestBody AssessmentRequestDTO request, Authentication auth) {
        User user = null;
        if (auth != null && auth.getName() != null) {
            user = userRepository.findByEmail(auth.getName()).orElse(null);
        }
        Assessment assessment = assessmentService.createAssessment(request, user);
        auditService.logAction(user != null ? user.getEmail() : "ANONYMOUS", "CREATE_ASSESSMENT", "ASSESSMENT", "Created assessment ID: " + assessment.getId());
        return ResponseEntity.ok(assessment);
    }

    @GetMapping
    public ResponseEntity<List<Assessment>> getAllAssessments() {
        return ResponseEntity.ok(assessmentService.getAllAssessments());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Assessment> getAssessmentById(@PathVariable Long id) {
        return ResponseEntity.ok(assessmentService.getAssessmentById(id));
    }

    @PostMapping("/{id}/calculate")
    public ResponseEntity<Assessment> recalculateAssessment(@PathVariable Long id) {
        Assessment a = assessmentService.getAssessmentById(id);
        AssessmentRequestDTO dto = new AssessmentRequestDTO();
        dto.setAssessmentName(a.getAssessmentName());
        dto.setAddress(a.getAddress());
        dto.setDistrict(a.getDistrict());
        dto.setState(a.getState());
        dto.setLatitude(a.getLatitude());
        dto.setLongitude(a.getLongitude());
        if (a.getRooftopData() != null) {
            dto.setAreaSqm(a.getRooftopData().getAreaSqm());
            dto.setRoofType(a.getRooftopData().getRoofType());
            dto.setRoofMaterial(a.getRooftopData().getRoofMaterial());
            dto.setNumberOfFloors(a.getRooftopData().getNumberOfFloors());
            dto.setBuildingUsage(a.getRooftopData().getBuildingUsage());
        }
        Assessment updated = assessmentService.createAssessment(dto, a.getUser());
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}/result")
    public ResponseEntity<Assessment> getAssessmentResult(@PathVariable Long id) {
        return ResponseEntity.ok(assessmentService.getAssessmentById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssessment(@PathVariable Long id) {
        assessmentService.deleteAssessment(id);
        return ResponseEntity.noContent().build();
    }
}
