package com.hydroharvest.repository;

import com.hydroharvest.entity.CommunitySubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface CommunitySubmissionRepository extends JpaRepository<CommunitySubmission, Long> {
    List<CommunitySubmission> findByStatus(String status);
    List<CommunitySubmission> findBySubmittedByEmail(String email);
}
