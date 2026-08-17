package com.hydroharvest.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "iks_knowledge")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IksKnowledge {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String systemType; // Eri, Oorani, Stepwell/Baoli, Johad, Kund, Ahar-Pyne, Temple Tank
    private String region;
    private String state;
    private String district;

    @Column(length = 2000)
    private String historicalContext;

    @Column(length = 2000)
    private String ecologicalPurpose;

    @Column(length = 2000)
    private String operatingPrinciple;

    @Column(length = 2000)
    private String suitableGeography;

    private String seasonalRelevance;
    private String sourceReference;
    private Boolean isVerified;
    private String imageUrl;

    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        if (this.isVerified == null) {
            this.isVerified = true;
        }
    }
}
