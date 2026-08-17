package com.hydroharvest.service;

import com.hydroharvest.dto.DashboardSummaryDTO;
import com.hydroharvest.entity.Assessment;
import com.hydroharvest.repository.AssessmentRepository;
import com.hydroharvest.repository.CommunitySubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AssessmentRepository assessmentRepository;
    private final CommunitySubmissionRepository communityRepository;

    public DashboardSummaryDTO getSummary() {
        long totalAssessments = assessmentRepository.countTotalAssessments();
        double totalRooftopArea = assessmentRepository.sumTotalRooftopArea();
        double totalHarvest = assessmentRepository.sumTotalHarvestableWater();
        double totalRecharge = assessmentRepository.sumTotalRechargeWater();

        List<Assessment> assessments = assessmentRepository.findAll();

        Map<String, Long> structureMap = new HashMap<>();
        Map<String, Long> statusMap = new HashMap<>();
        long highPotentialCount = 0;

        for (Assessment a : assessments) {
            if (a.getRecommendation() != null && a.getRecommendation().getPrimaryStructureType() != null) {
                String struct = a.getRecommendation().getPrimaryStructureType();
                structureMap.put(struct, structureMap.getOrDefault(struct, 0L) + 1);
            }
            String st = a.getStatus() != null ? a.getStatus() : "COMPLETED";
            statusMap.put(st, statusMap.getOrDefault(st, 0L) + 1);

            if (a.getRechargeAssessment() != null && a.getRechargeAssessment().getSuitabilityScore() != null && a.getRechargeAssessment().getSuitabilityScore() >= 80) {
                highPotentialCount++;
            }
        }

        List<Map<String, Object>> rainfallTrend = new ArrayList<>();
        List<Map<String, Object>> harvestTrend = new ArrayList<>();
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        double[] avgRainfall = {15, 12, 22, 45, 85, 120, 140, 160, 180, 210, 150, 40};

        for (int i = 0; i < 12; i++) {
            Map<String, Object> r = new HashMap<>();
            r.put("month", months[i]);
            r.put("rainfallMm", avgRainfall[i]);
            rainfallTrend.add(r);

            Map<String, Object> h = new HashMap<>();
            h.put("month", months[i]);
            h.put("harvestLiters", Math.round(avgRainfall[i] * (totalRooftopArea > 0 ? totalRooftopArea : 2500) * 0.85 * 0.9));
            harvestTrend.add(h);
        }

        return DashboardSummaryDTO.builder()
                .totalAssessments(totalAssessments)
                .totalRooftopAreaSqm(Math.round(totalRooftopArea * 10.0) / 10.0)
                .totalAnnualHarvestableLiters(Math.round(totalHarvest))
                .totalAnnualRechargeLiters(Math.round(totalRecharge))
                .estimatedWaterSavingsInr(Math.round(totalHarvest * 0.06))
                .highPotentialLocationsCount(highPotentialCount)
                .communitySubmissionsCount(communityRepository.count())
                .structureDistribution(structureMap)
                .statusDistribution(statusMap)
                .monthlyRainfallTrend(rainfallTrend)
                .monthlyHarvestingTrend(harvestTrend)
                .build();
    }
}
