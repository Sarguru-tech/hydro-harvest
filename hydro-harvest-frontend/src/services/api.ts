import axios from 'axios';
import { Assessment, DashboardSummary, IksKnowledge, CommunitySubmission, User } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('hydro_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const MOCK_SUMMARY: DashboardSummary = {
  totalAssessments: 148,
  totalRooftopAreaSqm: 42800,
  totalAnnualHarvestableLiters: 36380000,
  totalAnnualRechargeLiters: 27285000,
  estimatedWaterSavingsInr: 2182800,
  highPotentialLocationsCount: 112,
  communitySubmissionsCount: 34,
  structureDistribution: {
    'Rooftop Recharge Pit': 58,
    'Recharge Trench with Shaft': 38,
    'Above-Ground Storage Tank': 24,
    'Gravity Injection Well': 18,
    'Eri / Oorani Connection': 10,
  },
  statusDistribution: {
    'COMPLETED': 104,
    'VERIFIED': 32,
    'REQUIRES_FIELD_INSPECTION': 12,
  },
  monthlyRainfallTrend: [
    { month: 'Jan', rainfallMm: 15 },
    { month: 'Feb', rainfallMm: 12 },
    { month: 'Mar', rainfallMm: 22 },
    { month: 'Apr', rainfallMm: 45 },
    { month: 'May', rainfallMm: 85 },
    { month: 'Jun', rainfallMm: 120 },
    { month: 'Jul', rainfallMm: 140 },
    { month: 'Aug', rainfallMm: 160 },
    { month: 'Sep', rainfallMm: 180 },
    { month: 'Oct', rainfallMm: 210 },
    { month: 'Nov', rainfallMm: 150 },
    { month: 'Dec', rainfallMm: 40 },
  ],
  monthlyHarvestingTrend: [
    { month: 'Jan', harvestLiters: 577000 },
    { month: 'Feb', harvestLiters: 462000 },
    { month: 'Mar', harvestLiters: 847000 },
    { month: 'Apr', harvestLiters: 1732000 },
    { month: 'May', harvestLiters: 3272000 },
    { month: 'Jun', harvestLiters: 4620000 },
    { month: 'Jul', harvestLiters: 5390000 },
    { month: 'Aug', harvestLiters: 6160000 },
    { month: 'Sep', harvestLiters: 6930000 },
    { month: 'Oct', harvestLiters: 8085000 },
    { month: 'Nov', harvestLiters: 5775000 },
    { month: 'Dec', harvestLiters: 1540000 },
  ],
};

