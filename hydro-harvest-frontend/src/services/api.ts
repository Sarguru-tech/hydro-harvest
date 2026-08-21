import axios, { AxiosHeaders } from 'axios';
import {
  Assessment,
  DashboardSummary,
  IksKnowledge,
  CommunitySubmission,
  User,
} from '../types';

const API_ROOT =
  import.meta.env.VITE_API_BASE_URL ||
  'http://localhost:8080';

const API_BASE_URL =
  `${API_ROOT.replace(/\/$/, '')}/api`;

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 30000,
});

/* -------------------------------------------------------------------------- */
/* REQUEST INTERCEPTOR                                                        */
/* -------------------------------------------------------------------------- */

apiClient.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('hydro_token');

  if (token) {
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    config.headers.set(
      'Authorization',
      `Bearer ${token}`
    );
  }

  console.log(
    '[HydroHarvest API]',
    config.method?.toUpperCase(),
    `${config.baseURL ?? ''}${config.url ?? ''}`,
    config.data
  );

  return config;
});

/* -------------------------------------------------------------------------- */
/* RESPONSE INTERCEPTOR                                                       */
/* -------------------------------------------------------------------------- */

apiClient.interceptors.response.use(
  (response) => {
    console.log(
      '[HydroHarvest API RESPONSE]',
      response.status,
      response.config.url,
      response.data
    );

    return response;
  },

  (error) => {
    console.error(
      '[HydroHarvest API ERROR]',
      error
    );

    if (axios.isAxiosError(error)) {
      console.error(
        'Status:',
        error.response?.status
      );

      console.error(
        'Response:',
        error.response?.data
      );

      console.error(
        'URL:',
        error.config?.url
      );

      console.error(
        'Method:',
        error.config?.method
      );

      console.error(
        'Request:',
        error.config?.data
      );
    }

    return Promise.reject(error);
  }
);

/* -------------------------------------------------------------------------- */
/* DASHBOARD                                                                  */
/* -------------------------------------------------------------------------- */

type MonthlyTrendItem =
  Record<string, unknown>;

type Distribution =
  Record<string, number>;

type DashboardApiResponse =
  Partial<DashboardSummary> & {
    structureDistribution?:
      | Distribution
      | null;

    statusDistribution?:
      | Distribution
      | null;

    monthlyRainfallTrend?:
      | MonthlyTrendItem[]
      | null;

    monthlyHarvestingTrend?:
      | MonthlyTrendItem[]
      | null;
  };

const DEFAULT_SUMMARY:
  DashboardSummary = {
  totalAssessments: 0,

  totalRooftopAreaSqm: 0,

  totalAnnualHarvestableLiters: 0,

  totalAnnualRechargeLiters: 0,

  estimatedWaterSavingsInr: 0,

  highPotentialLocationsCount: 0,

  communitySubmissionsCount: 0,

  structureDistribution: {},

  statusDistribution: {},

  monthlyRainfallTrend: [],

  monthlyHarvestingTrend: [],
};

export const fetchDashboardSummary =
  async (): Promise<DashboardSummary> => {

    try {

      const response =
        await apiClient.get<DashboardApiResponse>(
          '/dashboard/summary'
        );

      const data =
        response.data ?? {};

      return {
        ...DEFAULT_SUMMARY,

        ...data,

        structureDistribution:
          data.structureDistribution ?? {},

        statusDistribution:
          data.statusDistribution ?? {},

        monthlyRainfallTrend:
          Array.isArray(
            data.monthlyRainfallTrend
          )
            ? data.monthlyRainfallTrend
            : [],

        monthlyHarvestingTrend:
          Array.isArray(
            data.monthlyHarvestingTrend
          )
            ? data.monthlyHarvestingTrend
            : [],
      };

    } catch (error) {

      console.error(
        'Dashboard summary failed:',
        error
      );

      return {
        ...DEFAULT_SUMMARY,

        structureDistribution: {},

        statusDistribution: {},

        monthlyRainfallTrend: [],

        monthlyHarvestingTrend: [],
      };
    }
  };

/* -------------------------------------------------------------------------- */
/* ASSESSMENTS                                                                */
/* -------------------------------------------------------------------------- */

export const fetchAssessments =
  async (): Promise<Assessment[]> => {

    try {

      const response =
        await apiClient.get<Assessment[]>(
          '/assessments'
        );

      if (
        Array.isArray(
          response.data
        )
      ) {
        return response.data;
      }

      return [];

    } catch (error) {

      console.error(
        'Fetch assessments failed:',
        error
      );

      return [];
    }
  };

/* -------------------------------------------------------------------------- */
/* GET ASSESSMENT BY ID                                                       */
/* -------------------------------------------------------------------------- */

export const fetchAssessmentById =
  async (
    id: number
  ): Promise<Assessment> => {

    const response =
      await apiClient.get<Assessment>(
        `/assessments/${id}`
      );

    return response.data;
  };

/* -------------------------------------------------------------------------- */
/* CREATE ASSESSMENT                                                          */
/* -------------------------------------------------------------------------- */

export interface CreateAssessmentData {

  assessmentName: string;

  address: string;

  district: string;

  state: string;

  latitude: number;

  longitude: number;

  areaSqm: number;

  roofType: string;

  roofMaterial: string;

  numberOfFloors: number;

  buildingUsage: string;

  runoffCoefficient: number;

  annualRainfallMm: number;

  monsoonRainfallMm: number;

  max24hRainfallMm: number;

  rainfallSource: string;

  soilType: string;

  infiltrationRateMmHr: number;

  permeability: string;

  groundwaterDepthMeters: number;

  waterTableCondition: string;

  terrainSlopePercent: number;

  nearbyWaterBody: boolean;

  nearbyWaterBodyType: string;
}

