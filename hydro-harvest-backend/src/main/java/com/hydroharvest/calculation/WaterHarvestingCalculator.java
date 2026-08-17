package com.hydroharvest.calculation;

import com.hydroharvest.entity.HarvestingCalculation;
import com.hydroharvest.entity.RainfallData;
import com.hydroharvest.entity.RooftopData;
import org.springframework.stereotype.Service;

@Service
public class WaterHarvestingCalculator {

    public double getRunoffCoefficient(String roofMaterial) {
        if (roofMaterial == null) return 0.85;
        switch (roofMaterial.toUpperCase()) {
            case "METAL SHEET":
            case "CORRUGATED SHEET":
                return 0.92;
            case "CONCRETE":
            case "RCC":
                return 0.85;
            case "TILES":
            case "CLAY TILES":
                return 0.78;
            case "ASBESTOS":
                return 0.80;
            default:
                return 0.82;
        }
    }

    public HarvestingCalculation calculate(RooftopData rooftop, RainfallData rainfall) {
        double area = rooftop.getAreaSqm() != null ? rooftop.getAreaSqm() : 100.0;
        double coeff = rooftop.getRunoffCoefficient() != null ? rooftop.getRunoffCoefficient()
                : getRunoffCoefficient(rooftop.getRoofMaterial());
        
        double annualRainfall = rainfall.getAnnualRainfallMm() != null ? rainfall.getAnnualRainfallMm() : 950.0;
        double monsoonRainfall = rainfall.getMonsoonRainfallMm() != null ? rainfall.getMonsoonRainfallMm() : 720.0;
        double max24hRainfall = rainfall.getMax24hRainfallMm() != null ? rainfall.getMax24hRainfallMm() : 85.0;

        double filterEfficiency = 0.90;

        double annualHarvestableLiters = annualRainfall * area * coeff * filterEfficiency;
        double monsoonHarvestableLiters = monsoonRainfall * area * coeff * filterEfficiency;

        double peakIntensityMmHr = Math.max(25.0, max24hRainfall / 3.5);
        double peakRunoffLps = (coeff * peakIntensityMmHr * area) / 3600.0 * 1000.0;

        double recommendedTankM3 = Math.round((annualHarvestableLiters * 0.05 / 1000.0) * 10.0) / 10.0;
        if (recommendedTankM3 < 2.0) recommendedTankM3 = 2.0;

        double firstFlushLiters = Math.round(area * 0.75);

        double annualHouseholdDemandLiters = 4 * 135 * 365;
        double substitutionPct = Math.min(100.0, Math.round((annualHarvestableLiters / annualHouseholdDemandLiters) * 100.0));

        double estimatedCostSavings = Math.round(annualHarvestableLiters * 0.06);

        return HarvestingCalculation.builder()
                .annualHarvestableLiters(Math.round(annualHarvestableLiters * 10.0) / 10.0)
                .monsoonHarvestableLiters(Math.round(monsoonHarvestableLiters * 10.0) / 10.0)
                .peakRunoffLitersPerSec(Math.round(peakRunoffLps * 100.0) / 100.0)
                .recommendedStorageTankCapacityM3(recommendedTankM3)
                .firstFlushVolumeLiters(firstFlushLiters)
                .potableWaterSubstitutionPercentage(substitutionPct)
                .estimatedCostSavingsInrPerYear(estimatedCostSavings)
                .build();
    }
}
