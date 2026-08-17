# HydroHarvest Frontend (`hydro-harvest-frontend`)

**Subtitle**: *IKS-Integrated Intelligent Rainwater Harvesting & Groundwater Recharge Assessment Platform*

> Developed for Smart India Hackathon (SIH) 2025  
> **Problem Statement**: "Application for on-spot assessment of rooftop rainwater harvesting and artificial recharge potential and sizing."

---

## 🎨 Technology Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Hydro-Glow CSS Tokens + Glassmorphism
- **Icons**: Lucide React
- **Charts**: Recharts (Monthly Trends, Structure Distributions, Before/After Comparisons)
- **GIS Maps**: Leaflet + React-Leaflet (Interactive dark mode maps, traditional heritage popups, layer toggles)
- **API Client**: Axios + Fallback Mock Provider for Zero-Setup Offline Demo Readiness

---

## 📑 Feature Modules

1. **Landing Page**: Water conservation statistics, rainwater harvesting intro, IKS traditional systems spotlight, interactive trial calculator, CTA buttons.
2. **National Water Intelligence Dashboard**: KPI cards, monthly rainfall vs harvest trends, structure distribution pie, assessment location map.
3. **On-Spot Assessment Form (`/assessment/new`)**: GPS auto-capture, rooftop surface parameters, rainfall lookup, soil permeability selection, live real-time calculation preview.
4. **Assessment Result Report (`/assessment/:id`)**: Professional 10-section report dashboard with visual block score gauges, explainable AI checklist, transparent hydro-formula box, and PDF export.
5. **Traditional Water Heritage GIS Map (`/gis-map`)**: Interactive map with layer toggles (Assessments, Eris & Ooranis, Stepwells & Baolis, Johads), search filters, custom popups.
6. **IKS Knowledge Hub (`/iks-hub`)**: Catalog of ancient Indian hydrological wisdom with verified reference markers vs community entries.
7. **Community Submission Portal (`/community`)**: Crowdsourced water observation portal with field verification workflow (`PENDING` -> `FIELD_VERIFIED` -> `APPROVED`).
8. **Water Analytics (`/analytics`)**: Before vs After RWH implementation impact comparisons, monetary savings, potable water substitution rates.

---

## 🚀 Execution & Setup

```bash
# Navigate to frontend directory
cd hydro-harvest-frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

App will run at `http://localhost:5173`.
