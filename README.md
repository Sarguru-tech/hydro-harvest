# 💧 HydroHarvest

### IKS-Integrated Intelligent Rainwater Harvesting & Groundwater Recharge Assessment Platform

> **Turning Every Drop into a Sustainable Resource.**

HydroHarvest is an intelligent water-management platform designed to assess **rooftop rainwater harvesting potential, groundwater recharge suitability, and sustainable water-management strategies** using Artificial Intelligence, GIS, explainable decision support, and Indian Knowledge Systems (IKS).

The platform is designed around the **Smart India Hackathon (SIH) 2025 problem statement** related to on-spot assessment of rooftop rainwater harvesting and artificial recharge potential and sizing.

---

## 🌊 Problem

Rainwater is one of India's most important natural water resources, yet a significant portion of rainfall becomes surface runoff and is lost without being effectively harvested or recharged into the ground.

Conventional rainwater-harvesting assessment often requires manual measurements, hydrological expertise, and location-specific data.

A scalable solution should be able to answer:

* How much rainwater can a building harvest?
* How much water can potentially be recharged?
* Is the location suitable for groundwater recharge?
* What type and size of structure should be considered?
* What factors influenced the recommendation?
* Are there traditional water-management practices relevant to the location?
* How can citizens, engineers, and government officials make data-driven decisions?

HydroHarvest addresses these challenges through an integrated digital platform.

---

# 🎯 Objectives

HydroHarvest aims to:

* Assess rooftop rainwater harvesting potential.
* Estimate annual and seasonal water collection.
* Evaluate groundwater recharge suitability.
* Recommend suitable water-management structures.
* Provide transparent and explainable calculations.
* Integrate GIS-based location intelligence.
* Preserve and incorporate relevant Indian Knowledge Systems.
* Enable community participation.
* Provide analytics and visualization.
* Support field-level on-spot assessment.
* Create a foundation for future AI/ML and external geospatial data integration.

---

# ✨ Key Features

## 💧 1. On-Spot Rainwater Assessment

Users can enter location and building information such as:

* GPS coordinates
* rooftop area
* roof type
* roof material
* rainfall
* soil characteristics
* groundwater depth
* existing water infrastructure

The system estimates the potential amount of rainwater that can be harvested.

---

## 📐 2. Transparent Water-Harvesting Calculation

HydroHarvest makes its calculations explainable.

A simplified harvesting model is:

```text
Harvestable Water
=
Rainfall × Rooftop Area × Runoff Coefficient
```

The platform can display:

* monthly harvesting potential
* annual harvesting potential
* runoff estimation
* storage requirements
* water-saving potential

The calculation parameters are designed to be configurable for future domain-specific refinement.

---

# 🌱 3. Groundwater Recharge Suitability

The platform evaluates recharge suitability using multiple factors, including:

* rainfall
* soil characteristics
* infiltration potential
* groundwater conditions
* terrain-related factors
* drainage conditions
* location context

A recharge suitability score is generated on a scale of:

```text
0 ───────────────────────────── 100
Low             Medium             High
```

The system also explains the factors contributing to the score.

---

# 🤖 4. Explainable AI Recommendations

HydroHarvest is designed to provide intelligent recommendations rather than simply displaying numerical results.

Possible recommendations include:

* recharge pit
* recharge well
* storage tank
* infiltration structure
* rainwater collection system
* community water-retention strategy

Each recommendation can provide an explanation such as:

```text
Recommended Structure: Recharge Pit

Reasons:
✓ Suitable infiltration conditions
✓ Adequate rainfall potential
✓ Suitable groundwater depth
✓ Appropriate rooftop runoff

Recommendation Confidence: 86%
```

The architecture supports both:

* rule-based decision engines
* future machine-learning models

---

# 🗺️ 5. GIS & Heritage Water Mapping

HydroHarvest includes a GIS-oriented architecture for visualizing water resources and assessment locations.

Potential map layers include:

* assessment locations
* rainfall potential
* recharge potential
* rivers
* lakes
* ponds
* traditional water structures
* watersheds
* community-submitted water resources

The system is designed to support future integration with external geospatial and satellite datasets.

---

# 🇮🇳 6. Indian Knowledge Systems (IKS)

