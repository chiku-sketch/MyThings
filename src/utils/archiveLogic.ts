import {
  ARIONZ_CONCEPTS,
  ArionzConcept,
  ConceptCategory,
} from '../data/arionzConcepts';

/**
 * Filters concepts by category and live search query across all 9 dossier sections.
 */
export function filterConcepts(
  concepts: ArionzConcept[],
  category: ConceptCategory,
  searchQuery: string
): ArionzConcept[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return concepts.filter((concept) => {
    const matchesCategory = category === 'All' || concept.category === category;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    const searchableCorpus = [
      concept.title,
      concept.shortName,
      concept.code,
      concept.category,
      concept.status,
      concept.quickSummary,
      ...concept.overview.leadParagraphs,
      concept.overview.centralQuestionOrPhilosophy?.statement ?? '',
      ...(concept.overview.pillarsOrObjectives?.items ?? []),
      ...concept.overview.scientificBackgroundOrRules.items.map(
        (i) => `${i.label} ${i.detail}`
      ),
      concept.conceptSection.heading,
      concept.conceptSection.intro,
      ...concept.conceptSection.components.flatMap((c) => [
        c.heading,
        ...c.bullets,
        c.note ?? '',
      ]),
      concept.howItWorks.heading,
      ...concept.howItWorks.primaryPhases.flatMap((p) => [
        p.phase,
        p.title,
        ...p.details,
      ]),
      ...concept.howItWorks.secondaryMechanisms.flatMap((m) => [
        m.title,
        m.flowChain ?? '',
        ...m.bullets,
        m.scientificNuance ?? '',
      ]),
      concept.mathEquations.modelTitle,
      ...concept.mathEquations.steps.flatMap((s) => [
        s.stepNumber,
        s.title,
        ...s.explanation,
        ...s.equations,
        ...(s.workedNotes ?? []),
      ]),
      ...concept.mathEquations.variables.map(
        (v) => `${v.symbol} ${v.name} ${v.unitsOrRole}`
      ),
      concept.diagram.title,
      concept.diagram.asciiArt,
      ...concept.advantages,
      ...concept.problems,
      ...concept.questions.map((q) => `${q.number} ${q.question}`),
      ...(concept.roadmap?.stages.map(
        (st) => `${st.stage} ${st.title} ${st.description}`
      ) ?? []),
      concept.paradox.title,
      ...concept.paradox.statement,
      ...concept.paradox.resolution,
    ]
      .join(' ')
      .toLowerCase();

    return searchableCorpus.includes(normalizedQuery);
  });
}

/**
 * Counts concepts per category.
 */
export function getCategoryCounts(
  concepts: ArionzConcept[] = ARIONZ_CONCEPTS
): Record<ConceptCategory, number> {
  const counts: Record<ConceptCategory, number> = {
    All: concepts.length,
    'Temporal & Cosmology': 0,
    'Quantum & Fusion Energy': 0,
    'Renewable & Storage': 0,
    'Aerospace & Space-Time': 0,
    'Intelligent Hardware & Defense': 0,
  };

  for (const c of concepts) {
    counts[c.category] = (counts[c.category] ?? 0) + 1;
  }

  return counts;
}

/**
 * Verifies that a concept strictly satisfies the 9-Point Theory Format.
 */
export function verifyNinePointCompleteness(concept: ArionzConcept): {
  valid: boolean;
  sectionCount: number;
  missingSections: string[];
} {
  const missing: string[] = [];

  if (!concept.overview.leadParagraphs.length) missing.push('1. OVERVIEW');
  if (!concept.conceptSection.components.length) missing.push('2. CONCEPT');
  if (!concept.howItWorks.primaryPhases.length) missing.push('3. HOW IT WORKS');
  if (!concept.mathEquations.steps.length) missing.push('4. MATH / EQUATIONS');
  if (!concept.diagram.asciiArt.trim()) missing.push('5. DIAGRAM');
  if (!concept.advantages.length) missing.push('6. ADVANTAGES');
  if (!concept.problems.length) missing.push('7. PROBLEMS');
  if (!concept.questions.length) missing.push('8. QUESTIONS');
  if (!concept.paradox.statement.length) missing.push('9. PARADOX');

  return {
    valid: missing.length === 0,
    sectionCount: 9 - missing.length,
    missingSections: missing,
  };
}

