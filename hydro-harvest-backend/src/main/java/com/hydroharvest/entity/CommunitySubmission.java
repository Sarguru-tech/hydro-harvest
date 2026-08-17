package com.hydroharvest.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "community_submissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunitySubmission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String structureName;

    private String structureType; // Traditional Pond, Stepwell, Damaged Drain, Waterlogged Site, Successful RWH
    private String description;
    private String address;
    private String district;
    private String state;
    private Double latitude;
    private Double longitude;
    private String imageUrl;

    @Column(nullable = false)
    private String status; // PENDING, FIELD_VERIFIED, APPROVED, REJECTED

    private String submittedByEmail;
    private String verifiedByOfficer;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.status == null) {
            this.status = "PENDING";
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
