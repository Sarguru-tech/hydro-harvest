package com.hydroharvest.controller;

import com.hydroharvest.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {

    private final DashboardService dashboardService;

    @GetMapping("/water")
    public ResponseEntity<Map<String, Object>> getWaterAnalytics() {
        var summary = dashboardService.getSummary();
        Map<String, Object> map = new HashMap<>();
        map.put("totalHarvestableLiters", summary.getTotalAnnualHarvestableLiters());
        map.put("totalRooftopAreaSqm", summary.getTotalRooftopAreaSqm());
        map.put("estimatedCostSavingsInr", summary.getEstimatedWaterSavingsInr());
        map.put("monthlyHarvestingTrend", summary.getMonthlyHarvestingTrend());
        return ResponseEntity.ok(map);
    }

    @GetMapping("/recharge")
    public ResponseEntity<Map<String, Object>> getRechargeAnalytics() {
        var summary = dashboardService.getSummary();
        Map<String, Object> map = new HashMap<>();
        map.put("totalAnnualRechargeLiters", summary.getTotalAnnualRechargeLiters());
        map.put("highPotentialLocationsCount", summary.getHighPotentialLocationsCount());
        map.put("structureDistribution", summary.getStructureDistribution());
        return ResponseEntity.ok(map);
    }
}
