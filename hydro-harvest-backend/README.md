# HydroHarvest Backend Services (`hydro-harvest-backend`)

**Subtitle**: *IKS-Integrated Intelligent Rainwater Harvesting & Groundwater Recharge Assessment Platform*

> Developed for Smart India Hackathon (SIH) 2025  
> **Problem Statement**: "Application for on-spot assessment of rooftop rainwater harvesting and artificial recharge potential and sizing."

---

## 🚀 Overview

`hydro-harvest-backend` is a production-grade, Spring Boot 3 REST API backend designed for hydrology officers, engineers, field assessors, and citizens. It combines transparent hydro-mathematical calculation algorithms with an Explainable AI recommendation engine and Indian Knowledge Systems (IKS) heritage rules.

---

## 📑 Table of Contents

1. [Problem Statement & Proposed Solution](#-problem-statement--proposed-solution)
2. [Key Architecture & Modules](#-key-architecture--modules)
3. [Hydro-Calculation & Recharge Engines](#-hydro-calculation--recharge-engines)
4. [Indian Knowledge Systems (IKS) Integration](#-indian-knowledge-systems-iks-integration)
5. [AI/ML Engine Abstraction (6 Predictive Models)](#-aiml-engine-abstraction-6-predictive-models)
6. [Role-Based Access Control (RBAC) & Security](#-role-based-access-control-rbac--security)
7. [REST API Documentation & Swagger](#-rest-api-documentation--swagger)
8. [Database Schema & ER Diagram](#-database-schema--er-diagram)
9. [Installation & Execution](#-installation--execution)
10. [Docker & Deployment](#-docker--deployment)

---

## 🎯 Problem Statement & Proposed Solution

Urban and rural India face accelerating groundwater depletion due to unmonitored surface runoff and uncoordinated recharge structures. Most existing applications are basic volumetric rainfall calculators that ignore soil permeability, vadose zone thickness, water table conditions, and regional traditional water heritage.

**HydroHarvest** bridges modern hydrological engineering (CGWB & BIS standards) with 2,000+ years of proven Indian Knowledge Systems (Eris, Ooranis, Stepwells/Baolis, Johads, Ahars-Pynes) to recommend explainable, location-specific rainwater harvesting and artificial recharge strategies.

---

## 🛠 Key Architecture & Modules

```
com.hydroharvest
├── calculation         # Hydro-mathematical algorithms (Rooftop potential, Rational Method peak runoff, Recharge score)
├── recommendation      # Explainable AI engine (Rule baseline + 6 ML model abstraction layer)
├── iks                 # Indian Knowledge Systems rules (Eris, Baolis, Johads, Ahars-Pynes)
├── gis                 # Spatial location geocoding & layer lookup services
├── entity              # JPA Domain Entities (Assessment, Rooftop, Rainfall, Soil, Recharge, Recommendation, IKS, Community)
├── repository          # Spring Data JPA repositories
├── service             # Core Business Logic services
├── controller          # OpenAPI compliant REST Controllers
├── dto                 # Request/Response Data Transfer Objects
├── security            # JWT Authentication Filter, BCrypt & RBAC Security Configuration
└── config              # DataInitializer & application bootstrapping
```

---

## ⚙️ Installation & Local Execution

### Prerequisites
- Java 17 JDK
- Maven 3.8+

```bash
# Navigate to backend directory
cd hydro-harvest-backend

# Build & run
mvn clean spring-boot:run
```
