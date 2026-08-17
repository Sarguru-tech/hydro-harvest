package com.hydroharvest.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class HarvestingCalculation {
    private Double annualHarvestableLiters;
    private Double monsoonHarvestableLiters;
    private Double peakRunoffLitersPerSec;
    private Double recommendedStorageTankCapacityM3;
    private Double firstFlushVolumeLiters;
    private Double potableWaterSubstitutionPercentage;
    private Double estimatedCostSavingsInrPerYear;
}
