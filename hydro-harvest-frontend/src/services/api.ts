import axios from 'axios';
import {
  Assessment,
  DashboardSummary,
  IksKnowledge,
  CommunitySubmission,
  User
} from '../types';

const API_BASE_URL =
  `${import.meta.env.VITE_API_BASE_URL}/api`;

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

/* -------------------------------------------------------------------------- */
/* MOCK DATA                                                                  */
/* -------------------------------------------------------------------------- */

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
    COMPLETED: 104,
    VERIFIED: 32,
    REQUIRES_FIELD_INSPECTION: 12,
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
    assessmentName: 'PSG Tech Campus Block A',
    address: 'Avinashi Road, Peelamedu',
    district: 'Coimbatore',
    state: 'Tamil Nadu',
    latitude: 11.0244,
    longitude: 76.9944,
    status: 'VERIFIED',
    createdAt: '2026-08-15T10:30:00',

    rooftopData: {
      areaSqm: 450,
      roofType: 'Flat RCC',
      roofMaterial: 'Concrete',
      numberOfFloors: 4,
      buildingUsage: 'Institutional',
      runoffCoefficient: 0.85,
    },

    rainfallData: {
      annualRainfallMm: 980,
      monsoonRainfallMm: 720,
      max24hRainfallMm: 90,
      rainfallSource: 'IMD_STATION',
    },

    soilGroundwaterData: {
      soilType: 'Sandy Loam',
      infiltrationRateMmHr: 25,
      permeability: 'Moderate',
      groundwaterDepthMeters: 16.5,
      waterTableCondition: 'Safe',
      terrainSlopePercent: 2.0,
      nearbyWaterBody: true,
      nearbyWaterBodyType: 'Singanallur Eri',
    },

    harvestingCalculation: {
      annualHarvestableLiters: 344250,
      monsoonHarvestableLiters: 252450,
      peakRunoffLitersPerSec: 3.2,
      recommendedStorageTankCapacityM3: 17.2,
      firstFlushVolumeLiters: 337.5,
      potableWaterSubstitutionPercentage: 88,
      estimatedCostSavingsInrPerYear: 20655,
    },

    rechargeAssessment: {
      suitabilityScore: 86,
      suitabilityCategory: 'Highly Suitable',
      estimatedAnnualRechargeLiters: 247860,
      scoreBreakdownJson:
        '{"soilPermeability":20,"groundwaterDepth":25,"rainfallAvailability":16,"terrainSlope":15,"drainageProximity":10,"total":86}',
    },

    recommendation: {
      primaryStructureType: 'Recharge Trench with Dual Injection Shafts',
      recommendedDimensions:
        '10.0m x 1.5m x 2.0m Trench with 150mm perforated bore shaft',
      iksTraditionalStructureMatch: 'Eri & Oorani Cascading Network',
      confidenceScorePercent: 92,
      XaiReasonsJson:
        '["Suitable soil permeability (Sandy Loam) and deep vadose zone (16.5m).","High rooftop runoff volume from 450m² roof requires linear infiltration trench.","Proximity to Singanallur Eri enables safe overflow redirection into traditional catchment."]',
      implementationStepsJson:
        '["Dig 10m long trench along perimeter storm drain.","Drill 15m deep recharge shaft with slotted PVC casing inside trench.","Fill trench with graded aggregate boulders and install baffle filter box."]',
    },
  },

  {
    id: 2,
    assessmentName: 'Anna Nagar Heights',
    address: '2nd Avenue, Anna Nagar',
    district: 'Chennai',
    state: 'Tamil Nadu',
    latitude: 13.085,
    longitude: 80.2101,
    status: 'COMPLETED',
    createdAt: '2026-08-16T14:15:00',

    rooftopData: {
      areaSqm: 180,
      roofType: 'Flat',
      roofMaterial: 'Concrete',
      numberOfFloors: 2,
      buildingUsage: 'Residential',
      runoffCoefficient: 0.85,
    },

    rainfallData: {
      annualRainfallMm: 1400,
      monsoonRainfallMm: 1100,
      max24hRainfallMm: 120,
      rainfallSource: 'IMD_STATION',
    },

    soilGroundwaterData: {
      soilType: 'Clay Loam',
      infiltrationRateMmHr: 12,
      permeability: 'Low',
      groundwaterDepthMeters: 6.2,
      waterTableCondition: 'Semi-Critical',
      terrainSlopePercent: 1.2,
      nearbyWaterBody: true,
      nearbyWaterBodyType: 'Otteri Nullah',
    },

    harvestingCalculation: {
      annualHarvestableLiters: 192780,
      monsoonHarvestableLiters: 151470,
      peakRunoffLitersPerSec: 1.8,
      recommendedStorageTankCapacityM3: 9.6,
      firstFlushVolumeLiters: 135,
      potableWaterSubstitutionPercentage: 97,
      estimatedCostSavingsInrPerYear: 11566,
    },

    rechargeAssessment: {
      suitabilityScore: 68,
      suitabilityCategory: 'Moderately Suitable',
      estimatedAnnualRechargeLiters: 111426,
      scoreBreakdownJson:
        '{"soilPermeability":12,"groundwaterDepth":12,"rainfallAvailability":20,"terrainSlope":15,"drainageProximity":9,"total":68}',
    },

    recommendation: {
      primaryStructureType:
        'Above-Ground Storage Tank with Dual Filtration',
      recommendedDimensions:
        '10.0 m3 Masonry Cistern + Compact Sand Filter',
      iksTraditionalStructureMatch: 'Temple Tank Catchment System',
      confidenceScorePercent: 88,
      XaiReasonsJson:
        '["Shallow water table (6.2m) limits rapid ground injection without risk of waterlogging.","High annual rainfall (1400mm) makes direct storage highly economical.","Dual filter mesh prevents urban atmospheric particulates from entering storage."]',
      implementationStepsJson:
        '["Mount first-flush divert pipe on downspout.","Connect outlet to 10 m³ reinforced masonry cistern.","Provide overflow link to stormwater drain."]',
    },
  },
];

