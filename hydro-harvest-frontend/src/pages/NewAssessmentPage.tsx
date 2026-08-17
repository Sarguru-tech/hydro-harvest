import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAssessment } from '../services/api';
import {
  MapPin,
  Calculator,
  Layers,
  Droplet,
  Compass
} from 'lucide-react';

export const NewAssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    assessmentName: 'PSG Tech Campus Hostel Block A',
    address: 'Avinashi Road, Peelamedu',
    district: 'Coimbatore',
    state: 'Tamil Nadu',

    latitude: 11.0244,
    longitude: 76.9944,

    areaSqm: 250,
    roofType: 'Flat RCC',
    roofMaterial: 'Concrete',
    numberOfFloors: 3,
    buildingUsage: 'Institutional',

    annualRainfallMm: 980,
    monsoonRainfallMm: 740,

    soilType: 'Sandy Loam',
    groundwaterDepthMeters: 14.5,
    waterTableCondition: 'Safe',
    terrainSlopePercent: 2.5,
    nearbyWaterBody: true,
    nearbyWaterBodyType: 'Singanallur Eri Pond',
  });

  const liveCoeff =
    formData.roofMaterial === 'Concrete'
      ? 0.85
      : formData.roofMaterial === 'Metal'
        ? 0.92
        : formData.roofMaterial === 'Tiles'
          ? 0.78
          : 0.80;

  const filterEfficiency = 0.90;

  const liveHarvest = Math.round(
    formData.areaSqm *
    formData.annualRainfallMm *
    liveCoeff *
    filterEfficiency
  );

  const handleGpsCapture = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          latitude: Number(pos.coords.latitude.toFixed(4)),
          longitude: Number(pos.coords.longitude.toFixed(4)),
        }));
      },
      () => {
        alert('GPS location could not be captured. Coimbatore coordinates retained.');
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);
    setErrorMessage('');

    try {
      /*
       * IMPORTANT:
       * The backend AssessmentRequestDTO expects important
       * assessment parameters at the top level.
       *
       * We therefore send the values both:
       * 1. As top-level fields for backend calculation.
       * 2. Inside rooftopData/rainfallData/soilGroundwaterData
       *    for the frontend/domain model.
       */

      const assessmentRequest = {
        assessmentName: formData.assessmentName,
        address: formData.address,
        district: formData.district,
        state: formData.state,

        latitude: formData.latitude,
        longitude: formData.longitude,

        // TOP-LEVEL ROOFTOP DATA
        areaSqm: formData.areaSqm,
        roofType: formData.roofType,
        roofMaterial: formData.roofMaterial,
        numberOfFloors: formData.numberOfFloors,
        buildingUsage: formData.buildingUsage,
        runoffCoefficient: liveCoeff,

        // TOP-LEVEL RAINFALL DATA
        annualRainfallMm: formData.annualRainfallMm,
        monsoonRainfallMm: formData.monsoonRainfallMm,
        max24hRainfallMm: 85,
        rainfallSource: 'USER_INPUT',

        // TOP-LEVEL HYDROGEOLOGY DATA
        soilType: formData.soilType,
        infiltrationRateMmHr: 25,
        permeability: 'Moderate',
        groundwaterDepthMeters: formData.groundwaterDepthMeters,
        waterTableCondition: formData.waterTableCondition,
        terrainSlopePercent: formData.terrainSlopePercent,
        nearbyWaterBody: formData.nearbyWaterBody,
        nearbyWaterBodyType: formData.nearbyWaterBodyType,

        // NESTED DATA FOR THE FRONTEND DOMAIN MODEL
        rooftopData: {
          areaSqm: formData.areaSqm,
          roofType: formData.roofType,
          roofMaterial: formData.roofMaterial,
          numberOfFloors: formData.numberOfFloors,
          buildingUsage: formData.buildingUsage,
          runoffCoefficient: liveCoeff,
        },

        rainfallData: {
          annualRainfallMm: formData.annualRainfallMm,
          monsoonRainfallMm: formData.monsoonRainfallMm,
          max24hRainfallMm: 85,
          rainfallSource: 'USER_INPUT',
        },

        soilGroundwaterData: {
          soilType: formData.soilType,
          infiltrationRateMmHr: 25,
          permeability: 'Moderate',
          groundwaterDepthMeters: formData.groundwaterDepthMeters,
          waterTableCondition: formData.waterTableCondition,
          terrainSlopePercent: formData.terrainSlopePercent,
          nearbyWaterBody: formData.nearbyWaterBody,
          nearbyWaterBodyType: formData.nearbyWaterBodyType,
        },
      };

      console.log(
        'Submitting HydroHarvest assessment:',
        assessmentRequest
      );

      const res = await createAssessment(assessmentRequest);

      console.log(
        'HydroHarvest assessment response:',
        res
      );

      if (!res?.id) {
        throw new Error('Assessment was created but no assessment ID was returned.');
      }

      navigate(`/assessment/${res.id}`);
    } catch (err) {
      console.error('Error creating assessment:', err);

      setErrorMessage(
        'Unable to create the assessment. Please make sure the HydroHarvest backend is running on port 8080.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">

      <div className="border-b border-slate-800 pb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
          On-Spot Field Hydro-Assessment
        </span>

        <h1 className="text-3xl font-outfit font-extrabold text-slate-100 mt-1">
          New RWH & Artificial Recharge Assessment
        </h1>

        <p className="text-xs text-slate-400">
          Enter property parameters or capture GPS coordinates to generate an explainable report.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 bg-red-950/40 border border-red-500/40 rounded-xl text-sm text-red-300">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* LOCATION */}

        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">

          <div className="flex items-center justify-between">

            <h3 className="text-base font-outfit font-bold text-slate-100 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span>Location & Administrative Region</span>
            </h3>

            <button
              type="button"
              onClick={handleGpsCapture}
              className="px-3 py-1.5 bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors"
            >
              <Compass className="w-4 h-4" />
              <span>Auto-Capture GPS</span>
            </button>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">

            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-slate-300">
                Assessment / Property Title
              </label>

              <input
                type="text"
                value={formData.assessmentName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    assessmentName: e.target.value
                  })
                }
                required
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                District
              </label>

              <input
                type="text"
                value={formData.district}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    district: e.target.value
                  })
                }
                required
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                State
              </label>

              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    state: e.target.value
                  })
                }
                required
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Latitude (°N)
              </label>

              <input
                type="number"
                step="0.0001"
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    latitude: Number(e.target.value)
                  })
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Longitude (°E)
              </label>

              <input
                type="number"
                step="0.0001"
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    longitude: Number(e.target.value)
                  })
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

          </div>
        </div>

        {/* ROOFTOP */}

        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">

          <h3 className="text-base font-outfit font-bold text-slate-100 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-teal-400" />
            <span>Building & Rooftop Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Rooftop Catchment Area (m²)
              </label>

              <input
                type="number"
                min="1"
                step="0.01"
                value={formData.areaSqm}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    areaSqm: Number(e.target.value)
                  })
                }
                required
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Roof Surface Material
              </label>

              <select
                value={formData.roofMaterial}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    roofMaterial: e.target.value
                  })
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Concrete">
                  Reinforced Concrete (Coeff: 0.85)
                </option>

                <option value="Metal">
                  Metal Sheet (Coeff: 0.92)
                </option>

                <option value="Tiles">
                  Clay Tiles (Coeff: 0.78)
                </option>

                <option value="Asbestos">
                  Asbestos Sheet (Coeff: 0.80)
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Roof Type / Structure
              </label>

              <select
                value={formData.roofType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    roofType: e.target.value
                  })
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Flat RCC">
                  Flat RCC Surface
                </option>

                <option value="Sloped">
                  Sloped Roof
                </option>

                <option value="Curved">
                  Curved / Dome Roof
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Number of Floors
              </label>

              <input
                type="number"
                min="1"
                value={formData.numberOfFloors}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    numberOfFloors: Number(e.target.value)
                  })
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Building Usage Category
              </label>

              <select
                value={formData.buildingUsage}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    buildingUsage: e.target.value
                  })
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Residential">
                  Residential Building
                </option>

                <option value="Institutional">
                  Institutional / Educational
                </option>

                <option value="Commercial">
                  Commercial Complex
                </option>

                <option value="Industrial">
                  Industrial Facility
                </option>
              </select>
            </div>

          </div>
        </div>

        {/* RAINFALL / HYDROGEOLOGY */}

        <div className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">

          <h3 className="text-base font-outfit font-bold text-slate-100 flex items-center space-x-2">
            <Droplet className="w-5 h-5 text-emerald-400" />
            <span>
              Rainfall, Soil Permeability & Hydrogeology
            </span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs">

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Annual Rainfall (mm)
              </label>

              <input
                type="number"
                min="0"
                step="0.1"
                value={formData.annualRainfallMm}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    annualRainfallMm: Number(e.target.value)
                  })
                }
                required
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Soil Permeability Type
              </label>

              <select
                value={formData.soilType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    soilType: e.target.value
                  })
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Sandy Loam">
                  Sandy Loam (High Permeability)
                </option>

                <option value="Gravelly">
                  Gravelly Soil (Very High Permeability)
                </option>

                <option value="Clay Loam">
                  Clay Loam (Moderate Permeability)
                </option>

                <option value="Black Cotton">
                  Black Cotton / Heavy Clay (Low Permeability)
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Groundwater Depth (Meters)
              </label>

              <input
                type="number"
                min="0"
                step="0.1"
                value={formData.groundwaterDepthMeters}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    groundwaterDepthMeters: Number(e.target.value)
                  })
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Water Table Status
              </label>

              <select
                value={formData.waterTableCondition}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    waterTableCondition: e.target.value
                  })
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Safe">
                  Safe Zone
                </option>

                <option value="Semi-Critical">
                  Semi-Critical Zone
                </option>

                <option value="Critical">
                  Critical Zone
                </option>

                <option value="Over-Exploited">
                  Over-Exploited Aquifer
                </option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Terrain Slope (%)
              </label>

              <input
                type="number"
                min="0"
                step="0.1"
                value={formData.terrainSlopePercent}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    terrainSlopePercent: Number(e.target.value)
                  })
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-slate-300">
                Proximity to Traditional Water Structure
              </label>

              <select
                value={formData.nearbyWaterBodyType}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nearbyWaterBodyType: e.target.value
                  })
                }
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Singanallur Eri Pond">
                  Eri Cascading Tank (Tamil Nadu)
                </option>

                <option value="Oorani Village Tank">
                  Oorani Drinking Pond
                </option>

                <option value="Stepwell / Baoli">
                  Historical Stepwell / Baoli
                </option>

                <option value="Johad Catchment">
                  Johad Check Dam
                </option>

                <option value="Storm Drainage">
                  Municipal Stormwater Drain
                </option>
              </select>
            </div>

          </div>
        </div>

        {/* LIVE CALCULATION */}

        <div className="p-4 bg-gradient-to-r from-cyan-950/80 to-sky-950/80 rounded-2xl border border-cyan-500/40 flex items-center justify-between text-xs">

          <div className="space-y-0.5">

            <span className="font-bold uppercase text-cyan-400 text-[10px] tracking-wider">
              Real-Time Instant Preview
            </span>

            <p className="text-slate-200 font-semibold">
              Live Harvest Potential:

              <span className="text-cyan-300 font-outfit text-base font-extrabold ml-1">
                {liveHarvest.toLocaleString()} L/Yr
              </span>
            </p>

            <p className="text-[10px] text-slate-400">
              {formData.annualRainfallMm.toLocaleString()} mm ×{' '}
              {formData.areaSqm.toLocaleString()} m² ×{' '}
              {liveCoeff.toFixed(2)} × 0.90
            </p>

          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-sky-600 hover:from-cyan-500 hover:to-sky-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-lg shadow-cyan-600/30 flex items-center space-x-2"
          >

            {submitting ? (
              <span>
                Calculating Hydro-Parameters...
              </span>
            ) : (
              <>
                <Calculator className="w-4 h-4" />

                <span>
                  Generate Full Report
                </span>
              </>
            )}

          </button>

        </div>

      </form>

    </div>
  );
};