export const MOCK_ASSESSMENTS: Assessment[] = [
  {
    id: 1,
    assessmentName: "PSG Tech Campus Block A",
    address: "Avinashi Road, Peelamedu",
    district: "Coimbatore",
    state: "Tamil Nadu",
    latitude: 11.0244,
    longitude: 76.9944,
    status: "VERIFIED",
    createdAt: "2026-08-15T10:30:00",
    rooftopData: {
      areaSqm: 450,
      roofType: "Flat RCC",
      roofMaterial: "Concrete",
      numberOfFloors: 4,
      buildingUsage: "Institutional",
      runoffCoefficient: 0.85
    },
    rainfallData: {
      annualRainfallMm: 980,
      monsoonRainfallMm: 720,
      max24hRainfallMm: 90,
      rainfallSource: "IMD_STATION"
    },
    soilGroundwaterData: {
      soilType: "Sandy Loam",
      infiltrationRateMmHr: 25,
      permeability: "Moderate",
      groundwaterDepthMeters: 16.5,
      waterTableCondition: "Safe",
      terrainSlopePercent: 2.0,
      nearbyWaterBody: true,
      nearbyWaterBodyType: "Singanallur Eri"
    },
    harvestingCalculation: {
      annualHarvestableLiters: 344250,
      monsoonHarvestableLiters: 252450,
      peakRunoffLitersPerSec: 3.2,
      recommendedStorageTankCapacityM3: 17.2,
      firstFlushVolumeLiters: 337.5,
      potableWaterSubstitutionPercentage: 88,
      estimatedCostSavingsInrPerYear: 20655
    },
    rechargeAssessment: {
      suitabilityScore: 86,
      suitabilityCategory: "Highly Suitable",
      estimatedAnnualRechargeLiters: 247860,
      scoreBreakdownJson: '{"soilPermeability":20,"groundwaterDepth":25,"rainfallAvailability":16,"terrainSlope":15,"drainageProximity":10,"total":86}'
    },
    recommendation: {
      primaryStructureType: "Recharge Trench with Dual Injection Shafts",
      recommendedDimensions: "10.0m x 1.5m x 2.0m Trench with 150mm perforated bore shaft",
      iksTraditionalStructureMatch: "Eri & Oorani Cascading Network",
      confidenceScorePercent: 92,
      XaiReasonsJson: '["Suitable soil permeability (Sandy Loam) and deep vadose zone (16.5m).","High rooftop runoff volume from 450m² roof requires linear infiltration trench.","Proximity to Singanallur Eri enables safe overflow redirection into traditional catchment."]',
      implementationStepsJson: '["Dig 10m long trench along perimeter storm drain.","Drill 15m deep recharge shaft with slotted PVC casing inside trench.","Fill trench with graded aggregate boulders and install baffle filter box."]'
    }
  },
  {
    id: 2,
    assessmentName: "Anna Nagar Heights",
    address: "2nd Avenue, Anna Nagar",
    district: "Chennai",
    state: "Tamil Nadu",
    latitude: 13.0850,
    longitude: 80.2101,
    status: "COMPLETED",
    createdAt: "2026-08-16T14:15:00",
    rooftopData: {
      areaSqm: 180,
      roofType: "Flat",
      roofMaterial: "Concrete",
      numberOfFloors: 2,
      buildingUsage: "Residential",
      runoffCoefficient: 0.85
    },
    rainfallData: {
      annualRainfallMm: 1400,
      monsoonRainfallMm: 1100,
      max24hRainfallMm: 120,
      rainfallSource: "IMD_STATION"
    },
    soilGroundwaterData: {
      soilType: "Clay Loam",
      infiltrationRateMmHr: 12,
      permeability: "Low",
      groundwaterDepthMeters: 6.2,
      waterTableCondition: "Semi-Critical",
      terrainSlopePercent: 1.2,
      nearbyWaterBody: true,
      nearbyWaterBodyType: "Otteri Nullah"
    },
    harvestingCalculation: {
      annualHarvestableLiters: 192780,
      monsoonHarvestableLiters: 151470,
      peakRunoffLitersPerSec: 1.8,
      recommendedStorageTankCapacityM3: 9.6,
      firstFlushVolumeLiters: 135,
      potableWaterSubstitutionPercentage: 97,
      estimatedCostSavingsInrPerYear: 11566
    },
    rechargeAssessment: {
      suitabilityScore: 68,
      suitabilityCategory: "Moderately Suitable",
      estimatedAnnualRechargeLiters: 111426,
      scoreBreakdownJson: '{"soilPermeability":12,"groundwaterDepth":12,"rainfallAvailability":20,"terrainSlope":15,"drainageProximity":9,"total":68}'
    },
    recommendation: {
      primaryStructureType: "Above-Ground Storage Tank with Dual Filtration",
      recommendedDimensions: "10.0 m3 Masonry Cistern + Compact Sand Filter",
      iksTraditionalStructureMatch: "Temple Tank Catchment System",
      confidenceScorePercent: 88,
      XaiReasonsJson: '["Shallow water table (6.2m) limits rapid ground injection without risk of waterlogging.","High annual rainfall (1400mm) makes direct storage highly economical.","Dual filter mesh prevents urban atmospheric particulates from entering storage."]',
      implementationStepsJson: '["Mount first-flush divert pipe on downspout.","Connect outlet to 10 m³ reinforced masonry cistern.","Provide overflow link to stormwater drain."]'
    }
  }
];

export const MOCK_IKS: IksKnowledge[] = [
  {
    id: 1,
    title: "Eri Cascading Water System of Tamil Nadu",
    systemType: "Eri",
    region: "South India",
    state: "Tamil Nadu",
    district: "Kanchipuram & Chengalpattu",
    historicalContext: "Eris are ancient surface water tank networks constructed during the Sangam and Chola eras, interconnecting river basins through earthen bunds.",
    operatingPrinciple: "Monsoon overflow from an upper Eri gravity flows into successive lower Eris across the contour lines, controlling floods and recharging shallow alluvial aquifers.",
    suitableGeography: "Undulating plain topography with clay-loam topsoil and seasonal monsoon flows.",
    seasonalRelevance: "Monsoon capture (Oct-Dec) & summer storage supply.",
    sourceReference: "Tamil Nadu PWD Water Resources Department Historical Archives",
    isVerified: true
  },
  {
    id: 2,
    title: "Oorani Village Drinking Water Ponds",
    systemType: "Oorani",
    region: "South India",
    state: "Tamil Nadu",
    district: "Ramanathapuram & Sivagangai",
    historicalContext: "Community excavated clay-lined ponds specifically dedicated for village drinking water in coastal and saline groundwater tracts.",
    operatingPrinciple: "Harvests direct pristine surface runoff from protected grass catchments with natural siltation traps.",
    suitableGeography: "Saline coastal aquifers where groundwater is unpotable.",
    seasonalRelevance: "Year-round domestic supply.",
    sourceReference: "Central Ground Water Board IKS Monograph 2021",
    isVerified: true
  },
  {
    id: 3,
    title: "Johads of Alwar & Arid Rajasthan",
    systemType: "Johad",
    region: "North-West Arid Zone",
    state: "Rajasthan",
    district: "Alwar",
    historicalContext: "Simple concave earthen check dams built across natural contour slopes to trap monsoon rain.",
    operatingPrinciple: "Slows down flood runoff, allowing water to percolate into the dry desert vadose zone and reviving dried riverbeds like Arvari.",
    suitableGeography: "Hilly contours with permeable sandy-gravelly soil.",
    seasonalRelevance: "Post-monsoon groundwater elevation.",
    sourceReference: "Tarun Bharat Sangh Restoration Records",
    isVerified: true
  }
];