export const MOCK_IKS: IksKnowledge[] = [
  {
    id: 1,
    title: 'Eri Cascading Water System of Tamil Nadu',
    systemType: 'Eri',
    region: 'South India',
    state: 'Tamil Nadu',
    district: 'Kanchipuram & Chengalpattu',
    historicalContext:
      'Eris are ancient surface water tank networks constructed during the Sangam and Chola eras, interconnecting river basins through earthen bunds.',
    operatingPrinciple:
      'Monsoon overflow from an upper Eri gravity flows into successive lower Eris across the contour lines, controlling floods and recharging shallow alluvial aquifers.',
    suitableGeography:
      'Undulating plain topography with clay-loam topsoil and seasonal monsoon flows.',
    seasonalRelevance: 'Monsoon capture (Oct-Dec) & summer storage supply.',
    sourceReference:
      'Tamil Nadu PWD Water Resources Department Historical Archives',
    isVerified: true,
  },

  {
    id: 2,
    title: 'Oorani Village Drinking Water Ponds',
    systemType: 'Oorani',
    region: 'South India',
    state: 'Tamil Nadu',
    district: 'Ramanathapuram & Sivagangai',
    historicalContext:
      'Community excavated clay-lined ponds specifically dedicated for village drinking water in coastal and saline groundwater tracts.',
    operatingPrinciple:
      'Harvests direct pristine surface runoff from protected grass catchments with natural siltation traps.',
    suitableGeography:
      'Saline coastal aquifers where groundwater is unpotable.',
    seasonalRelevance: 'Year-round domestic supply.',
    sourceReference:
      'Central Ground Water Board IKS Monograph 2021',
    isVerified: true,
  },

  {
    id: 3,
    title: 'Johads of Alwar & Arid Rajasthan',
    systemType: 'Johad',
    region: 'North-West Arid Zone',
    state: 'Rajasthan',
    district: 'Alwar',
    historicalContext:
      'Simple concave earthen check dams built across natural contour slopes to trap monsoon rain.',
    operatingPrinciple:
      'Slows down flood runoff, allowing water to percolate into the dry desert vadose zone and reviving dried riverbeds like Arvari.',
    suitableGeography:
      'Hilly contours with permeable sandy-gravelly soil.',
    seasonalRelevance: 'Post-monsoon groundwater elevation.',
    sourceReference:
      'Tarun Bharat Sangh Restoration Records',
    isVerified: true,
  },
];

