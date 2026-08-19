package com.hydroharvest.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
public class RootController {

    @GetMapping("/")
    public Map<String, Object> home() {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("application", "HydroHarvest Backend");
        response.put("status", "UP");
        response.put("version", "1.0.0");
        response.put("message", "HydroHarvest API is running successfully");
        response.put("health", "/actuator/health");

        return response;
    }
}