package com.hydroharvest.entity;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RainfallData {
    private Double annualRainfallMm;
    private Double monsoonRainfallMm;
    private Double max24hRainfallMm;
    private String rainfallSource; // IMD_API, HISTORICAL_STATION, USER_INPUT
}
