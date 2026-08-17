package com.hydroharvest.config;

import com.hydroharvest.dto.AssessmentRequestDTO;
import com.hydroharvest.entity.*;
import com.hydroharvest.repository.*;
import com.hydroharvest.service.AssessmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final AssessmentService assessmentService;
    private final IksKnowledgeRepository iksRepository;
    private final CommunitySubmissionRepository communityRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = userRepository.save(User.builder()
                    .email("admin@hydroharvest.gov.in")
                    .password(passwordEncoder.encode("Admin@123"))
                    .fullName("Dr. R. Ramanathan")
                    .organization("Central Ground Water Board (CGWB)")
                    .role(Role.ADMIN)
                    .build());

            userRepository.save(User.builder()
                    .email("water.officer@hydroharvest.gov.in")
                    .password(passwordEncoder.encode("Officer@123"))
                    .fullName("K. Meenakshi")
                    .organization("State Water Resources Department")
                    .role(Role.WATER_OFFICER)
                    .build());

            userRepository.save(User.builder()
                    .email("field.officer@hydroharvest.gov.in")
                    .password(passwordEncoder.encode("Field@123"))
                    .fullName("S. Anbarasan")
                    .organization("District Hydrology Unit")
                    .role(Role.FIELD_OFFICER)
                    .build());

            userRepository.save(User.builder()
                    .email("citizen@hydroharvest.gov.in")
                    .password(passwordEncoder.encode("Citizen@123"))
                    .fullName("V. Priya")
                    .organization("Resident Association")
                    .role(Role.CITIZEN)
                    .build());

            AssessmentRequestDTO a1 = new AssessmentRequestDTO();
            a1.setAssessmentName("PSG Tech Campus Hostel Block A");
            a1.setAddress("Avinashi Road, Peelamedu");
            a1.setDistrict("Coimbatore");
            a1.setState("Tamil Nadu");
            a1.setLatitude(11.0244);
            a1.setLongitude(76.9944);
            a1.setAreaSqm(450.0);
            a1.setRoofType("Flat RCC");
            a1.setRoofMaterial("Concrete");
            a1.setNumberOfFloors(4);
            a1.setBuildingUsage("Institutional");
            a1.setAnnualRainfallMm(980.0);
            a1.setMonsoonRainfallMm(720.0);
            a1.setSoilType("Sandy Loam");
            a1.setPermeability("Moderate");
            a1.setGroundwaterDepthMeters(16.5);
            a1.setWaterTableCondition("Safe");
            a1.setTerrainSlopePercent(2.0);
            a1.setNearbyWaterBody(true);
            a1.setNearbyWaterBodyType("Singanallur Eri");
            assessmentService.createAssessment(a1, admin);

            AssessmentRequestDTO a2 = new AssessmentRequestDTO();
            a2.setAssessmentName("Anna Nagar Residential Complex");
            a2.setAddress("2nd Avenue, Anna Nagar");
            a2.setDistrict("Chennai");
            a2.setState("Tamil Nadu");
            a2.setLatitude(13.0850);
            a2.setLongitude(80.2101);
            a2.setAreaSqm(180.0);
            a2.setRoofType("Flat");
            a2.setRoofMaterial("Concrete");
            a2.setNumberOfFloors(2);
            a2.setBuildingUsage("Residential");
            a2.setAnnualRainfallMm(1400.0);
            a2.setMonsoonRainfallMm(1100.0);
            a2.setSoilType("Clay Loam");
            a2.setPermeability("Low");
            a2.setGroundwaterDepthMeters(6.2);
            a2.setWaterTableCondition("Semi-Critical");
            a2.setTerrainSlopePercent(1.2);
            a2.setNearbyWaterBody(true);
            a2.setNearbyWaterBodyType("Otteri Nullah");
            assessmentService.createAssessment(a2, admin);

            AssessmentRequestDTO a3 = new AssessmentRequestDTO();
            a3.setAssessmentName("Pink City Heritage Bhavan");
            a3.setAddress("Johari Bazaar");
            a3.setDistrict("Jaipur");
            a3.setState("Rajasthan");
            a3.setLatitude(26.9124);
            a3.setLongitude(75.7873);
            a3.setAreaSqm(320.0);
            a3.setRoofType("Sloped");
            a3.setRoofMaterial("Tiles");
            a3.setNumberOfFloors(3);
            a3.setBuildingUsage("Commercial");
            a3.setAnnualRainfallMm(520.0);
            a3.setMonsoonRainfallMm(410.0);
            a3.setSoilType("Coarse Sand");
            a3.setPermeability("High");
            a3.setGroundwaterDepthMeters(38.0);
            a3.setWaterTableCondition("Over-Exploited");
            a3.setTerrainSlopePercent(3.5);
            a3.setNearbyWaterBody(false);
            assessmentService.createAssessment(a3, admin);

            iksRepository.save(IksKnowledge.builder()
                    .title("Eri Cascading Water System of Tamil Nadu")
                    .systemType("Eri")
                    .region("South India")
                    .state("Tamil Nadu")
                    .district("Kanchipuram & Chengalpattu")
                    .historicalContext("Eris are ancient surface water tank networks constructed during the Sangam and Chola eras, interconnecting river basins through earthen bunds.")
                    .operatingPrinciple("Monsoon overflow from an upper Eri gravity flows into successive lower Eris across the contour lines, controlling floods and recharging shallow alluvial aquifers.")
                    .suitableGeography("Undulating plain topography with clay-loam topsoil and seasonal monsoon flows.")
                    .seasonalRelevance("Monsoon capture (Oct-Dec) & summer storage supply.")
                    .sourceReference("Tamil Nadu PWD Water Resources Department Historical Archives")
                    .isVerified(true)
                    .build());

            iksRepository.save(IksKnowledge.builder()
                    .title("Oorani Village Drinking Water Ponds")
                    .systemType("Oorani")
                    .region("South India")
                    .state("Tamil Nadu")
                    .district("Ramanathapuram & Sivagangai")
                    .historicalContext("Community excavated clay-lined ponds specifically dedicated for village drinking water in coastal and saline groundwater tracts.")
                    .operatingPrinciple("Harvests direct pristine surface runoff from protected grass catchments with natural siltation traps.")
                    .suitableGeography("Saline coastal aquifers where groundwater is unpotable.")
                    .seasonalRelevance("Year-round domestic supply.")
                    .sourceReference("Central Ground Water Board IKS Monograph 2021")
                    .isVerified(true)
                    .build());

            iksRepository.save(IksKnowledge.builder()
                    .title("Johads of Alwar & Arid Rajasthan")
                    .systemType("Johad")
                    .region("North-West Arid Zone")
                    .state("Rajasthan")
                    .district("Alwar")
                    .historicalContext("Simple concave earthen check dams built across natural contour slopes to trap monsoon rain.")
                    .operatingPrinciple("Slows down flood runoff, allowing water to percolate into the dry desert vadose zone and reviving dried riverbeds like Arvari.")
                    .suitableGeography("Hilly contours with permeable sandy-gravelly soil.")
                    .seasonalRelevance("Post-monsoon groundwater elevation.")
                    .sourceReference("Tarun Bharat Sangh Restoration Records")
                    .isVerified(true)
                    .build());

            communityRepository.save(CommunitySubmission.builder()
                    .structureName("Ancient Temple Tank - Perur Pateeswarar")
                    .structureType("Temple Tank")
                    .description("Large stone masonry temple tank needing desilting to improve local ward groundwater table.")
                    .address("Perur")
                    .district("Coimbatore")
                    .state("Tamil Nadu")
                    .latitude(10.9772)
                    .longitude(76.9158)
                    .status("FIELD_VERIFIED")
                    .submittedByEmail("citizen@hydroharvest.gov.in")
                    .verifiedByOfficer("field.officer@hydroharvest.gov.in")
                    .build());
        }
    }
}
