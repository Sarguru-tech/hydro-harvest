package com.hydroharvest.calculation;

import com.hydroharvest.entity.RainfallData;
import com.hydroharvest.entity.RechargeAssessment;
import com.hydroharvest.entity.SoilGroundwaterData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RechargeSuitabilityEngineTest {

    private RechargeSuitabilityEngine engine;

    @BeforeEach
    void setUp() {
        engine = new RechargeSuitabilityEngine();
    }

    @Test
    void testRechargeSuitabilityScore() {
        SoilGroundwaterData soil = SoilGroundwaterData.builder()
                .soilType("Sandy Loam")
                .permeability("High")
                .groundwaterDepthMeters(12.0)
                .terrainSlopePercent(2.0)
                .nearbyWaterBody(true)
                .build();

        RainfallData rainfall = RainfallData.builder()
                .annualRainfallMm(1200.0)
                .build();

        RechargeAssessment assessment = engine.evaluateRecharge(soil, rainfall, 100000.0);

        assertNotNull(assessment);
        assertTrue(assessment.getSuitabilityScore() >= 80);
        assertEquals("Highly Suitable", assessment.getSuitabilityCategory());
        assertNotNull(assessment.getScoreBreakdownJson());
    }
}