/**
 * Concept 1 (AZ-TD-001): Dimensional-Quantum Resonance (DQR) Information Transfer Calculator
 */
export function computeTimeDriveDQR(params: {
  deltaTimeHours: number; // |t' - t0| in hours
  coherenceHorizonHours: number; // τ_c in hours
  bioQuantumCoupling: number; // γ_q (0..1)
  signalStrength: number; // S_signal
  thermalNoise: number; // N_thermal
  threshold: number; // I_threshold
}) {
  const {
    deltaTimeHours,
    coherenceHorizonHours,
    bioQuantumCoupling,
    signalStrength,
    thermalNoise,
    threshold,
  } = params;

  const safeTau = Math.max(0.01, coherenceHorizonHours);
  const omegaEnt =
    Math.exp(-Math.abs(deltaTimeHours) / safeTau) * bioQuantumCoupling;
  const deltaMc =
    signalStrength + thermalNoise > 0
      ? signalStrength / (signalStrength + thermalNoise)
      : 0;
  const perceivedInfoI0 = omegaEnt * deltaMc;
  const shiftsTimeline = perceivedInfoI0 >= threshold;

  return {
    omegaEnt,
    deltaMc,
    perceivedInfoI0,
    shiftsTimeline,
    futureAPr: shiftsTimeline ? 0 : 1,
    futureBPr: shiftsTimeline ? 1 : 0,
  };
}

/**
 * Concept 2 (AZ-DEO-01): Casimir Vacuum Density & Interferometer Phase Shift Calculator
 */
export function computeDeoInterferometer(params: {
  plateSeparationNm: number; // d in nanometers
  armLengthMeters: number; // L in meters
  laserWavelengthNm: number; // λ_laser in nm
  metricCouplingProduct: number; // α_g * δΦ (dimensionless strain equivalent)
  photonCountLog10: number; // log10(N_photons)
}) {
  const {
    plateSeparationNm,
    armLengthMeters,
    laserWavelengthNm,
    metricCouplingProduct,
    photonCountLog10,
  } = params;

  // hbar * c ≈ 3.16152677e-26 J·m
  const hbarC = 3.16152677e-26;
  const dMeters = Math.max(1, plateSeparationNm) * 1e-9;
  const casimirEnergyDensityJm3 =
    -(Math.pow(Math.PI, 2) * hbarC) / (720 * Math.pow(dMeters, 4));

  const lambdaMeters = Math.max(100, laserWavelengthNm) * 1e-9;
  const deltaPhiDeo =
    ((4 * Math.PI * armLengthMeters) / lambdaMeters) * metricCouplingProduct;
  const shotNoiseLimit = 1 / Math.pow(10, photonCountLog10 / 2);
  const snr = shotNoiseLimit > 0 ? deltaPhiDeo / shotNoiseLimit : 0;

  return {
    casimirEnergyDensityJm3,
    deltaPhiDeo,
    shotNoiseLimit,
    snr,
    anomalyDetected: snr > 1,
  };
}

/**
 * Concept 3 (AZ-QB-1.0): Dicke Superabsorption & Decoherence Storage Calculator
 */
export function computeQuantumBattery(params: {
  cellCountN: number; // N coupled quantum units/cells
  alphaExponent: number; // 1 <= α <= 2
  singleCellChargeSec: number; // τ_single (s)
  relaxationTimeHours: number; // T1_eff (hours)
  storageElapsedHours: number; // t (hours)
  conversionEfficiency: number; // η_qe (0..1)
}) {
  const {
    cellCountN,
    alphaExponent,
    singleCellChargeSec,
    relaxationTimeHours,
    storageElapsedHours,
    conversionEfficiency,
  } = params;

  const safeN = Math.max(1, cellCountN);
  const clampedAlpha = Math.min(2, Math.max(1, alphaExponent));
  const quantumAdvantageFactor = Math.pow(safeN, clampedAlpha - 1);
  // At α = 2, τ_collective = τ_single / √N
  const collectiveChargeSec =
    singleCellChargeSec / Math.pow(safeN, (clampedAlpha - 1) / 2);
  const retentionFraction = Math.exp(
    -Math.max(0, storageElapsedHours) / Math.max(0.01, relaxationTimeHours)
  );
  const netRoundTripEfficiency = retentionFraction * conversionEfficiency;

  return {
    quantumAdvantageFactor,
    collectiveChargeSec,
    retentionFraction,
    netRoundTripEfficiency,
  };
}

