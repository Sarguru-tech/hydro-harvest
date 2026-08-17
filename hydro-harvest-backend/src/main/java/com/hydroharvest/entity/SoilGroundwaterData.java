package com.hydroharvest.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SoilGroundwaterData {
    private String soilType; // Sandy Loam, Clay Loam, Silt, Gravel, Black Cotton
    private Double infiltrationRateMmHr;
    private String permeability; // High, Moderate, Low, Very Low
    private Double groundwaterDepthMeters;
    private String waterTableCondition; // Critical, Semi-Critical, Safe, Over-Exploited
    private Double terrainSlopePercent;
    private Boolean nearbyWaterBody;
    private String nearbyWaterBodyType; // Pond, Lake, River, Eri, Drainage
}
