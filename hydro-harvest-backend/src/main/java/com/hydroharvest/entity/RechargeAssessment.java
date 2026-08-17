package com.hydroharvest.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RechargeAssessment {
    private Integer suitabilityScore; // 0 to 100
    private String suitabilityCategory; // Highly Suitable, Moderately Suitable, Marginal, Unsuitable
    private Double estimatedAnnualRechargeLiters;

    @Column(length = 2000)
    private String scoreBreakdownJson; // JSON representation of scoring criteria breakdown
}
