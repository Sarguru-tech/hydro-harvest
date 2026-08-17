package com.hydroharvest.service;

import com.hydroharvest.entity.AuditLog;
import com.hydroharvest.repository.AuditLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuditService {

    private final AuditLogRepository auditLogRepository;

    public void logAction(String email, String action, String resource, String details) {
        AuditLog log = AuditLog.builder()
                .userEmail(email != null ? email : "SYSTEM")
                .action(action)
                .resource(resource)
                .details(details)
                .build();
        auditLogRepository.save(log);
    }

    public List<AuditLog> getRecentLogs() {
        return auditLogRepository.findTop50ByOrderByTimestampDesc();
    }
}
