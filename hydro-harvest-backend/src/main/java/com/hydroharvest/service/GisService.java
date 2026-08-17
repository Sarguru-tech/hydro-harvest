package com.hydroharvest.service;

import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class GisService {

    public Map<String, Object> reverseGeocode(Double lat, Double lng) {
        Map<String, Object> res = new HashMap<>();
        res.put("latitude", lat);
        res.put("longitude", lng);

        if (lat == null || lng == null) {
            res.put("address", "Avinashi Road, Peelamedu");
            res.put("district", "Coimbatore");
            res.put("state", "Tamil Nadu");
            return res;
        }

        if (lat >= 10.5 && lat <= 11.5 && lng >= 76.5 && lng <= 77.5) {
            res.put("address", "Avinashi Road, Peelamedu");
            res.put("district", "Coimbatore");
            res.put("state", "Tamil Nadu");
        } else if (lat >= 12.8 && lat <= 13.2 && lng >= 80.0 && lng <= 80.3) {
            res.put("address", "Anna Salai, Guindy");
            res.put("district", "Chennai");
            res.put("state", "Tamil Nadu");
        } else if (lat >= 26.8 && lat <= 27.2 && lng >= 75.6 && lng <= 76.0) {
            res.put("address", "MI Road, Pink City");
            res.put("district", "Jaipur");
            res.put("state", "Rajasthan");
        } else {
            res.put("address", "Central Town Road");
            res.put("district", "Coimbatore");
            res.put("state", "Tamil Nadu");
        }
        return res;
    }

    public List<Map<String, Object>> getGisLayers() {
        List<Map<String, Object>> layers = new ArrayList<>();

        Map<String, Object> l1 = new HashMap<>();
        l1.put("id", "assessments");
        l1.put("name", "HydroHarvest RWH Assessments");
        l1.put("type", "point");
        l1.put("visible", true);
        layers.add(l1);

        Map<String, Object> l2 = new HashMap<>();
        l2.put("id", "traditional_eris");
        l2.put("name", "Traditional Eris & Ooranis");
        l2.put("type", "point");
        l2.put("visible", true);
        layers.add(l2);

        Map<String, Object> l3 = new HashMap<>();
        l3.put("id", "stepwells");
        l3.put("name", "Historical Stepwells & Baolis");
        l3.put("type", "point");
        l3.put("visible", true);
        layers.add(l3);

        Map<String, Object> l4 = new HashMap<>();
        l4.put("id", "groundwater_recharge_potential");
        l4.put("name", "Groundwater Recharge Zone Map");
        l4.put("type", "polygon");
        l4.put("visible", false);
        layers.add(l4);

        return layers;
    }

    public List<Map<String, Object>> getTraditionalStructures() {
        List<Map<String, Object>> list = new ArrayList<>();

        Map<String, Object> s1 = new HashMap<>();
        s1.put("id", 1);
        s1.put("name", "Singanallur Lake Eri");
        s1.put("type", "Eri");
        s1.put("district", "Coimbatore");
        s1.put("state", "Tamil Nadu");
        s1.put("latitude", 10.9982);
        s1.put("longitude", 77.0258);
        s1.put("capacityM3", 1500000);
        s1.put("status", "Active Restoration");
        list.add(s1);

        Map<String, Object> s2 = new HashMap<>();
        s2.put("id", 2);
        s2.put("name", "Valankulam Oorani Tank");
        s2.put("type", "Oorani");
        s2.put("district", "Coimbatore");
        s2.put("state", "Tamil Nadu");
        s2.put("latitude", 10.9930);
        s2.put("longitude", 76.9680);
        s2.put("capacityM3", 850000);
        s2.put("status", "Operational");
        list.add(s2);

        Map<String, Object> s3 = new HashMap<>();
        s3.put("id", 3);
        s3.put("name", "Chand Baori Stepwell");
        s3.put("type", "Stepwell / Baoli");
        s3.put("district", "Dausa");
        s3.put("state", "Rajasthan");
        s3.put("latitude", 27.0072);
        s3.put("longitude", 76.6062);
        s3.put("capacityM3", 45000);
        s3.put("status", "Verified Heritage Site");
        list.add(s3);

        return list;
    }
}
