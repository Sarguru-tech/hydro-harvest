package com.hydroharvest.controller;

import com.hydroharvest.entity.CommunitySubmission;
import com.hydroharvest.service.CommunityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community")
@RequiredArgsConstructor
public class CommunityController {

    private final CommunityService communityService;

    @GetMapping("/submissions")
    public ResponseEntity<List<CommunitySubmission>> getSubmissions(@RequestParam(required = false) String status) {
        if (status != null && !status.isEmpty()) {
            return ResponseEntity.ok(communityService.getSubmissionsByStatus(status));
        }
        return ResponseEntity.ok(communityService.getAllSubmissions());
    }

    @PostMapping("/submissions")
    public ResponseEntity<CommunitySubmission> createSubmission(@RequestBody CommunitySubmission submission) {
        return ResponseEntity.ok(communityService.createSubmission(submission));
    }

    @PutMapping("/submissions/{id}/status")
    public ResponseEntity<CommunitySubmission> updateStatus(@PathVariable Long id, @RequestParam String status, @RequestParam(required = false) String officerEmail) {
        return ResponseEntity.ok(communityService.updateStatus(id, status, officerEmail != null ? officerEmail : "WATER_OFFICER"));
    }
}
