package com.hydroharvest.dto;

import lombok.*;
import java.util.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DashboardSummaryDTO {
    private long totalAssessments;
    private double totalRooftopAreaSqm;
    private double totalAnnualHarvestableLiters;
    private double totalAnnualRechargeLiters;
    private double estimatedWaterSavingsInr;
    private long highPotentialLocationsCount;
    private long communitySubmissionsCount;

    private Map<String, Long> structureDistribution;
    private Map<String, Long> statusDistribution;
    private List<Map<String, Object>> monthlyRainfallTrend;
    private List<Map<String, Object>> monthlyHarvestingTrend;
}
