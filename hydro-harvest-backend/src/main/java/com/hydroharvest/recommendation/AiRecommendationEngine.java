package com.hydroharvest.recommendation;

import com.hydroharvest.entity.*;
import com.hydroharvest.iks.IksRecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AiRecommendationEngine {

    private final IksRecommendationService iksService;

    public interface MlModelPredictor {
        double predictRainwaterPotential(double area, double rainfall, double coeff);
        int predictRechargeClass(String soilType, double gwDepth, double slope);
        String predictOptimalStructure(double area, int rechargeScore, String soilType);
        double predictHouseholdWaterDemand(int occupants, String usage);
        double[] predictSeasonalAvailability(double annualHarvest);
        String predictLocationRisk(double gwDepth, double rainfall);
    }

    public Recommendation generateRecommendation(Assessment assessment) {
        RooftopData rooftop = assessment.getRooftopData();
        RainfallData rainfall = assessment.getRainfallData();
        SoilGroundwaterData soil = assessment.getSoilGroundwaterData();
        HarvestingCalculation calculation = assessment.getHarvestingCalculation();
        RechargeAssessment recharge = assessment.getRechargeAssessment();

        double area = rooftop != null && rooftop.getAreaSqm() != null ? rooftop.getAreaSqm() : 100.0;
        int rechargeScore = recharge != null && recharge.getSuitabilityScore() != null ? recharge.getSuitabilityScore() : 75;
        double gwDepth = soil != null && soil.getGroundwaterDepthMeters() != null ? soil.getGroundwaterDepthMeters() : 12.0;
        String soilType = soil != null && soil.getSoilType() != null ? soil.getSoilType() : "Sandy Loam";
        String state = assessment.getState() != null ? assessment.getState() : "Tamil Nadu";

        String primaryStructure;
        String dimensions;
        int confidenceScore;
        List<String> reasons = new ArrayList<>();
        List<String> steps = new ArrayList<>();

        if (rechargeScore < 40) {
            primaryStructure = "Above-Ground Storage Tank with Dual Filtration";
            dimensions = String.format("%.1f m3 Masonry / HDPE Cistern", calculation.getRecommendedStorageTankCapacityM3());
            confidenceScore = 92;
            reasons.add("Soil permeability or shallow water table renders deep artificial recharge unsuitable.");
            reasons.add("Rooftop rainwater should be prioritized for direct potable/non-potable domestic use.");
            reasons.add("Includes multi-stage sand-gravel-charcoal mesh filter to eliminate dust and debris.");
            steps.add("Install rooftop gutters with 1% slope towards downspout.");
            steps.add("Fit a 100-liter first-flush divider unit to flush initial dust.");
            steps.add("Connect filter outlet directly into the storage cistern.");
        } else if (area <= 200.0) {
            primaryStructure = "Rooftop Recharge Pit with Baffle Filter";
            dimensions = "2.0m x 2.0m x 2.5m (L x W x D) filled with gravel-boulder layers";
            confidenceScore = 88;
            reasons.add(String.format("Suitable soil permeability (%s) and vadose zone depth (%.1f m).", soilType, gwDepth));
            reasons.add("Compact footprint ideal for residential buildings (<200 m² rooftop).");
            reasons.add(String.format("High recharge suitability score (%d/100).", rechargeScore));
            steps.add("Excavate pit of 2m x 2m x 2.5m near building downspout.");
            steps.add("Fill bottom 1m with boulders (5-20cm), middle 0.5m with gravel, top 0.5m with coarse sand.");
            steps.add("Provide perforated PVC pipe in center for rapid water entry.");
        } else if (area <= 600.0) {
            primaryStructure = "Recharge Trench with Dual Injection Shafts";
            dimensions = "10.0m x 1.5m x 2.0m Trench with 150mm perforated bore shaft";
            confidenceScore = 90;
            reasons.add("High rooftop runoff volume requires linear percolation trench.");
            reasons.add("Perforated vertical shaft bypasses impervious topsoil layers to reach aquifer.");
            reasons.add("Equipped with desilting chamber to prevent clogging of injection pipe.");
            steps.add("Dig 10m long trench along perimeter drain line.");
            steps.add("Drill 15m deep recharge shaft with slotted PVC casing inside trench.");
            steps.add("Fill trench with graded aggregate filter material.");
        } else {
            primaryStructure = "Gravity-Fed Recharge Well System with Settlement Basin";
            dimensions = "25m deep 200mm cased Injection Well + 3m x 2m Desilting Tank";
            confidenceScore = 94;
            reasons.add("Commercial/institutional building produces large peak runoff rate (>15 L/s).");
            reasons.add("Requires dedicated desilting chamber before gravity injection into deep aquifer.");
            reasons.add("High water table safety margin avoids surface waterlogging.");
            steps.add("Construct 2-chamber masonry desilting basin with baffle walls.");
            steps.add("Drill deep cased recharge well into permeable aquifer stratum.");
            steps.add("Install automatic high-flow strainer mesh at inlet.");
        }

        Map<String, String> iksMatch = iksService.getIksMatch(state, assessment.getDistrict(), soilType, 900.0);
        String iksStructure = iksMatch.get("systemName");

        String reasonsJson = String.format("[\"%s\", \"%s\", \"%s\"]",
                escapeJson(reasons.get(0)), escapeJson(reasons.get(1)), escapeJson(reasons.get(2)));
        String stepsJson = String.format("[\"%s\", \"%s\", \"%s\"]",
                escapeJson(steps.get(0)), escapeJson(steps.get(1)), escapeJson(steps.get(2)));

        return Recommendation.builder()
                .primaryStructureType(primaryStructure)
                .recommendedDimensions(dimensions)
                .iksTraditionalStructureMatch(iksStructure)
                .confidenceScorePercent(confidenceScore)
                .XaiReasonsJson(reasonsJson)
                .implementationStepsJson(stepsJson)
                .build();
    }

    private String escapeJson(String raw) {
        return raw.replace("\"", "\\\"");
    }
}
