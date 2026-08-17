package com.hydroharvest.iks;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class IksRecommendationService {

    public Map<String, String> getIksMatch(String state, String district, String soilType, Double rainfallMm) {
        Map<String, String> match = new HashMap<>();
        String stateUpper = state != null ? state.toUpperCase() : "";
        
        if (stateUpper.contains("TAMIL NADU") || stateUpper.contains("TAMILNADU") || stateUpper.contains("KERALA") || stateUpper.contains("PUDUCHERRY")) {
            match.put("systemName", "Eri & Oorani Cascading Network");
            match.put("historicalContext", "Traditional South Indian surface water harvesting tank system dating back 2,000 years to Chola & Pandya dynasties.");
            match.put("operatingPrinciple", "Cascading earthen bund tanks that collect monsoon overflow across village clusters, providing gravity-fed irrigation and drinking water (Oorani).");
            match.put("suitabilityNote", "Ideal for clayey-loam soils and undulating terrain common in Tamil Nadu.");
        } else if (stateUpper.contains("RAJASTHAN") || stateUpper.contains("GUJARAT")) {
            match.put("systemName", "Stepwell (Baoli) & Johad / Taanka");
            match.put("historicalContext", "Deep architectural water masonry structures and earthen check dams perfected in medieval Rajasthan & Gujarat.");
            match.put("operatingPrinciple", "Taanka/Kunds catch direct rooftop & courtyard runoff in sealed subterranean cisterns; Johads trap surface runoff to recharge desert aquifers.");
            match.put("suitabilityNote", "Designed specifically for arid/semi-arid regions with low annual rainfall (<500mm) and high evaporation loss.");
        } else if (stateUpper.contains("BIHAR") || stateUpper.contains("JHARKHAND") || stateUpper.contains("WEST BENGAL")) {
            match.put("systemName", "Ahar-Pyne System");
            match.put("historicalContext", "Ancient floodwater harvesting system documented since the Mauryan empire in South Bihar.");
            match.put("operatingPrinciple", "Pynes are diversion channels that draw flood water from hilly rivulets and lead into Ahars (three-sided embankment reservoirs).");
            match.put("suitabilityNote", "Highly suited for flat floodplains with seasonal monsoon overflow.");
        } else if (stateUpper.contains("MAHARASHTRA") || stateUpper.contains("GOA")) {
            match.put("systemName", "Phad Irrigation & Bandhara");
            match.put("historicalContext", "Community-managed check dam and diversion weir system developed over 400 years ago in Tapi basin.");
            match.put("operatingPrinciple", "Low stone masonry check dams (Bandharas) divert stream flow into series of agricultural Phads.");
            match.put("suitabilityNote", "Best for basaltic terrain and steep slope streams of Western Ghats.");
        } else {
            match.put("systemName", "Kund & Traditional Village Pond");
            match.put("historicalContext", "Pan-Indian traditional village water harvesting commons with paved catchment slopes.");
            match.put("operatingPrinciple", "Direct surface runoff harvesting into desilted lined community storage tanks.");
            match.put("suitabilityNote", "Versatile community infrastructure suitable across varied agro-climatic zones.");
        }

        return match;
    }
}
