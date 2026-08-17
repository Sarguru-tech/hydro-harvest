package com.hydroharvest.calculation;

import com.hydroharvest.entity.HarvestingCalculation;
import com.hydroharvest.entity.RainfallData;
import com.hydroharvest.entity.RooftopData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class WaterHarvestingCalculatorTest {

    private WaterHarvestingCalculator calculator;

    @BeforeEach
    void setUp() {
        calculator = new WaterHarvestingCalculator();
    }

    @Test
    void testHarvestableWaterCalculation() {
        RooftopData rooftop = RooftopData.builder()
                .areaSqm(100.0)
                .roofMaterial("Concrete")
                .runoffCoefficient(0.85)
                .build();

        RainfallData rainfall = RainfallData.builder()
                .annualRainfallMm(1000.0)
                .monsoonRainfallMm(800.0)
                .max24hRainfallMm(100.0)
                .build();

        HarvestingCalculation result = calculator.calculate(rooftop, rainfall);

        assertNotNull(result);
        assertEquals(76500.0, result.getAnnualHarvestableLiters());
        assertTrue(result.getRecommendedStorageTankCapacityM3() > 0);
        assertTrue(result.getPeakRunoffLitersPerSec() > 0);
    }
}
