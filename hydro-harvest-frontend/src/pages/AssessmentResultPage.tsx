import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';

import { fetchAssessmentById } from '../services/api';
import { Assessment } from '../types';

import { ScoreMeter } from '../components/ScoreMeter';
import { ExplainableAiCard } from '../components/ExplainableAiCard';
import { CalculationFormulaBox } from '../components/CalculationFormulaBox';
import { GisMapComponent } from '../components/GisMapComponent';

import {
  Droplets,
  MapPin,
  ShieldCheck,
  BookOpen,
  Layers,
  ArrowLeft,
  Printer,
  Download,
  CheckCircle2,
} from 'lucide-react';

export const AssessmentResultPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [loading, setLoading] = useState(true);
  const [generatingPdf, setGeneratingPdf] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        if (id) {
          const data = await fetchAssessmentById(Number(id));
          setAssessment(data);
        }
      } catch (error) {
        console.error('Failed to load assessment:', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading || !assessment) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex items-center space-x-3 text-cyan-400 font-semibold">
          <Droplets className="w-6 h-6 animate-spin" />
          <span>Generating HydroHarvest Assessment Report...</span>
        </div>
      </div>
    );
  }

  const {
    rooftopData: rooftop,
    rainfallData: rainfall,
    soilGroundwaterData: soil,
    harvestingCalculation: harvesting,
    rechargeAssessment: recharge,
    recommendation,
  } = assessment;

  const score = recharge?.suitabilityScore ?? 82;

  const annualHarvestableLiters =
    harvesting?.annualHarvestableLiters ?? 0;

  const harvestingPct = Math.min(
    100,
    Math.round((annualHarvestableLiters / 400000) * 100)
  );

  const resiliencePct = Math.round(
    score * 0.5 + harvestingPct * 0.5
  );

  const formatNumber = (value: number | undefined) => {
    if (value === undefined || value === null) {
      return '0';
    }

    return value.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    });
  };

  const formatDecimal = (value: number | undefined) => {
    if (value === undefined || value === null) {
      return '0';
    }

    return value.toLocaleString('en-IN', {
      maximumFractionDigits: 2,
    });
  };

  /*
   * --------------------------------------------------------------------------
   * PDF GENERATION
   * --------------------------------------------------------------------------
   */

  const handleDownloadPdf = () => {
    try {
      setGeneratingPdf(true);

      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = 210;
      const pageHeight = 297;

      const margin = 16;
      const contentWidth = pageWidth - margin * 2;

      let y = 18;

      const cyan = [6, 182, 212] as [number, number, number];
      const dark = [15, 23, 42] as [number, number, number];
      const slate = [71, 85, 105] as [number, number, number];
      const lightSlate = [100, 116, 139] as [number, number, number];
      const emerald = [16, 185, 129] as [number, number, number];
      const amber = [245, 158, 11] as [number, number, number];

      const addHeader = () => {
        doc.setFillColor(...dark);
        doc.rect(0, 0, pageWidth, 22, 'F');

        doc.setTextColor(...cyan);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(15);
        doc.text('HydroHarvest', margin, 10);

        doc.setTextColor(255, 255, 255);
        doc.setFontSize(7);
        doc.text(
          'IKS-Integrated Intelligent Rainwater Harvesting & Groundwater Recharge Platform',
          margin,
          16
        );

        doc.setTextColor(...lightSlate);
        doc.setFontSize(7);
        doc.text(
          'Smart India Hackathon 2025',
          pageWidth - margin,
          10,
          { align: 'right' }
        );
      };

      const addFooter = () => {
        doc.setDrawColor(203, 213, 225);
        doc.line(
          margin,
          pageHeight - 16,
          pageWidth - margin,
          pageHeight - 16
        );

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(...lightSlate);

        doc.text(
          'HydroHarvest | IKS-Integrated Water Intelligence Platform',
          margin,
          pageHeight - 10
        );

        doc.text(
          `Page ${doc.getNumberOfPages()}`,
          pageWidth - margin,
          pageHeight - 10,
          { align: 'right' }
        );
      };

      const newPage = () => {
        addFooter();
        doc.addPage();
        addHeader();
        y = 31;
      };

      const checkPageSpace = (requiredHeight: number) => {
        if (y + requiredHeight > pageHeight - 24) {
          newPage();
        }
      };

      const addSectionTitle = (
        title: string,
        color: [number, number, number] = cyan
      ) => {
        checkPageSpace(18);

        doc.setFillColor(241, 245, 249);
        doc.roundedRect(
          margin,
          y - 5,
          contentWidth,
          12,
          2,
          2,
          'F'
        );

        doc.setTextColor(...color);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(title, margin + 5, y + 3);

        y += 16;
      };

      const addField = (
        label: string,
        value: string,
        x: number,
        width: number
      ) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...lightSlate);
        doc.text(label.toUpperCase(), x, y);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...dark);

        const wrapped = doc.splitTextToSize(
          value || '-',
          width
        );

        doc.text(wrapped, x, y + 5);

        return Math.max(9, wrapped.length * 4);
      };

      const addParagraph = (
        text: string,
        fontSize = 8.5
      ) => {
        const lines = doc.splitTextToSize(
          text || '-',
          contentWidth - 8
        );

        checkPageSpace(lines.length * 4 + 7);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(fontSize);
        doc.setTextColor(...slate);
        doc.text(lines, margin + 4, y);

        y += lines.length * 4 + 6;
      };

      const addBulletList = (items: string[]) => {
        items.forEach((item, index) => {
          const lines = doc.splitTextToSize(
            `${index + 1}. ${item}`,
            contentWidth - 10
          );

          checkPageSpace(lines.length * 4 + 5);

          doc.setFont('helvetica', 'normal');
          doc.setFontSize(8.5);
          doc.setTextColor(...slate);
          doc.text(lines, margin + 5, y);

          y += lines.length * 4 + 4;
        });
      };

      const addMetricCard = (
        label: string,
        value: string,
        color: [number, number, number],
        x: number,
        cardWidth: number
      ) => {
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(226, 232, 240);

        doc.roundedRect(
          x,
          y,
          cardWidth,
          27,
          3,
          3,
          'FD'
        );

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...lightSlate);
        doc.text(label.toUpperCase(), x + 5, y + 7);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(...color);
        doc.text(value, x + 5, y + 18);
      };

      /*
       * ----------------------------------------------------------------------
       * PAGE 1 — COVER + EXECUTIVE SUMMARY
       * ----------------------------------------------------------------------
       */

      addHeader();

      y = 34;

      doc.setTextColor(...cyan);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.text(
        `ASSESSMENT REPORT #RPT-2025-${assessment.id}`,
        margin,
        y
      );

      y += 9;

      doc.setTextColor(...dark);
      doc.setFontSize(19);
      doc.text(
        assessment.assessmentName || 'HydroHarvest Assessment',
        margin,
        y
      );

      y += 7;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(...slate);
      doc.text(
        'Intelligent Rainwater Harvesting & Artificial Recharge Assessment',
        margin,
        y
      );

      y += 14;

      const cardGap = 4;
      const cardWidth =
        (contentWidth - cardGap * 2) / 3;

      addMetricCard(
        'Water Harvesting Potential',
        `${harvestingPct}%`,
        cyan,
        margin,
        cardWidth
      );

      addMetricCard(
        'Recharge Potential',
        `${score}%`,
        emerald,
        margin + cardWidth + cardGap,
        cardWidth
      );

      addMetricCard(
        'Overall Water Resilience',
        `${resiliencePct}%`,
        amber,
        margin + (cardWidth + cardGap) * 2,
        cardWidth
      );

      y += 38;

      addSectionTitle(
        'Section 1: Location & Administrative Overview'
      );

      const colWidth = contentWidth / 2 - 4;

      addField(
        'Property Address',
        assessment.address || '-',
        margin,
        colWidth
      );

      addField(
        'District & State',
        `${assessment.district || '-'}, ${assessment.state || '-'}`,
        margin + colWidth + 8,
        colWidth
      );

      y += 16;

      addField(
        'GPS Coordinates',
        `${formatDecimal(assessment.latitude)}°N, ${formatDecimal(
          assessment.longitude
        )}°E`,
        margin,
        colWidth
      );

      addField(
        'Verification Status',
        assessment.status || 'COMPLETED',
        margin + colWidth + 8,
        colWidth
      );

      y += 17;

      addSectionTitle(
        'Section 2: Rooftop Characteristics',
        [20, 184, 166]
      );

      addField(
        'Area',
        `${formatDecimal(rooftop?.areaSqm)} m²`,
        margin,
        colWidth
      );

      addField(
        'Material',
        rooftop?.roofMaterial || '-',
        margin + colWidth + 8,
        colWidth
      );

      y += 15;

      addField(
        'Runoff Coefficient',
        formatDecimal(rooftop?.runoffCoefficient),
        margin,
        colWidth
      );

      addField(
        'Building Usage',
        rooftop?.buildingUsage || '-',
        margin + colWidth + 8,
        colWidth
      );

      y += 17;

      addSectionTitle(
        'Section 3: Rainfall Data & Sources'
      );

      addField(
        'Annual Rainfall',
        `${formatDecimal(rainfall?.annualRainfallMm)} mm`,
        margin,
        colWidth
      );

      addField(
        'Monsoon Rainfall',
        `${formatDecimal(rainfall?.monsoonRainfallMm)} mm`,
        margin + colWidth + 8,
        colWidth
      );

      y += 15;

      addField(
        'Peak 24h Rainfall',
        `${formatDecimal(rainfall?.max24hRainfallMm)} mm`,
        margin,
        colWidth
      );

      addField(
        'Data Source',
        rainfall?.rainfallSource || 'USER_INPUT',
        margin + colWidth + 8,
        colWidth
      );

      /*
       * ----------------------------------------------------------------------
       * PAGE 2 — HARVESTING CALCULATION + RECHARGE
       * ----------------------------------------------------------------------
       */

      newPage();

      addSectionTitle(
        'Section 4: Rooftop Water Harvesting Calculations'
      );

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(203, 213, 225);

      doc.roundedRect(
        margin,
        y,
        contentWidth,
        39,
        3,
        3,
        'FD'
      );

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...slate);

      doc.text(
        'STANDARD RAINWATER HARVESTING FORMULA',
        margin + 5,
        y + 8
      );

      doc.setFont('courier', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...cyan);

      const formula =
        'Harvestable Volume (L) = Annual Rainfall (mm) × Rooftop Area (m²) × Runoff Coefficient × Filter Efficiency';

      const formulaLines = doc.splitTextToSize(
        formula,
        contentWidth - 10
      );

      doc.text(
        formulaLines,
        margin + 5,
        y + 15
      );

      doc.setFont('courier', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...dark);

      const calculationText =
        `${formatDecimal(rainfall?.annualRainfallMm)} × ` +
        `${formatDecimal(rooftop?.areaSqm)} × ` +
        `${formatDecimal(rooftop?.runoffCoefficient)} × 0.90`;

      doc.text(
        calculationText,
        margin + 5,
        y + 30
      );

      y += 48;

      const metricGap = 4;
      const metricWidth =
        (contentWidth - metricGap * 3) / 4;

      const formulaMetrics = [
        [
          'RAINFALL (P)',
          `${formatDecimal(rainfall?.annualRainfallMm)} mm`,
        ],
        [
          'ROOF AREA (A)',
          `${formatDecimal(rooftop?.areaSqm)} m²`,
        ],
        [
          'RUNOFF COEFF (Cr)',
          formatDecimal(rooftop?.runoffCoefficient),
        ],
        ['FILTER EFFICIENCY (η)', '0.90 (90%)'],
      ];

      formulaMetrics.forEach(
        ([label, value], index) => {
          const x =
            margin +
            index * (metricWidth + metricGap);

          doc.setFillColor(248, 250, 252);
          doc.setDrawColor(226, 232, 240);

          doc.roundedRect(
            x,
            y,
            metricWidth,
            25,
            2,
            2,
            'FD'
          );

          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6.5);
          doc.setTextColor(...lightSlate);

          doc.text(
            label,
            x + metricWidth / 2,
            y + 7,
            { align: 'center' }
          );

          doc.setFontSize(9);
          doc.setTextColor(...dark);

          doc.text(
            value,
            x + metricWidth / 2,
            y + 17,
            { align: 'center' }
          );
        }
      );

      y += 34;

      doc.setFillColor(236, 254, 255);
      doc.setDrawColor(...cyan);

      doc.roundedRect(
        margin,
        y,
        contentWidth,
        25,
        3,
        3,
        'FD'
      );

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...slate);

      doc.text(
        'CALCULATED HARVESTABLE WATER POTENTIAL',
        margin + 6,
        y + 9
      );

      doc.setFontSize(15);
      doc.setTextColor(...cyan);

      doc.text(
        `${formatNumber(annualHarvestableLiters)} Liters / Year`,
        pageWidth - margin - 6,
        y + 17,
        { align: 'right' }
      );

      y += 38;

      addSectionTitle(
        `Section 5: Artificial Recharge Suitability Scoring (${score}/100)`,
        emerald
      );

      addField(
        'Soil Type',
        soil?.soilType || '-',
        margin,
        colWidth
      );

      addField(
        'Water Table Depth',
        `${formatDecimal(soil?.groundwaterDepthMeters)} Meters`,
        margin + colWidth + 8,
        colWidth
      );

      y += 15;

      addField(
        'Aquifer Condition',
        soil?.waterTableCondition || '-',
        margin,
        colWidth
      );

      addField(
        'Terrain Slope',
        `${formatDecimal(soil?.terrainSlopePercent)}%`,
        margin + colWidth + 8,
        colWidth
      );

      y += 18;

      doc.setFillColor(236, 253, 245);
      doc.setDrawColor(167, 243, 208);

      doc.roundedRect(
        margin,
        y,
        contentWidth,
        24,
        3,
        3,
        'FD'
      );

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...emerald);

      doc.text(
        'RECHARGE SUITABILITY',
        margin + 6,
        y + 9
      );

      doc.setFontSize(15);
      doc.text(
        `${score}/100`,
        pageWidth - margin - 6,
        y + 16,
        { align: 'right' }
      );

      y += 34;

      /*
       * ----------------------------------------------------------------------
       * PAGE 3 — AI + IKS
       * ----------------------------------------------------------------------
       */

      newPage();

      addSectionTitle(
        'Section 6: AI Recommended Harvesting & Recharge Structure'
      );

      if (recommendation) {
        doc.setFillColor(248, 250, 252);
        doc.setDrawColor(203, 213, 225);

        doc.roundedRect(
          margin,
          y,
          contentWidth,
          36,
          3,
          3,
          'FD'
        );

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...lightSlate);

        doc.text(
          'RECOMMENDED SYSTEM STRUCTURE',
          margin + 6,
          y + 8
        );

        doc.setFontSize(13);
        doc.setTextColor(...dark);

        const structureLines =
          doc.splitTextToSize(
            recommendation.primaryStructureType ||
              'Recharge Structure',
            contentWidth - 12
          );

        doc.text(
          structureLines,
          margin + 6,
          y + 17
        );

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...slate);

        const dimensions =
          `Dimensions: ${
            recommendation.recommendedDimensions || '-'
          }`;

        const dimensionLines =
          doc.splitTextToSize(
            dimensions,
            contentWidth - 12
          );

        doc.text(
          dimensionLines,
          margin + 6,
          y + 28
        );

        y += 45;

        addSectionTitle(
          'WHY THIS RECOMMENDATION? — EXPLAINABLE REASONING',
          emerald
        );

        let reasons: string[] = [];

        try {
          const parsed = JSON.parse(
            recommendation.XaiReasonsJson || '[]'
          );

          if (Array.isArray(parsed)) {
            reasons = parsed.map(String);
          }
        } catch {
          if (recommendation.XaiReasonsJson) {
            reasons = [
              recommendation.XaiReasonsJson,
            ];
          }
        }

        if (reasons.length > 0) {
          addBulletList(reasons);
        } else {
          addParagraph(
            'The recommendation is generated using the HydroHarvest rules baseline and predictive classification approach.'
          );
        }

        y += 4;

        doc.setFillColor(254, 249, 195);
        doc.setDrawColor(253, 224, 71);

        doc.roundedRect(
          margin,
          y,
          contentWidth,
          27,
          3,
          3,
          'FD'
        );

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...amber);

        doc.text(
          'IKS TRADITIONAL WATER HERITAGE CONTEXT',
          margin + 6,
          y + 9
        );

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.setTextColor(...dark);

        const iksMatch =
          recommendation.iksTraditionalStructureMatch ||
          'Traditional Indian Water Management System';

        const iksLines =
          doc.splitTextToSize(
            `Matched Regional System: ${iksMatch}`,
            contentWidth - 12
          );

        doc.text(
          iksLines,
          margin + 6,
          y + 18
        );

        y += 37;

        addSectionTitle(
          'STEP-BY-STEP IMPLEMENTATION PROTOCOL',
          [20, 184, 166]
        );

        let implementationSteps: string[] = [];

        try {
          const parsed = JSON.parse(
            recommendation.implementationStepsJson ||
              '[]'
          );

          if (Array.isArray(parsed)) {
            implementationSteps =
              parsed.map(String);
          }
        } catch {
          if (
            recommendation.implementationStepsJson
          ) {
            implementationSteps = [
              recommendation.implementationStepsJson,
            ];
          }
        }

        if (implementationSteps.length > 0) {
          addBulletList(implementationSteps);
        } else {
          addParagraph(
            'Implementation protocol is based on the recommended harvesting and recharge structure.'
          );
        }
      }

      /*
       * ----------------------------------------------------------------------
       * PAGE 4 — IKS + SAVINGS + SPATIAL INFORMATION
       * ----------------------------------------------------------------------
       */

      newPage();

      addSectionTitle(
        'Section 7: IKS / Local Water Management Context',
        amber
      );

      doc.setFillColor(255, 251, 235);
      doc.setDrawColor(253, 230, 138);

      doc.roundedRect(
        margin,
        y,
        contentWidth,
        44,
        3,
        3,
        'FD'
      );

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(...amber);

      doc.text(
        'MATCHED REGIONAL SYSTEM',
        margin + 6,
        y + 9
      );

      doc.setFontSize(11);
      doc.setTextColor(...dark);

      const matchedSystem =
        recommendation?.iksTraditionalStructureMatch ||
        'Eri & Oorani Cascading Network';

      const systemLines =
        doc.splitTextToSize(
          matchedSystem,
          contentWidth - 12
        );

      doc.text(
        systemLines,
        margin + 6,
        y + 18
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...slate);

      const contextText =
        'Integrates traditional Indian gravity runoff diversion and aquifer recharge principles with modern engineering dimensions. The approach respects regional water heritage while applying transparent assessment logic.';

      const contextLines =
        doc.splitTextToSize(
          contextText,
          contentWidth - 12
        );

      doc.text(
        contextLines,
        margin + 6,
        y + 29
      );

      y += 54;

      addSectionTitle(
        'Section 8: Estimated Annual Water Savings'
      );

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);

      doc.roundedRect(
        margin,
        y,
        contentWidth,
        34,
        3,
        3,
        'FD'
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...slate);

      doc.text(
        'Annual Potable Water Substitution',
        margin + 7,
        y + 10
      );

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.setTextColor(...cyan);

      doc.text(
        `${harvesting?.potableWaterSubstitutionPercentage ?? 0}%`,
        pageWidth - margin - 7,
        y + 10,
        { align: 'right' }
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...slate);

      doc.text(
        'Estimated Monetary Utility Savings',
        margin + 7,
        y + 24
      );

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(...emerald);

      doc.text(
        `₹ ${formatNumber(
          harvesting?.estimatedCostSavingsInrPerYear
        )} / Year`,
        pageWidth - margin - 7,
        y + 24,
        { align: 'right' }
      );

      y += 45;

      addSectionTitle(
        'Section 9 & 10: Environmental Impact & Spatial Mapping'
      );

      addParagraph(
        `Assessment location: ${assessment.address || '-'}, ${
          assessment.district || '-'
        }, ${assessment.state || '-'}.`
      );

      addParagraph(
        `GPS coordinates: ${formatDecimal(
          assessment.latitude
        )}°N, ${formatDecimal(
          assessment.longitude
        )}°E.`
      );

      addParagraph(
        `Estimated annual harvested water: ${formatNumber(
          annualHarvestableLiters
        )} liters. Recharge suitability score: ${score}/100.`
      );

      /*
       * ----------------------------------------------------------------------
       * PAGE 5 — TECHNICAL SUMMARY + COMPLIANCE
       * ----------------------------------------------------------------------
       */

      newPage();

      addSectionTitle(
        'HydroHarvest Technical Summary'
      );

      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);

      doc.roundedRect(
        margin,
        y,
        contentWidth,
        75,
        3,
        3,
        'FD'
      );

      const summaryRows = [
        [
          'Assessment ID',
          `RPT-2025-${assessment.id}`,
        ],
        [
          'Assessment Name',
          assessment.assessmentName || '-',
        ],
        [
          'Rooftop Area',
          `${formatDecimal(rooftop?.areaSqm)} m²`,
        ],
        [
          'Annual Rainfall',
          `${formatDecimal(
            rainfall?.annualRainfallMm
          )} mm`,
        ],
        [
          'Runoff Coefficient',
          formatDecimal(
            rooftop?.runoffCoefficient
          ),
        ],
        [
          'Harvestable Water',
          `${formatNumber(
            annualHarvestableLiters
          )} L/year`,
        ],
        [
          'Recharge Suitability',
          `${score}/100`,
        ],
        [
          'Recommended Structure',
          recommendation?.primaryStructureType ||
            '-',
        ],
      ];

      let rowY = y + 9;

      summaryRows.forEach(([label, value]) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(...lightSlate);

        doc.text(
          label.toUpperCase(),
          margin + 6,
          rowY
        );

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.setTextColor(...dark);

        const lines = doc.splitTextToSize(
          value,
          contentWidth - 70
        );

        doc.text(
          lines,
          margin + 63,
          rowY
        );

        rowY += Math.max(
          7,
          lines.length * 4
        );
      });

      y += 88;

      addSectionTitle(
        'Compliance & Auditing',
        emerald
      );

      doc.setFillColor(236, 253, 245);
      doc.setDrawColor(167, 243, 208);

      doc.roundedRect(
        margin,
        y,
        contentWidth,
        38,
        3,
        3,
        'FD'
      );

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...emerald);

      doc.text(
        'CGWB & BIS Standard Aligned',
        margin + 7,
        y + 11
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(...slate);

      const complianceText =
        'The HydroHarvest assessment uses a transparent rooftop rainwater harvesting formula and artificial recharge suitability assessment framework intended to support water-management planning and auditing.';

      const complianceLines =
        doc.splitTextToSize(
          complianceText,
          contentWidth - 14
        );

      doc.text(
        complianceLines,
        margin + 7,
        y + 20
      );

      y += 50;

      addSectionTitle(
        'Traditional Indian Water Management Systems',
        amber
      );

      addBulletList([
        'South India: Eri & Oorani Cascading Network',
        'North-West India: Stepwells (Baoli), Taanka & Johads',
        'East India: Ahar-Pyne Floodwater Diversion',
        'West India: Phad & Bandhara Irrigation Weirs',
      ]);

      y += 8;

      doc.setFillColor(...dark);
      doc.roundedRect(
        margin,
        y,
        contentWidth,
        45,
        3,
        3,
        'F'
      );

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(...cyan);

      doc.text(
        'HydroHarvest',
        margin + 8,
        y + 12
      );

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(226, 232, 240);

      const finalText =
        'IKS-Integrated Intelligent Rainwater Harvesting & Groundwater Recharge Assessment Platform.';

      doc.text(
        doc.splitTextToSize(
          finalText,
          contentWidth - 16
        ),
        margin + 8,
        y + 20
      );

      doc.setTextColor(251, 191, 36);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);

      doc.text(
        'Honoring Traditional Indian Hydrological Heritage',
        margin + 8,
        y + 34
      );

      /*
       * Add footer to the final page.
       */

      addFooter();

      /*
       * Download the actual PDF file.
       */

      const safeName =
        (assessment.assessmentName ||
          'HydroHarvest_Assessment')
          .replace(/[^a-z0-9]+/gi, '_')
          .replace(/^_+|_+$/g, '');

      const filename =
        `HydroHarvest_${safeName}_Report.pdf`;

      doc.save(filename);

      console.log(
        `PDF generated successfully: ${filename}`
      );
    } catch (error) {
      console.error(
        'Failed to generate HydroHarvest PDF:',
        error
      );

      alert(
        'Unable to generate the PDF. Please check the browser console for details.'
      );
    } finally {
      setGeneratingPdf(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-24">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">

        <div className="flex items-center space-x-3">

          <Link
            to="/dashboard"
            className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl border border-slate-800"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          <div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              Assessment Report #RPT-2025-{assessment.id}
            </span>

            <h1 className="text-2xl font-outfit font-extrabold text-slate-100">
              {assessment.assessmentName}
            </h1>

          </div>

        </div>

        <div className="flex items-center space-x-3">

          <button
            onClick={handleDownloadPdf}
            disabled={generatingPdf}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-60 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl border border-cyan-500 flex items-center space-x-2 shadow"
          >

            {generatingPdf ? (
              <>
                <Download className="w-4 h-4 animate-bounce" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Printer className="w-4 h-4" />
                <span>Export / Download PDF Report</span>
              </>
            )}

          </button>

        </div>

      </div>

      {/* SCORE CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <ScoreMeter
          label="Water Harvesting Potential"
          score={harvestingPct}
          colorScheme="cyan"
          subtitle="High Collection Yield"
        />

        <ScoreMeter
          label="Recharge Potential"
          score={score}
          colorScheme="emerald"
          subtitle={
            recharge?.suitabilityCategory ||
            'Highly Suitable'
          }
        />

        <ScoreMeter
          label="Overall Water Resilience"
          score={resiliencePct}
          colorScheme="amber"
          subtitle="Aquifer Sustainability Index"
        />

      </div>

      {/* SECTION 1 */}

      <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">

        <h2 className="text-base font-outfit font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-3">

          <MapPin className="w-5 h-5 text-cyan-400" />

          <span>
            Section 1: Location & Administrative Overview
          </span>

        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">

          <div>
            <span className="text-[10px] uppercase text-slate-400 font-medium">
              Property Address
            </span>

            <p className="font-semibold text-slate-200 mt-0.5">
              {assessment.address}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase text-slate-400 font-medium">
              District & State
            </span>

            <p className="font-semibold text-slate-200 mt-0.5">
              {assessment.district},{' '}
              {assessment.state}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase text-slate-400 font-medium">
              GPS Coordinates
            </span>

            <p className="font-mono text-cyan-300 mt-0.5">
              {assessment.latitude}°N,{' '}
              {assessment.longitude}°E
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase text-slate-400 font-medium">
              Verification Status
            </span>

            <span className="inline-block mt-0.5 px-2 py-0.5 text-[10px] font-bold bg-emerald-500/20 text-emerald-300 rounded border border-emerald-500/30">
              {assessment.status}
            </span>
          </div>

        </div>

      </section>

      {/* SECTIONS 2 & 3 */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-3">

          <h2 className="text-sm font-outfit font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-2">

            <Layers className="w-4 h-4 text-teal-400" />

            <span>
              Section 2: Rooftop Characteristics
            </span>

          </h2>

          <div className="grid grid-cols-2 gap-3 text-xs">

            <div>
              <span className="text-slate-400 text-[10px]">
                Area:
              </span>

              <p className="font-bold text-slate-200">
                {rooftop?.areaSqm} m²
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px]">
                Material:
              </span>

              <p className="font-bold text-slate-200">
                {rooftop?.roofMaterial}
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px]">
                Runoff Coeff:
              </span>

              <p className="font-bold text-cyan-300">
                {rooftop?.runoffCoefficient}
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px]">
                Usage:
              </span>

              <p className="font-bold text-slate-200">
                {rooftop?.buildingUsage}
              </p>
            </div>

          </div>

        </section>

        <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-3">

          <h2 className="text-sm font-outfit font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-2">

            <Droplets className="w-4 h-4 text-cyan-400" />

            <span>
              Section 3: Rainfall Data & Sources
            </span>

          </h2>

          <div className="grid grid-cols-2 gap-3 text-xs">

            <div>
              <span className="text-slate-400 text-[10px]">
                Annual Rainfall:
              </span>

              <p className="font-bold text-slate-200">
                {rainfall?.annualRainfallMm} mm
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px]">
                Monsoon Rainfall:
              </span>

              <p className="font-bold text-slate-200">
                {rainfall?.monsoonRainfallMm} mm
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px]">
                Peak 24h Rainfall:
              </span>

              <p className="font-bold text-slate-200">
                {rainfall?.max24hRainfallMm} mm
              </p>
            </div>

            <div>
              <span className="text-slate-400 text-[10px]">
                Data Source:
              </span>

              <p className="font-bold text-cyan-300">
                {rainfall?.rainfallSource}
              </p>
            </div>

          </div>

        </section>

      </div>

      {/* SECTION 4 */}

      <section className="space-y-4">

        <h2 className="text-base font-outfit font-bold text-slate-100">
          Section 4: Rooftop Water Harvesting Calculations
        </h2>

        {rooftop &&
          rainfall &&
          harvesting && (
            <CalculationFormulaBox
              rooftop={rooftop}
              rainfall={rainfall}
              calculation={harvesting}
            />
          )}

      </section>

      {/* SECTION 5 */}

      <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">

        <h2 className="text-base font-outfit font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-3">

          <ShieldCheck className="w-5 h-5 text-emerald-400" />

          <span>
            Section 5: Artificial Recharge Suitability Scoring
            {' '}
            (Score: {score}/100)
          </span>

        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">

          <div>
            <span className="text-[10px] uppercase text-slate-400">
              Soil Type:
            </span>

            <p className="font-bold text-slate-200">
              {soil?.soilType}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase text-slate-400">
              Water Table Depth:
            </span>

            <p className="font-bold text-slate-200">
              {soil?.groundwaterDepthMeters} Meters
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase text-slate-400">
              Aquifer Condition:
            </span>

            <p className="font-bold text-emerald-300">
              {soil?.waterTableCondition}
            </p>
          </div>

          <div>
            <span className="text-[10px] uppercase text-slate-400">
              Terrain Slope:
            </span>

            <p className="font-bold text-slate-200">
              {soil?.terrainSlopePercent}%
            </p>
          </div>

        </div>

      </section>

      {/* SECTION 6 */}

      <section className="space-y-4">

        <h2 className="text-base font-outfit font-bold text-slate-100">
          Section 6: AI Recommended Harvesting & Recharge Structure
        </h2>

        {recommendation && (
          <ExplainableAiCard
            recommendation={recommendation}
          />
        )}

      </section>

      {/* SECTIONS 7 & 8 */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <section className="p-6 bg-slate-900/80 rounded-2xl border border-amber-500/30 glass-card space-y-3">

          <h2 className="text-sm font-outfit font-bold text-amber-300 flex items-center space-x-2 border-b border-slate-800 pb-2">

            <BookOpen className="w-4 h-4 text-amber-400" />

            <span>
              Section 7: IKS / Local Water Management Context
            </span>

          </h2>

          <p className="text-xs text-slate-300 font-semibold">
            Matched Regional System:{' '}
            {recommendation?.iksTraditionalStructureMatch}
          </p>

          <p className="text-xs text-slate-400 leading-relaxed">
            Integrates South Indian Eri overflow cascading
            principles to prevent silt clogging and safely
            transport extreme monsoon runoff into subterranean
            storage.
          </p>

        </section>

        <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-3">

          <h2 className="text-sm font-outfit font-bold text-slate-100 flex items-center space-x-2 border-b border-slate-800 pb-2">

            <Droplets className="w-4 h-4 text-cyan-400" />

            <span>
              Section 8: Estimated Annual Water Savings
            </span>

          </h2>

          <div className="space-y-2 text-xs">

            <div className="flex justify-between">

              <span className="text-slate-400">
                Annual Potable Water Substitution:
              </span>

              <span className="font-bold text-cyan-300">
                {harvesting?.potableWaterSubstitutionPercentage}%
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-slate-400">
                Monetary Utility Savings:
              </span>

              <span className="font-bold text-emerald-400">
                ₹{' '}
                {harvesting?.estimatedCostSavingsInrPerYear?.toLocaleString(
                  'en-IN'
                )}{' '}
                / Year
              </span>

            </div>

          </div>

        </section>

      </div>

      {/* SECTION 9 & 10 */}

      <section className="p-6 bg-slate-900/80 rounded-2xl border border-slate-800 glass-card space-y-4">

        <h2 className="text-base font-outfit font-bold text-slate-100">
          Section 9 & 10: Environmental Impact & Spatial Mapping
        </h2>

        <GisMapComponent
          markers={[
            {
              id: assessment.id,
              lat: assessment.latitude,
              lng: assessment.longitude,
              title: assessment.assessmentName,
              type: 'ASSESSMENT',
              district: assessment.district,
              state: assessment.state,
              score: score,
              details: `${annualHarvestableLiters.toLocaleString()} L/yr`,
            },
          ]}
          center={[
            assessment.latitude,
            assessment.longitude,
          ]}
          zoom={12}
          height="350px"
        />

      </section>

      {/* PDF SUCCESS INFORMATION */}

      {generatingPdf && (
        <div className="fixed bottom-6 right-6 z-50">

          <div className="bg-slate-900 border border-cyan-500/40 rounded-xl px-5 py-4 shadow-2xl flex items-center gap-3">

            <Download className="w-5 h-5 text-cyan-400 animate-bounce" />

            <div>

              <p className="text-sm font-bold text-slate-100">
                Generating PDF
              </p>

              <p className="text-xs text-slate-400">
                Please wait...
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};