/**
 * Concept 4 (AZ-FR-01): D-T Fusion Energy, Reaction Rate & Electrical Balance Calculator
 */
export function computeFusionReactor(params: {
  thermalPowerMw: number; // P_thermal in MW (default 100 MW)
  thermalEfficiency: number; // η_th (default 0.40)
  parasiticLoadMw: number; // P_aux in MW
  tritiumBreedingRatio: number; // TBR (default 1.08)
}) {
  const {
    thermalPowerMw,
    thermalEfficiency,
    parasiticLoadMw,
    tritiumBreedingRatio,
  } = params;

  // 17.6 MeV = 17.6 * 1.60218e-13 J = 2.8198368e-12 J
  const energyPerReactionJoules = 17.6 * 1.60218e-13;
  const thermalPowerWatts = thermalPowerMw * 1e6;
  const reactionRatePerSec = thermalPowerWatts / energyPerReactionJoules;

  const neutronFraction = 14.1 / 17.6; // ~0.801136
  const alphaFraction = 3.5 / 17.6; // ~0.198864

  const neutronPowerMw = thermalPowerMw * neutronFraction;
  const alphaPowerMw = thermalPowerMw * alphaFraction;

  const grossElectricMw = thermalPowerMw * thermalEfficiency;
  const netElectricMw = grossElectricMw - parasiticLoadMw;
  const engineeringGainQ =
    parasiticLoadMw > 0 ? grossElectricMw / parasiticLoadMw : 0;

  return {
    energyPerReactionJoules,
    reactionRatePerSec,
    neutronPowerMw,
    alphaPowerMw,
    grossElectricMw,
    netElectricMw,
    engineeringGainQ,
    isNetPositive: engineeringGainQ > 1 && netElectricMw > 0,
    isTritiumSelfSufficient: tritiumBreedingRatio >= 1.05,
  };
}

/**
 * Concept 5 (AZ-GEP-01): Hybrid Graphene Supercapacitor & Flow-Assisted Calculator
 */
export function computeGepSupercapacitor(params: {
  cEdlcFarads: number; // C_EDLC (F)
  cPseudoFarads: number; // C_pseudo (F)
  voltageWindowV: number; // V (V)
  esrMilliohms: number; // R_ESR (mΩ)
  cellVolumeLiters: number; // V_cell (L)
  cellMassKg: number; // M_cell (kg)
  pumpWorkRatio: number; // W_pump / E_charged (0..0.3)
}) {
  const {
    cEdlcFarads,
    cPseudoFarads,
    voltageWindowV,
    esrMilliohms,
    cellVolumeLiters,
    cellMassKg,
    pumpWorkRatio,
  } = params;

  const cTotal = cEdlcFarads + cPseudoFarads;
  const storedEnergyJoules = 0.5 * cTotal * Math.pow(voltageWindowV, 2);
  const volumetricEnergyWhPerL =
    storedEnergyJoules / (3600 * Math.max(0.01, cellVolumeLiters));
  const esrOhms = Math.max(0.05, esrMilliohms) * 1e-3;
  const peakPowerWPerKg =
    Math.pow(voltageWindowV, 2) / (4 * esrOhms * Math.max(0.01, cellMassKg));
  const netSystemEfficiency = 0.94 / (1 + Math.max(0, pumpWorkRatio));

  return {
    cTotal,
    storedEnergyJoules,
    volumetricEnergyWhPerL,
    peakPowerWPerKg,
    netSystemEfficiency,
  };
}

/**
 * Concept 6 (AZ-OX-001): OMNI-HARVEST X Tri-Mode Solar + Rain + Wind Calculator
 */