/* -------------------------------------------------------------------------- */
/* CREATE ASSESSMENT API                                                      */
/* -------------------------------------------------------------------------- */

export const createAssessment =
  async (
    data: CreateAssessmentData
  ): Promise<Assessment> => {

    const payload = {

      assessmentName:
        data.assessmentName,

      address:
        data.address,

      district:
        data.district,

      state:
        data.state,

      latitude:
        data.latitude,

      longitude:
        data.longitude,

      /* Backend flat fields */

      areaSqm:
        data.areaSqm,

      roofType:
        data.roofType,

      roofMaterial:
        data.roofMaterial,

      numberOfFloors:
        data.numberOfFloors,

      buildingUsage:
        data.buildingUsage,

      runoffCoefficient:
        data.runoffCoefficient,

      annualRainfallMm:
        data.annualRainfallMm,

      monsoonRainfallMm:
        data.monsoonRainfallMm,

      max24hRainfallMm:
        data.max24hRainfallMm,

      rainfallSource:
        data.rainfallSource,

      soilType:
        data.soilType,

      infiltrationRateMmHr:
        data.infiltrationRateMmHr,

      permeability:
        data.permeability,

      groundwaterDepthMeters:
        data.groundwaterDepthMeters,

      waterTableCondition:
        data.waterTableCondition,

      terrainSlopePercent:
        data.terrainSlopePercent,

      nearbyWaterBody:
        data.nearbyWaterBody,

      nearbyWaterBodyType:
        data.nearbyWaterBodyType,

      /* Frontend nested fields */

      rooftopData: {

        areaSqm:
          data.areaSqm,

        roofType:
          data.roofType,

        roofMaterial:
          data.roofMaterial,

        numberOfFloors:
          data.numberOfFloors,

        buildingUsage:
          data.buildingUsage,

        runoffCoefficient:
          data.runoffCoefficient,
      },

      rainfallData: {

        annualRainfallMm:
          data.annualRainfallMm,

        monsoonRainfallMm:
          data.monsoonRainfallMm,

        max24hRainfallMm:
          data.max24hRainfallMm,

        rainfallSource:
          data.rainfallSource,
      },

      soilGroundwaterData: {

        soilType:
          data.soilType,

        infiltrationRateMmHr:
          data.infiltrationRateMmHr,

        permeability:
          data.permeability,

        groundwaterDepthMeters:
          data.groundwaterDepthMeters,

        waterTableCondition:
          data.waterTableCondition,

        terrainSlopePercent:
          data.terrainSlopePercent,

        nearbyWaterBody:
          data.nearbyWaterBody,

        nearbyWaterBodyType:
          data.nearbyWaterBodyType,
      },
    };

    try {

      console.log(
        'CREATE ASSESSMENT PAYLOAD:',
        payload
      );

      const response =
        await apiClient.post<Assessment>(
          '/assessments',
          payload
        );

      console.log(
        'ASSESSMENT CREATED:',
        response.data
      );

      return response.data;

    } catch (error) {

      console.error(
        'CREATE ASSESSMENT FAILED:',
        error
      );

      if (
        axios.isAxiosError(error)
      ) {

        const status =
          error.response?.status;

        const backendMessage =
          error.response?.data;

        console.error(
          'HTTP STATUS:',
          status
        );

        console.error(
          'BACKEND RESPONSE:',
          backendMessage
        );

        if (status === 400) {

          throw new Error(
            `Invalid assessment data: ${
              typeof backendMessage ===
              'string'
                ? backendMessage
                : JSON.stringify(
                    backendMessage
                  )
            }`
          );
        }

        if (status === 401) {

          localStorage.removeItem(
            'hydro_token'
          );

          throw new Error(
            'Authentication required. Please login again.'
          );
        }

        if (status === 403) {

          throw new Error(
            'Access denied by backend security. Please check the logged-in user permissions.'
          );
        }

        if (status === 404) {

          throw new Error(
            'Assessment API endpoint was not found: POST /api/assessments'
          );
        }

        if (status === 500) {

          throw new Error(
            `Backend calculation failed: ${
              typeof backendMessage ===
              'string'
                ? backendMessage
                : JSON.stringify(
                    backendMessage
                  )
            }`
          );
        }

        if (!error.response) {

          throw new Error(
            'Cannot connect to HydroHarvest backend at http://localhost:8080. Make sure Spring Boot is running.'
          );
        }
      }

      throw error;
    }
  };

/* -------------------------------------------------------------------------- */
/* IKS                                                                         */
/* -------------------------------------------------------------------------- */

export const fetchIksKnowledge =
  async (): Promise<
    IksKnowledge[]
  > => {

    try {

      const response =
        await apiClient.get<
          IksKnowledge[]
        >('/iks');

      return Array.isArray(
        response.data
      )
        ? response.data
        : [];

    } catch (error) {

      console.error(
        'IKS API failed:',
        error
      );

      return [];
    }
  };

/* -------------------------------------------------------------------------- */
/* COMMUNITY                                                                  */
/* -------------------------------------------------------------------------- */

export const fetchCommunitySubmissions =
  async (): Promise<
    CommunitySubmission[]
  > => {

    try {

      const response =
        await apiClient.get<
          CommunitySubmission[]
        >('/community');

      return Array.isArray(
        response.data
      )
        ? response.data
        : [];

    } catch (error) {

      console.error(
        'Community API failed:',
        error
      );

      return [];
    }
  };

/* -------------------------------------------------------------------------- */
/* CURRENT USER                                                               */
/* -------------------------------------------------------------------------- */

export const fetchCurrentUser =
  async (): Promise<User> => {

    const response =
      await apiClient.get<User>(
        '/auth/me'
      );

    return response.data;
  };