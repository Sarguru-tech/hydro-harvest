package com.hydroharvest.calculation;

import com.hydroharvest.entity.RainfallData;
import com.hydroharvest.entity.RechargeAssessment;
import com.hydroharvest.entity.SoilGroundwaterData;
import org.springframework.stereotype.Service;

@Service
public class RechargeSuitabilityEngine {

    public RechargeAssessment evaluateRecharge(SoilGroundwaterData soil, RainfallData rainfall, double annualHarvestableLiters) {
        int soilScore = 0;
        int gwScore = 0;
        int rainfallScore = 0;
        int slopeScore = 0;
        int drainageScore = 0;

        String soilType = soil.getSoilType() != null ? soil.getSoilType() : "Sandy Loam";
        String permeability = soil.getPermeability() != null ? soil.getPermeability() : "Moderate";
        double gwDepth = soil.getGroundwaterDepthMeters() != null ? soil.getGroundwaterDepthMeters() : 12.0;
        double annualRainfall = rainfall.getAnnualRainfallMm() != null ? rainfall.getAnnualRainfallMm() : 900.0;
        double slope = soil.getTerrainSlopePercent() != null ? soil.getTerrainSlopePercent() : 2.0;

        if ("High".equalsIgnoreCase(permeability) || "Sandy Loam".equalsIgnoreCase(soilType) || "Gravel".equalsIgnoreCase(soilType)) {
            soilScore = 25;
        } else if ("Moderate".equalsIgnoreCase(permeability) || "Loam".equalsIgnoreCase(soilType)) {
            soilScore = 20;
        } else if ("Low".equalsIgnoreCase(permeability) || "Clay Loam".equalsIgnoreCase(soilType)) {
            soilScore = 12;
        } else {
            soilScore = 6;
        }

        if (gwDepth >= 8.0 && gwDepth <= 30.0) {
            gwScore = 25;
        } else if (gwDepth > 30.0 && gwDepth <= 50.0) {
            gwScore = 20;
        } else if (gwDepth > 50.0) {
            gwScore = 15;
        } else if (gwDepth >= 3.0 && gwDepth < 8.0) {
            gwScore = 12;
        } else {
            gwScore = 5;
        }

        if (annualRainfall >= 1000.0) {
            rainfallScore = 20;
        } else if (annualRainfall >= 700.0) {
            rainfallScore = 16;
        } else if (annualRainfall >= 450.0) {
            rainfallScore = 11;
        } else {
            rainfallScore = 6;
        }

        if (slope <= 3.0) {
            slopeScore = 15;
        } else if (slope <= 8.0) {
            slopeScore = 10;
        } else {
            slopeScore = 4;
        }

        if (Boolean.TRUE.equals(soil.getNearbyWaterBody())) {
            drainageScore = 15;
        } else {
            drainageScore = 10;
        }

        int totalScore = soilScore + gwScore + rainfallScore + slopeScore + drainageScore;

        String category;
        if (totalScore >= 80) category = "Highly Suitable";
        else if (totalScore >= 60) category = "Moderately Suitable";
        else if (totalScore >= 40) category = "Marginal";
        else category = "Unsuitable";

        double rechargeEfficiency = (totalScore / 100.0) * 0.85;
        double estimatedRechargeLiters = Math.round(annualHarvestableLiters * rechargeEfficiency);

        String breakdownJson = String.format(
            "{\"soilPermeability\":%d,\"groundwaterDepth\":%d,\"rainfallAvailability\":%d,\"terrainSlope\":%d,\"drainageProximity\":%d,\"total\":%d}",
            soilScore, gwScore, rainfallScore, slopeScore, drainageScore, totalScore
        );

        return RechargeAssessment.builder()
                .suitabilityScore(totalScore)
                .suitabilityCategory(category)
                .estimatedAnnualRechargeLiters(estimatedRechargeLiters)
                .scoreBreakdownJson(breakdownJson)
                .build();
    }
}