export function computeOmniHarvestTriGen(params: {
  irradianceWm2: number; // G_irr (W/m²)
  incidenceAngleDeg: number; // θ_inc (deg)
  panelAreaM2: number; // A_panel (m²)
  rainRateDropsPerSecM2: number; // f_drop (drops/s·m²)
  windSpeedMs: number; // v_w (m/s)
  ductAreaM2: number; // A_duct (m²)
}) {
  const {
    irradianceWm2,
    incidenceAngleDeg,
    panelAreaM2,
    rainRateDropsPerSecM2,
    windSpeedMs,
    ductAreaM2,
  } = params;

  const etaPv = 0.22;
  const cosTheta = Math.max(
    0,
    Math.cos((incidenceAngleDeg * Math.PI) / 180)
  );
  const pSolarW = etaPv * irradianceWm2 * panelAreaM2 * cosTheta;

  // Typical raindrop m_d = 3.5e-5 kg, v_d = 8 m/s => 0.5*m*v^2 = 1.12e-3 J
  const dropKineticJ = 1.12e-3;
  const etaTeng = 0.08;
  const pRainW =
    etaTeng * rainRateDropsPerSecM2 * panelAreaM2 * dropKineticJ;

  const rhoAir = 1.225;
  const etaAero = 0.34;
  const pWindW =
    etaAero * 0.5 * rhoAir * ductAreaM2 * Math.pow(windSpeedMs, 3);

  const etaMppt = 0.94;
  const pTotalW = etaMppt * (pSolarW + pRainW + pWindW);

  return {
    pSolarW,
    pRainW,
    pWindW,
    pTotalW,
  };
}

/**
 * Concept 7 (AZ-AER-001): AERO-CHARGE EV Airflow vs Induced Drag Balance Calculator
 */
export function computeAeroChargeEV(params: {
  carSpeedMs: number; // v_car (m/s)
  ductAreaM2: number; // A_duct (m²)
  turbineCp: number; // C_p (≤ 0.593 Betz limit)
  deltaCdA: number; // Δ(C_d·A) added drag area (m²)
  isBrakingOrDescent: boolean; // True = free kinetic recovery
}) {
  const { carSpeedMs, ductAreaM2, turbineCp, deltaCdA, isBrakingOrDescent } =
    params;

  const rhoAir = 1.225;
  const etaSys = 0.85;
  const safeCp = Math.min(0.593, Math.max(0.05, turbineCp));
  const pAirW = 0.5 * rhoAir * ductAreaM2 * Math.pow(carSpeedMs, 3);
  const pElecW = etaSys * safeCp * pAirW;

  const pDragPenaltyW = isBrakingOrDescent
    ? 0
    : 0.5 * rhoAir * Math.pow(carSpeedMs, 3) * deltaCdA;
  const pNetBalanceW = pElecW - pDragPenaltyW;

  return {
    pAirW,
    pElecW,
    pDragPenaltyW,
    pNetBalanceW,
    isNetGain: pNetBalanceW > 0,
  };
}

/**
 * Concept 8 (AZ-MSD-1.0): MSD Context-Aware Deduplication & MAG-LOCK Calculator
 */
export function computeMsdDeduplication(params: {
  fileCountN: number; // N files in group
  avgFileSizeMb: number; // S_avg (MB)
  sharedContextRatio: number; // Fraction of shared pattern (0.1..0.9)
  eccMirrorFactor: number; // Redundancy factor on C_shared (1..4)
}) {
  const { fileCountN, avgFileSizeMb, sharedContextRatio, eccMirrorFactor } =
    params;

  const safeN = Math.max(1, fileCountN);
  const sStandardMb = safeN * avgFileSizeMb;
  const cSharedMb = avgFileSizeMb * sharedContextRatio * eccMirrorFactor;
  const deltaSumMb =
    safeN * avgFileSizeMb * (1 - sharedContextRatio);
  const metaGraphMb = safeN * 0.05;
  const sMsdMb = cSharedMb + deltaSumMb + metaGraphMb;
  const gammaEff = sMsdMb > 0 ? sStandardMb / sMsdMb : 1;

  return {
    sStandardMb,
    cSharedMb,
    deltaSumMb,
    sMsdMb,
    gammaEff,
  };
}

/**
 * Concept 9 (AZ-APS-001): ArionZ AEGIS Deployable Tri-Material Shield Calculator
 */
