package com.hydroharvest.service;

import com.hydroharvest.entity.CommunitySubmission;
import com.hydroharvest.repository.CommunitySubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunitySubmissionRepository repository;

    public CommunitySubmission createSubmission(CommunitySubmission submission) {
        if (submission.getStatus() == null) {
            submission.setStatus("PENDING");
        }
        return repository.save(submission);
    }

    public List<CommunitySubmission> getAllSubmissions() {
        return repository.findAll();
    }

    public List<CommunitySubmission> getSubmissionsByStatus(String status) {
        return repository.findByStatus(status);
    }

    public CommunitySubmission updateStatus(Long id, String status, String officerEmail) {
        CommunitySubmission sub = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found with id: " + id));
        sub.setStatus(status);
        sub.setVerifiedByOfficer(officerEmail);
        return repository.save(sub);
    }
}
