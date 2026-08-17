package com.hydroharvest.repository;

import com.hydroharvest.entity.Assessment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface AssessmentRepository extends JpaRepository<Assessment, Long> {
    List<Assessment> findByUserId(Long userId);
    List<Assessment> findByDistrict(String district);

    @Query("SELECT COUNT(a) FROM Assessment a")
    long countTotalAssessments();

    @Query("SELECT COALESCE(SUM(a.rooftopData.areaSqm), 0) FROM Assessment a")
    double sumTotalRooftopArea();

    @Query("SELECT COALESCE(SUM(a.harvestingCalculation.annualHarvestableLiters), 0) FROM Assessment a")
    double sumTotalHarvestableWater();

    @Query("SELECT COALESCE(SUM(a.rechargeAssessment.estimatedAnnualRechargeLiters), 0) FROM Assessment a")
    double sumTotalRechargeWater();
}
