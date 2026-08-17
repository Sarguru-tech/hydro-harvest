export type Role = 
  | 'ADMIN'
  | 'WATER_OFFICER'
  | 'FIELD_OFFICER'
  | 'ENGINEER'
  | 'RESEARCHER'
  | 'COMMUNITY_USER'
  | 'CITIZEN'
  | 'VIEWER';

export interface User {
  id?: number;
  email: string;
  fullName: string;
  role: Role;
  organization?: string;
  phoneNumber?: string;
}

export interface RooftopData {
  areaSqm: number;
  roofType: string;
  roofMaterial: string;
  numberOfFloors: number;
  buildingUsage: string;
  runoffCoefficient: number;
}

export interface RainfallData {
  annualRainfallMm: number;
  monsoonRainfallMm: number;
  max24hRainfallMm: number;
  rainfallSource: string;
}

export interface SoilGroundwaterData {
  soilType: string;
  infiltrationRateMmHr: number;
  permeability: string;
  groundwaterDepthMeters: number;
  waterTableCondition: string;
  terrainSlopePercent: number;
  nearbyWaterBody: boolean;
  nearbyWaterBodyType?: string;
}

export interface HarvestingCalculation {
  annualHarvestableLiters: number;
  monsoonHarvestableLiters: number;
  peakRunoffLitersPerSec: number;
  recommendedStorageTankCapacityM3: number;
  firstFlushVolumeLiters: number;
  potableWaterSubstitutionPercentage: number;
  estimatedCostSavingsInrPerYear: number;
}

export interface RechargeAssessment {
  suitabilityScore: number;
  suitabilityCategory: string;
  estimatedAnnualRechargeLiters: number;
  scoreBreakdownJson: string;
}

export interface Recommendation {
  primaryStructureType: string;
  recommendedDimensions: string;
  iksTraditionalStructureMatch: string;
  confidenceScorePercent: number;
  XaiReasonsJson: string;
  implementationStepsJson: string;
}

export interface Assessment {
  id: number;
  assessmentName: string;
  address: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  rooftopData: RooftopData;
  rainfallData: RainfallData;
  soilGroundwaterData: SoilGroundwaterData;
  harvestingCalculation: HarvestingCalculation;
  rechargeAssessment: RechargeAssessment;
  recommendation: Recommendation;
  status: string;
  createdAt: string;
}

export interface DashboardSummary {
  totalAssessments: number;
  totalRooftopAreaSqm: number;
  totalAnnualHarvestableLiters: number;
  totalAnnualRechargeLiters: number;
  estimatedWaterSavingsInr: number;
  highPotentialLocationsCount: number;
  communitySubmissionsCount: number;
  structureDistribution: Record<string, number>;
  statusDistribution: Record<string, number>;
  monthlyRainfallTrend: { month: string; rainfallMm: number }[];
  monthlyHarvestingTrend: { month: string; harvestLiters: number }[];
}

export interface IksKnowledge {
  id: number;
  title: string;
  systemType: string;
  region: string;
  state: string;
  district: string;
  historicalContext: string;
  operatingPrinciple: string;
  suitableGeography: string;
  seasonalRelevance: string;
  sourceReference: string;
  isVerified: boolean;
}

export interface CommunitySubmission {
  id: number;
  structureName: string;
  structureType: string;
  description: string;
  address: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  status: 'PENDING' | 'FIELD_VERIFIED' | 'APPROVED' | 'REJECTED';
  submittedByEmail: string;
  verifiedByOfficer?: string;
  createdAt: string;
}