export function computeAegisShield(params: {
  foldedAreaM2: number; // A_folded (m²)
  deployedAreaM2: number; // A_deployed (m²)
  titaniumMm: number; // t_Ti (mm)
  grapheneCompMm: number; // t_G (mm)
  tungstenCapMm: number; // t_W (mm)
  heatFluxKwM2: number; // q_heat (kW/m²)
}) {
  const {
    foldedAreaM2,
    deployedAreaM2,
    titaniumMm,
    grapheneCompMm,
    tungstenCapMm,
    heatFluxKwM2,
  } = params;

  const gammaDeploy = deployedAreaM2 / Math.max(0.01, foldedAreaM2);
  // Densities (kg/m³): Ti = 4430, Graphene composite = 1800, Tungsten = 19250 (applied to 25% hot-spot zone)
  const arealMassKgM2 =
    4430 * (titaniumMm * 1e-3) +
    1800 * (grapheneCompMm * 1e-3) +
    19250 * (tungstenCapMm * 1e-3) * 0.25;
  const totalShieldMassKg = deployedAreaM2 * arealMassKgM2;

  const totalThicknessM =
    (titaniumMm + grapheneCompMm + tungstenCapMm) * 1e-3;
  const kappaEff = 45; // Effective through-thickness composite thermal conductivity (W/m·K)
  const deltaTempK =
    (heatFluxKwM2 * 1000 * totalThicknessM) / kappaEff;

  return {
    gammaDeploy,
    arealMassKgM2,
    totalShieldMassKg,
    deltaTempK,
  };
}

/**
 * Concept 10 (AZ-SFT-01): ASPF Space-Folding Metric & Exotic Energy Calculator
 */
export function computeAspfSpaceFolding(params: {
  properDistanceLightYears: number; // L_0 (ly)
  foldFactorEta: number; // η_fold (0..0.9999)
  localShipSpeedFractionC: number; // v_local / c (0.01..0.5)
}) {
  const {
    properDistanceLightYears,
    foldFactorEta,
    localShipSpeedFractionC,
  } = params;

  const clampedEta = Math.min(0.9999, Math.max(0, foldFactorEta));
  const dFoldedLy = properDistanceLightYears * (1 - clampedEta);
  const traversalTimeYears =
    dFoldedLy / Math.max(0.001, localShipSpeedFractionC);
  const apparentSpeedFactorC =
    properDistanceLightYears / Math.max(1e-6, traversalTimeYears);

  // c^4 / (8*pi*G) ≈ 4.815e42 N; scale indicator in solar-mass energy equivalents
  const curvaturePrefactorN = 4.815e42;

  return {
    dFoldedLy,
    traversalTimeYears,
    apparentSpeedFactorC,
    curvaturePrefactorN,
  };
}

/**
 * Concept 11 (AZ-MXJ-01): MAX & JEXI Triangular Solar Tower & Smart Pin Port Calculator
 */
export function computeMaxSolarTowerAndPort(params: {
  faceAreaM2: number; // A_f per face (m²)
  panelEfficiency: number; // η_panel
  faceIrradiancesWm2: [number, number, number]; // East, South, West irradiance (W/m²)
  activeSignalPins: number; // N_active pins
  busVoltageV: number; // V_bus (V)
  busCurrentA: number; // I_bus (A)
}) {
  const {
    faceAreaM2,
    panelEfficiency,
    faceIrradiancesWm2,
    activeSignalPins,
    busVoltageV,
    busCurrentA,
  } = params;

  const towerPowerW = faceIrradiancesWm2.reduce(
    (sum, g) => sum + panelEfficiency * faceAreaM2 * g,
    0
  );
  const singleFlatRefW =
    panelEfficiency * faceAreaM2 * Math.max(...faceIrradiancesWm2);
  const multiAngleGainRatio =
    singleFlatRefW > 0 ? towerPowerW / singleFlatRefW : 1;

  // Smart Pin contact resistance R_contact = r_single / N_active (r_single = 24 mΩ)
  const rContactMilliohms = 24 / Math.max(1, activeSignalPins);
  const rContactOhms = rContactMilliohms * 1e-3;
  const resistiveLossW = Math.pow(busCurrentA, 2) * rContactOhms;
  const deliveredPortPowerW = Math.max(
    0,
    busVoltageV * busCurrentA - resistiveLossW
  );

  return {
    towerPowerW,
    singleFlatRefW,
    multiAngleGainRatio,
    rContactMilliohms,
    resistiveLossW,
    deliveredPortPowerW,
  };
}
