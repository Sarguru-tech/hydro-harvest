package com.hydroharvest.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssessmentRequestDTO {
    private String assessmentName;
    private String address;
    private String district;
    private String state;
    private Double latitude;
    private Double longitude;

    private Double areaSqm;
    private String roofType;
    private String roofMaterial;
    private Integer numberOfFloors;
    private String buildingUsage;

    private Double annualRainfallMm;
    private Double monsoonRainfallMm;
    private Double max24hRainfallMm;

    private String soilType;
    private Double infiltrationRateMmHr;
    private String permeability;
    private Double groundwaterDepthMeters;
    private String waterTableCondition;
    private Double terrainSlopePercent;
    private Boolean nearbyWaterBody;
    private String nearbyWaterBodyType;
}