export const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
  try {
    const res = await apiClient.get<DashboardSummary>('/dashboard/summary');
    return res.data;
  } catch (err) {
    return MOCK_SUMMARY;
  }
};

export const fetchAssessments = async (): Promise<Assessment[]> => {
  try {
    const res = await apiClient.get<Assessment[]>('/assessments');
    return res.data.length > 0 ? res.data : MOCK_ASSESSMENTS;
  } catch (err) {
    return MOCK_ASSESSMENTS;
  }
};

export const fetchAssessmentById = async (id: number): Promise<Assessment> => {
  try {
    const res = await apiClient.get<Assessment>(`/assessments/${id}`);
    return res.data;
  } catch (err) {
    return MOCK_ASSESSMENTS.find(a => a.id === Number(id)) || MOCK_ASSESSMENTS[0];
  }
};

export const createAssessment = async (data: Partial<Assessment>): Promise<Assessment> => {
  try {
    const res = await apiClient.post<Assessment>('/assessments', data);
    return res.data;
  } catch (err) {
    const area = data.rooftopData?.areaSqm || 200;
    const rainfall = data.rainfallData?.annualRainfallMm || 950;
    const annualHarvest = Math.round(area * rainfall * 0.85 * 0.9);
    
    const newAssessment: Assessment = {
      id: Date.now(),
      assessmentName: data.assessmentName || 'On-Spot Field Assessment',
      address: data.address || 'Avinashi Road',
      district: data.district || 'Coimbatore',
      state: data.state || 'Tamil Nadu',
      latitude: data.latitude || 11.0168,
      longitude: data.longitude || 76.9558,
      status: 'COMPLETED',
      createdAt: new Date().toISOString(),
      rooftopData: {
        areaSqm: area,
        roofType: data.rooftopData?.roofType || 'Flat',
        roofMaterial: data.rooftopData?.roofMaterial || 'Concrete',
        numberOfFloors: data.rooftopData?.numberOfFloors || 2,
        buildingUsage: data.rooftopData?.buildingUsage || 'Residential',
        runoffCoefficient: 0.85
      },
      rainfallData: {
        annualRainfallMm: rainfall,
        monsoonRainfallMm: Math.round(rainfall * 0.75),
        max24hRainfallMm: 85,
        rainfallSource: 'IMD_STATION'
      },
      soilGroundwaterData: {
        soilType: data.soilGroundwaterData?.soilType || 'Sandy Loam',
        infiltrationRateMmHr: 25,
        permeability: 'Moderate',
        groundwaterDepthMeters: data.soilGroundwaterData?.groundwaterDepthMeters || 14,
        waterTableCondition: 'Safe',
        terrainSlopePercent: 2.5,
        nearbyWaterBody: true,
        nearbyWaterBodyType: 'Eri Lake'
      },
      harvestingCalculation: {
        annualHarvestableLiters: annualHarvest,
        monsoonHarvestableLiters: Math.round(annualHarvest * 0.75),
        peakRunoffLitersPerSec: 2.4,
        recommendedStorageTankCapacityM3: Math.round((annualHarvest * 0.05 / 1000) * 10) / 10,
        firstFlushVolumeLiters: area * 0.75,
        potableWaterSubstitutionPercentage: 92,
        estimatedCostSavingsInrPerYear: Math.round(annualHarvest * 0.06)
      },
      rechargeAssessment: {
        suitabilityScore: 82,
        suitabilityCategory: 'Highly Suitable',
        estimatedAnnualRechargeLiters: Math.round(annualHarvest * 0.72),
        scoreBreakdownJson: '{"soilPermeability":20,"groundwaterDepth":25,"rainfallAvailability":16,"terrainSlope":11,"drainageProximity":10,"total":82}'
      },
      recommendation: {
        primaryStructureType: 'Rooftop Recharge Pit with Baffle Filter',
        recommendedDimensions: '2.5m x 2.0m x 2.5m Gravel Pit',
        iksTraditionalStructureMatch: 'Eri & Oorani Cascading Network',
        confidenceScorePercent: 90,
        XaiReasonsJson: '["Suitable soil permeability (Sandy Loam) and groundwater depth (14m).","Sufficient annual rainfall (950mm) for rapid aquifer recharge.","Matches South Indian traditional Eri contour harvesting topography."]',
        implementationStepsJson: '["Excavate pit 2.5m x 2.0m x 2.5m near downspout.","Fill bottom with 1m boulders and middle with 0.5m coarse gravel.","Install dual-mesh first flush diverter."]'
      }
    };
    MOCK_ASSESSMENTS.unshift(newAssessment);
    return newAssessment;
  }
};

export const fetchIksKnowledge = async (): Promise<IksKnowledge[]> => {
  try {
    const res = await apiClient.get<IksKnowledge[]>('/iks');
    return res.data.length > 0 ? res.data : MOCK_IKS;
  } catch (err) {
    return MOCK_IKS;
  }
};
