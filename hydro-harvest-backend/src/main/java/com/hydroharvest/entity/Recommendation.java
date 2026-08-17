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
public class Recommendation {
    private String primaryStructureType; // Storage Tank, Recharge Pit, Recharge Shaft/Well, Trench, Percolation Tank
    private String recommendedDimensions; // e.g., 3m x 2m x 2m
    private String iksTraditionalStructureMatch; // Eris, Oorani, Stepwell/Baoli, Johad, Kund, Ahars-Pynes
    private Integer confidenceScorePercent;

    @Column(length = 2500)
    private String XaiReasonsJson; // JSON array of explainable reasons

    @Column(length = 2000)
    private String implementationStepsJson; // Step by step guidelines
}
