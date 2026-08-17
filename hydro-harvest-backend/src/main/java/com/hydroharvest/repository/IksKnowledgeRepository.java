package com.hydroharvest.repository;

import com.hydroharvest.entity.IksKnowledge;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface IksKnowledgeRepository extends JpaRepository<IksKnowledge, Long> {
    List<IksKnowledge> findByRegion(String region);
    List<IksKnowledge> findBySystemType(String systemType);
    List<IksKnowledge> findByIsVerified(Boolean isVerified);
}
