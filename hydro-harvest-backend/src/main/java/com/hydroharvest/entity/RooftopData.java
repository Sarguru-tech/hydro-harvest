package com.hydroharvest.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RooftopData {
    private Double areaSqm;
    private String roofType; // Flat, Sloped, Curved
    private String roofMaterial; // Concrete, Metal Sheet, Tiles, Asbestos
    private Integer numberOfFloors;
    private String buildingUsage; // Residential, Commercial, Institutional, Industrial
    private Double runoffCoefficient; // e.g. 0.85 for concrete, 0.90 for metal
}
