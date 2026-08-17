package com.hydroharvest.service;

import com.hydroharvest.calculation.RechargeSuitabilityEngine;
import com.hydroharvest.calculation.WaterHarvestingCalculator;
import com.hydroharvest.dto.AssessmentRequestDTO;
import com.hydroharvest.entity.*;
import com.hydroharvest.recommendation.AiRecommendationEngine;
import com.hydroharvest.repository.AssessmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AssessmentService {

    private final AssessmentRepository assessmentRepository;
    private final WaterHarvestingCalculator harvestingCalculator;
    private final RechargeSuitabilityEngine rechargeEngine;
    private final AiRecommendationEngine aiRecommendationEngine;

    @Transactional
    public Assessment createAssessment(AssessmentRequestDTO request, User user) {
        RooftopData rooftop = RooftopData.builder()
                .areaSqm(request.getAreaSqm() != null ? request.getAreaSqm() : 150.0)
                .roofType(request.getRoofType() != null ? request.getRoofType() : "Flat")
                .roofMaterial(request.getRoofMaterial() != null ? request.getRoofMaterial() : "Concrete")
                .numberOfFloors(request.getNumberOfFloors() != null ? request.getNumberOfFloors() : 2)
                .buildingUsage(request.getBuildingUsage() != null ? request.getBuildingUsage() : "Residential")
                .runoffCoefficient(harvestingCalculator.getRunoffCoefficient(request.getRoofMaterial()))
                .build();

        RainfallData rainfall = RainfallData.builder()
                .annualRainfallMm(request.getAnnualRainfallMm() != null ? request.getAnnualRainfallMm() : 980.0)
                .monsoonRainfallMm(request.getMonsoonRainfallMm() != null ? request.getMonsoonRainfallMm() : 740.0)
                .max24hRainfallMm(request.getMax24hRainfallMm() != null ? request.getMax24hRainfallMm() : 90.0)
                .rainfallSource(request.getAnnualRainfallMm() != null ? "USER_INPUT" : "IMD_SIMULATED_STATION")
                .build();

        SoilGroundwaterData soil = SoilGroundwaterData.builder()
                .soilType(request.getSoilType() != null ? request.getSoilType() : "Sandy Loam")
                .infiltrationRateMmHr(request.getInfiltrationRateMmHr() != null ? request.getInfiltrationRateMmHr() : 25.0)
                .permeability(request.getPermeability() != null ? request.getPermeability() : "Moderate")
                .groundwaterDepthMeters(request.getGroundwaterDepthMeters() != null ? request.getGroundwaterDepthMeters() : 14.5)
                .waterTableCondition(request.getWaterTableCondition() != null ? request.getWaterTableCondition() : "Safe")
                .terrainSlopePercent(request.getTerrainSlopePercent() != null ? request.getTerrainSlopePercent() : 2.5)
                .nearbyWaterBody(request.getNearbyWaterBody() != null ? request.getNearbyWaterBody() : true)
                .nearbyWaterBodyType(request.getNearbyWaterBodyType() != null ? request.getNearbyWaterBodyType() : "Eri Pond")
                .build();

        HarvestingCalculation calculation = harvestingCalculator.calculate(rooftop, rainfall);

        RechargeAssessment recharge = rechargeEngine.evaluateRecharge(soil, rainfall, calculation.getAnnualHarvestableLiters());

        Assessment assessment = Assessment.builder()
                .assessmentName(request.getAssessmentName() != null ? request.getAssessmentName() : "On-Spot Assessment - " + request.getDistrict())
                .address(request.getAddress() != null ? request.getAddress() : "Main Road")
                .district(request.getDistrict() != null ? request.getDistrict() : "Coimbatore")
                .state(request.getState() != null ? request.getState() : "Tamil Nadu")
                .latitude(request.getLatitude() != null ? request.getLatitude() : 11.0168)
                .longitude(request.getLongitude() != null ? request.getLongitude() : 76.9558)
                .user(user)
                .rooftopData(rooftop)
                .rainfallData(rainfall)
                .soilGroundwaterData(soil)
                .harvestingCalculation(calculation)
                .rechargeAssessment(recharge)
                .status("COMPLETED")
                .build();

        Recommendation recommendation = aiRecommendationEngine.generateRecommendation(assessment);
        assessment.setRecommendation(recommendation);

        return assessmentRepository.save(assessment);
    }

    public List<Assessment> getAllAssessments() {
        return assessmentRepository.findAll();
    }

    public Assessment getAssessmentById(Long id) {
        return assessmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Assessment not found with id: " + id));
    }

    public void deleteAssessment(Long id) {
        assessmentRepository.deleteById(id);
    }
}