A key differentiator of HydroHarvest is its **IKS knowledge layer**.

The platform provides structured information about traditional Indian water-management practices, including examples such as:

* Eris
* Ooranis
* Stepwells / Baolis
* Temple tanks
* Kunds
* Johads
* Ahars
* Pynes
* traditional watershed-management practices

IKS is treated as **contextual ecological and cultural knowledge that complements modern hydrological and engineering assessment**.

It is not used as a replacement for scientific measurements, engineering standards, or professional validation.

---

# 🏛️ 7. Traditional Water Heritage

HydroHarvest provides a dedicated Heritage GIS concept for connecting modern water assessment with traditional water infrastructure.

For example:

```text
Location
   ↓
GIS Analysis
   ↓
Nearby Water Resources
   ↓
Traditional Water Systems
   ↓
Local Context
   ↓
Modern Rainwater Strategy
```

This creates a bridge between:

**Traditional knowledge + modern technology + sustainable water management**

---

# 👥 8. Community Participation

Citizens and community users can contribute information such as:

* local water structures
* traditional water practices
* photographs
* damaged ponds
* blocked drainage
* successful rainwater-harvesting systems
* local observations

A moderation workflow can be used:

```text
Community Submission
        ↓
Validation
        ↓
Field Verification
        ↓
Approval
        ↓
Knowledge / GIS Layer
```

This helps create a participatory water-management ecosystem.

---

# 📊 9. Intelligent Dashboard

The dashboard provides a centralized view of collected and calculated data.

Example indicators include:

* Total Assessments
* Total Rooftop Area
* Annual Harvesting Potential
* Estimated Recharge Potential
* Water Saved
* Recommended Structures
* High-Potential Locations
* Community Contributions

Visualizations can include:

* rainfall trends
* harvesting potential
* recharge suitability
* geographic distribution
* recommendation distribution
* water-saving analytics

---

# 📈 10. Analytics

HydroHarvest provides analytics for:

* rainfall trends
* water harvesting potential
* groundwater recharge potential
* assessment distribution
* water-saving estimates
* recommended structures
* regional comparisons

The architecture allows future integration of historical and real-world datasets.

---

# 📄 11. Assessment Reports

The platform is designed to generate assessment reports containing:

* location information
* rooftop details
* rainfall information
* harvesting calculations
* recharge suitability
* recommendations
* IKS context
* GIS information
* sustainability impact

Reports can be extended for use by:

* citizens
* engineers
* field officers
* researchers
* government departments

---

# 🏗️ System Architecture

```text
                         HYDROHARVEST
                              │
              ┌───────────────┴────────────────┐
              │                                │
         FRONTEND                           BACKEND
      React + TypeScript                  Spring Boot
              │                                │
              │                         REST API Layer
              │                                │
              │              ┌─────────────────┼─────────────────┐
              │              │                 │                 │
              │        Calculation          AI/ML              GIS
              │          Engine             Engine            Services
              │              │                 │                 │
              │              └─────────────────┼─────────────────┘
              │                                │
              │                         IKS Knowledge
              │                             Layer
              │                                │
              └────────────────────────┬───────┘
                                       │
                                  PostgreSQL
                                       │
                              Persistent Storage
```

---

# 🔄 Assessment Workflow

```text
User / Field Officer
        │
        ▼
Enter Location & Building Data
        │
        ▼
Rainfall + Soil + Groundwater Data
        │
        ▼
Rooftop Harvesting Calculation
        │
        ▼
Recharge Suitability Analysis
        │
        ▼
AI / Rule-Based Recommendation
        │
        ▼
IKS & Local Water Context
        │
        ▼
Assessment Result
        │
        ▼
GIS + Analytics + Report
```

---

# 🧠 AI/ML Architecture

HydroHarvest is designed to support future AI/ML models for:

### Rainfall Potential Prediction

Predict water availability using historical rainfall and location data.

### Recharge Suitability Classification

Classify locations according to groundwater recharge suitability.

### Structure Recommendation

Recommend appropriate harvesting/recharge structures.

### Water Demand Prediction

Estimate future water requirements.

### Seasonal Water Availability

Predict seasonal water availability and harvesting potential.

