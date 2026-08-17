package com.hydroharvest.controller;

import com.hydroharvest.service.GisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class GisController {

    private final GisService gisService;

    @GetMapping("/gis/layers")
    public ResponseEntity<List<Map<String, Object>>> getGisLayers() {
        return ResponseEntity.ok(gisService.getGisLayers());
    }

    @GetMapping("/gis/structures")
    public ResponseEntity<List<Map<String, Object>>> getTraditionalStructures() {
        return ResponseEntity.ok(gisService.getTraditionalStructures());
    }

    @GetMapping("/rainfall")
    public ResponseEntity<Map<String, Object>> getRainfallData(@RequestParam(required = false) Double lat, @RequestParam(required = false) Double lng) {
        Map<String, Object> data = new HashMap<>();
        data.put("annualRainfallMm", 980.0);
        data.put("monsoonRainfallMm", 740.0);
        data.put("max24hRainfallMm", 85.0);
        data.put("source", "IMD Gridded Rainfall Service (1x1 deg)");
        return ResponseEntity.ok(data);
    }

    @GetMapping("/soil")
    public ResponseEntity<Map<String, Object>> getSoilData(@RequestParam(required = false) Double lat, @RequestParam(required = false) Double lng) {
        Map<String, Object> data = new HashMap<>();
        data.put("soilType", "Sandy Loam");
        data.put("permeability", "Moderate");
        data.put("infiltrationRateMmHr", 25.0);
        data.put("source", "NBSS & LUP Soil Map Layer");
        return ResponseEntity.ok(data);
    }

    @GetMapping("/groundwater")
    public ResponseEntity<Map<String, Object>> getGroundwaterData(@RequestParam(required = false) Double lat, @RequestParam(required = false) Double lng) {
        Map<String, Object> data = new HashMap<>();
        data.put("waterTableDepthMeters", 14.5);
        data.put("condition", "Safe");
        data.put("source", "CGWB Groundwater Monitoring Network");
        return ResponseEntity.ok(data);
    }
}
