package com.hydroharvest.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "assessments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Assessment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String assessmentName;
    private String address;
    private String district;
    private String state;
    private Double latitude;
    private Double longitude;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Embedded
    private RooftopData rooftopData;

    @Embedded
    private RainfallData rainfallData;

    @Embedded
    private SoilGroundwaterData soilGroundwaterData;

    @Embedded
    private HarvestingCalculation harvestingCalculation;

    @Embedded
    private RechargeAssessment rechargeAssessment;

    @Embedded
    private Recommendation recommendation;

    @Column(nullable = false)
    private String status; // DRAFT, COMPLETED, VERIFIED, REQUIRES_FIELD_INSPECTION

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "COMPLETED";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