/* -------------------------------------------------------------------------- */
/* DASHBOARD                                                                  */
/* -------------------------------------------------------------------------- */

export const fetchDashboardSummary =
  async (): Promise<DashboardSummary> => {
    try {
      const res = await apiClient.get<DashboardSummary>(
        '/dashboard/summary'
      );

      return res.data;
    } catch (err) {
      console.error(
        'Dashboard API failed. Using mock dashboard data:',
        err
      );

      return MOCK_SUMMARY;
    }
  };

/* -------------------------------------------------------------------------- */
/* ASSESSMENTS                                                                */
/* -------------------------------------------------------------------------- */

export const fetchAssessments = async (): Promise<Assessment[]> => {
  const res = await apiClient.get<Assessment[]>('/assessments');

  return res.data;
};

export const fetchAssessmentById = async (
  id: number
): Promise<Assessment> => {
  const res = await apiClient.get<Assessment>(
    `/assessments/${id}`
  );

  return res.data;
};

/* -------------------------------------------------------------------------- */
/* CREATE ASSESSMENT                                                          */
/* -------------------------------------------------------------------------- */

export const createAssessment = async (
  data: Partial<Assessment>
): Promise<Assessment> => {
  try {
    console.log('Sending assessment to backend:', data);

    const res = await apiClient.post<Assessment>(
      '/assessments',
      data
    );

    console.log(
      'Assessment received from backend:',
      res.data
    );

    return res.data;
  } catch (error) {
    console.error(
      'CREATE ASSESSMENT API FAILED:',
      error
    );

    if (axios.isAxiosError(error)) {
      console.error(
        'Status:',
        error.response?.status
      );

      console.error(
        'Backend response:',
        error.response?.data
      );

      console.error(
        'Request URL:',
        error.config?.url
      );

      console.error(
        'Request data:',
        error.config?.data
      );
    }

    /*
     * IMPORTANT:
     * Do NOT silently create a fake assessment here.
     *
     * Previously, if the backend failed, this function created
     * a local mock assessment. That made it appear as though
     * the backend calculation was working even when it wasn't.
     *
     * We now throw the error so the UI can show the real problem.
     */

    throw error;
  }
};

/* -------------------------------------------------------------------------- */
/* IKS KNOWLEDGE                                                              */
/* -------------------------------------------------------------------------- */

export const fetchIksKnowledge =
  async (): Promise<IksKnowledge[]> => {
    try {
      const res = await apiClient.get<IksKnowledge[]>(
        '/iks'
      );

      return res.data;
    } catch (err) {
      console.error(
        'IKS API failed. Using mock IKS data:',
        err
      );

      return MOCK_IKS;
    }
  };

/* -------------------------------------------------------------------------- */
/* COMMUNITY                                                                  */
/* -------------------------------------------------------------------------- */

export const fetchCommunitySubmissions =
  async (): Promise<CommunitySubmission[]> => {
    const res =
      await apiClient.get<CommunitySubmission[]>(
        '/community'
      );

    return res.data;
  };

/* -------------------------------------------------------------------------- */
/* USERS                                                                      */
/* -------------------------------------------------------------------------- */

export const fetchCurrentUser =
  async (): Promise<User> => {
    const res =
      await apiClient.get<User>('/auth/me');

    return res.data;
  };