### Location Risk Classification

Identify locations requiring additional water-management intervention.

The current architecture can operate using a deterministic/rule-based baseline while remaining ready for trained ML models.

---

# 🧮 Calculation Engine

The backend separates calculation logic from controllers.

Example:

```text
Rainfall
    ×
Rooftop Area
    ×
Runoff Coefficient
    =
Harvestable Rainwater
```

Recharge suitability can incorporate weighted factors such as:

```text
Rainfall
+
Soil/Infiltration
+
Groundwater Conditions
+
Terrain
+
Drainage
+
Local Context
        ↓
Recharge Suitability Score
```

The exact coefficients and domain assumptions should be validated against appropriate hydrological and engineering standards before production deployment.

---

# 🛠️ Technology Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Recharts
* Leaflet / GIS integration
* Axios

## Backend

* Java
* Spring Boot
* Spring Data JPA
* Spring Security
* JWT
* REST APIs
* OpenAPI / Swagger

## Database

* PostgreSQL for containerized deployment
* H2 for lightweight local development

## DevOps

* Docker
* Docker Compose
* Git
* GitHub

---

# 📁 Repository Structure

```text
hydro-harvest/
│
├── hydro-harvest-frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── Dockerfile
│   └── README.md
│
├── hydro-harvest-backend/
│   ├── src/
│   ├── pom.xml
│   ├── Dockerfile
│   └── README.md
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

# 🔐 Security

HydroHarvest uses:

* JWT-based authentication
* password hashing
* role-based authorization
* request validation
* centralized exception handling
* audit logging
* environment-based configuration

Sensitive configuration such as:

```text
Database passwords
JWT secrets
API keys
```

must be stored using environment variables and must never be committed to the repository.

---

# 👤 User Roles

The platform architecture supports multiple stakeholder roles:

| Role             | Purpose                                |
| ---------------- | -------------------------------------- |
| `ADMIN`          | Platform administration                |
| `WATER_OFFICER`  | Government water-management operations |
| `FIELD_OFFICER`  | On-site assessment                     |
| `ENGINEER`       | Technical assessment                   |
| `RESEARCHER`     | Research and analysis                  |
| `COMMUNITY_USER` | Community participation                |
| `CITIZEN`        | Public assessment and information      |
| `VIEWER`         | Read-only access                       |

---

# 🚀 Getting Started

## Prerequisites

Install:

* Java 17+
* Maven
* Node.js 18+
* npm
* Git
* Docker Desktop (optional but recommended)

---

# 1. Clone the Repository

```bash
git clone https://github.com/Sarguru-tech/hydro-harvest.git
cd hydro-harvest
```

---

# 2. Frontend Setup

```bash
cd hydro-harvest-frontend
npm install
npm run dev
```

The development server will normally be available at:

```text
http://localhost:5173
```

---

# 3. Backend Setup

Open another terminal:

```bash
cd hydro-harvest-backend
mvn spring-boot:run
```

The backend will normally run at:

```text
http://localhost:8080
```

---

# 4. API Documentation

When the backend is running, Swagger/OpenAPI documentation is available through the configured Springdoc endpoints.

The API documentation path is:

```text
/api-docs
```

Swagger UI:

```text
/swagger-ui.html
```

---

# 🐳 Running with Docker

From the root directory:

```bash
docker compose up --build
```

This starts:

```text
PostgreSQL
     │
     ▼
Spring Boot Backend
     │
     ▼
React Frontend
```

Stop the containers with:

```bash
docker compose down
```

To remove persistent database storage as well:

```bash
docker compose down -v
```

> **Warning:** Removing volumes deletes the PostgreSQL data stored in the Docker volume.

---

# ⚙️ Environment Configuration

Create a local `.env` file based on:

```text
.env.example
```

Example:

```env
POSTGRES_PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret
```

Never commit the real `.env` file.

The repository intentionally contains `.env.example` files with placeholders instead of real credentials.

---

# 🧪 Testing

The backend contains automated tests for important calculation components.

Run:

```bash
cd hydro-harvest-backend
mvn test
```

The test suite can be expanded to cover:

* authentication
* assessment workflows
* API controllers
* database repositories
* recommendation engine
* IKS services
* GIS services
* report generation

---

# 📌 Current Development Status

| Component                          | Status |
| ---------------------------------- | ------ |
| Project Architecture               | ✅      |
| Frontend                           | ✅      |
| Backend                            | ✅      |
| REST API                           | ✅      |
| Authentication Architecture        | ✅      |
| Assessment Module                  | ✅      |
| Rainwater Calculation              | ✅      |
| Recharge Suitability Engine        | ✅      |
| AI Recommendation Architecture     | ✅      |
| IKS Knowledge Module               | ✅      |
| GIS Architecture                   | ✅      |
| Community Module                   | ✅      |
| Analytics                          | ✅      |
| Docker Configuration               | ✅      |
| GitHub Repository                  | ✅      |
| Production Deployment              | 🚧     |
| Real External GIS/Data APIs        | 🚧     |
| Production ML Models               | 🚧     |
| Production Hydrological Validation | 🚧     |

> Features marked as development/future scope should not be interpreted as already connected to live external services.

---

# 🌍 Sustainability Impact

HydroHarvest aims to contribute to:

### Sustainable Water Management

Encourages effective rainwater collection and groundwater recharge.

### Climate Resilience

Improves local preparedness for rainfall variability and water scarcity.

### Community Participation

Enables citizens to contribute local water-resource knowledge.

### Preservation of Knowledge

Creates a structured digital layer for traditional water-management knowledge.

### Data-Driven Decision Making

Provides calculations, maps, analytics, and explainable recommendations.

---

# 🇮🇳 IKS Integration Philosophy

HydroHarvest follows an important principle:

> **Traditional knowledge should complement scientific and engineering assessment, not replace it.**

IKS information can provide:

* historical context
* local ecological knowledge
* traditional water-management practices
* cultural understanding
* community observations

Scientific and engineering processes remain responsible for:

* quantitative assessment
* structural design
* groundwater analysis
* safety
* validation
* implementation decisions

This approach allows HydroHarvest to connect India's traditional water wisdom with modern digital technologies responsibly.

---

# 🏆 SIH Innovation

HydroHarvest combines several technology layers into a single decision-support platform:

```text
Indian Knowledge Systems
          +
GIS
          +
AI / ML
          +
Hydrological Calculations
          +
Community Knowledge
          +
Water Analytics
          ↓
Intelligent Water Management
```

The key innovation is not simply calculating rainfall.

It is connecting:

**Location → Environmental Data → Calculation → Recharge Assessment → AI Recommendation → IKS Context → Actionable Water Strategy**

---

# 🔮 Future Scope

Future versions can integrate:

* real-time weather APIs
* IMD rainfall datasets
* satellite imagery
* remote sensing
* groundwater datasets
* automated rooftop detection
* computer vision
* IoT water-level sensors
* smart water meters
* mobile GPS-based field surveys
* offline field data collection
* advanced ML models
* predictive water-demand modeling
* digital twins
* government GIS datasets
* real-time water-body monitoring

---

# ⚠️ Data & Responsible AI Disclaimer

HydroHarvest is an academic/prototype platform developed for demonstration and research purposes.

Demo datasets may be simulated.

AI-generated recommendations should not be treated as a substitute for:

* certified hydrological surveys
* structural engineering assessment
* groundwater investigations
* government approvals
* local regulatory requirements
* professional engineering judgment

Production deployment should use validated datasets, domain-approved methodologies, secure infrastructure, and appropriate government/technical review.

---

# 👨‍💻 Project

**HydroHarvest**

**IKS-Integrated Intelligent Rainwater Harvesting & Groundwater Recharge Assessment Platform**

Developed as a technology solution aligned with the **Smart India Hackathon 2025** problem domain.

---

# 📜 License

This project is intended for academic, research, innovation, and demonstration purposes.

A formal open-source license can be added before public production distribution.

---

# ⭐ Acknowledgement

HydroHarvest brings together:

**Technology + Sustainability + Indian Knowledge Systems + Community Participation**

with the goal of making water-management decisions more accessible, explainable, and data-driven.

---

## 💧 HydroHarvest

### **Turning Every Drop into a Sustainable Resource.**
