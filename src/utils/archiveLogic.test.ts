import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {
  ARIONZ_CONCEPTS,
  RELATED_RESEARCH_DIRECTIONS,
} from '../data/arionzConcepts';
import {
  filterConcepts,
  getCategoryCounts,
  verifyNinePointCompleteness,
  computeTimeDriveDQR,
  computeDeoInterferometer,
  computeQuantumBattery,
  computeFusionReactor,
  computeGepSupercapacitor,
  computeOmniHarvestTriGen,
  computeAeroChargeEV,
  computeMsdDeduplication,
  computeAegisShield,
  computeAspfSpaceFolding,
  computeMaxSolarTowerAndPort,
} from './archiveLogic';

test('ARIONZ_CONCEPTS contains all 11 exhaustive concepts with strict 9-point completeness', () => {
  assert.equal(ARIONZ_CONCEPTS.length, 11);
  const codes = ARIONZ_CONCEPTS.map((c) => c.code);
  assert.deepEqual(codes, [
    'AZ-TD-001',
    'AZ-DEO-01',
    'AZ-QB-1.0',
    'AZ-FR-01',
    'AZ-GEP-01',
    'AZ-OX-001',
    'AZ-AER-001',
    'AZ-MSD-1.0',
    'AZ-APS-001',
    'AZ-SFT-01',
    'AZ-MXJ-01',
  ]);

  for (const concept of ARIONZ_CONCEPTS) {
    const check = verifyNinePointCompleteness(concept);
    assert.equal(
      check.valid,
      true,
      `Concept ${concept.code} missing sections: ${check.missingSections.join(', ')}`
    );
    assert.equal(check.sectionCount, 9);
  }
});

test('Exact question, advantage, and problem counts match specification across all 11 concepts', () => {
  const byCode = Object.fromEntries(ARIONZ_CONCEPTS.map((c) => [c.code, c]));

  // Concept 1: Time Drive
  assert.equal(byCode['AZ-TD-001'].advantages.length, 6);
  assert.equal(byCode['AZ-TD-001'].problems.length, 8);
  assert.equal(byCode['AZ-TD-001'].questions.length, 10);

  // Concept 2: DEO-01
  assert.equal(byCode['AZ-DEO-01'].advantages.length, 4);
  assert.equal(byCode['AZ-DEO-01'].problems.length, 4);
  assert.equal(byCode['AZ-DEO-01'].questions.length, 6);

  // Concept 3: QB-1.0
  assert.equal(byCode['AZ-QB-1.0'].advantages.length, 6);
  assert.equal(byCode['AZ-QB-1.0'].problems.length, 5);
  assert.equal(byCode['AZ-QB-1.0'].questions.length, 10);
  assert.equal(byCode['AZ-QB-1.0'].roadmap?.stages.length, 6);

  // Concept 4: FR-01
  assert.equal(byCode['AZ-FR-01'].advantages.length, 5);
  assert.equal(byCode['AZ-FR-01'].problems.length, 10);
  assert.equal(byCode['AZ-FR-01'].questions.length, 9);
  assert.equal(byCode['AZ-FR-01'].roadmap?.stages.length, 6);

  // Concept 5: GEP-01
  assert.equal(byCode['AZ-GEP-01'].advantages.length, 5);
  assert.equal(byCode['AZ-GEP-01'].problems.length, 9);
  assert.equal(byCode['AZ-GEP-01'].questions.length, 4);
  assert.equal(byCode['AZ-GEP-01'].roadmap?.stages.length, 6);

  // Concept 6: OX-001
  assert.equal(byCode['AZ-OX-001'].advantages.length, 5);
  assert.equal(byCode['AZ-OX-001'].problems.length, 11);
  assert.equal(byCode['AZ-OX-001'].questions.length, 4);
  assert.equal(byCode['AZ-OX-001'].roadmap?.stages.length, 6);

  // Concept 7: AER-001
  assert.equal(byCode['AZ-AER-001'].advantages.length, 4);
  assert.equal(byCode['AZ-AER-001'].problems.length, 4);
  assert.equal(byCode['AZ-AER-001'].questions.length, 3);
  assert.equal(byCode['AZ-AER-001'].roadmap?.stages.length, 3);

  // Concept 8: MSD-1.0
  assert.equal(byCode['AZ-MSD-1.0'].advantages.length, 5);
  assert.equal(byCode['AZ-MSD-1.0'].problems.length, 10);
  assert.equal(byCode['AZ-MSD-1.0'].questions.length, 8);
  assert.equal(byCode['AZ-MSD-1.0'].roadmap?.stages.length, 4);

  // Concept 9: APS-001
  assert.equal(byCode['AZ-APS-001'].advantages.length, 5);
  assert.equal(byCode['AZ-APS-001'].problems.length, 8);
  assert.equal(byCode['AZ-APS-001'].questions.length, 3);
  assert.equal(byCode['AZ-APS-001'].roadmap?.stages.length, 7);

  // Concept 10: SFT-01
  assert.equal(byCode['AZ-SFT-01'].advantages.length, 4);
  assert.equal(byCode['AZ-SFT-01'].problems.length, 4);
  assert.equal(byCode['AZ-SFT-01'].questions.length, 10);
  assert.equal(byCode['AZ-SFT-01'].roadmap?.stages.length, 7);

  // Concept 11: MXJ-01
  assert.equal(byCode['AZ-MXJ-01'].advantages.length, 10);
  assert.equal(byCode['AZ-MXJ-01'].problems.length, 5);
  assert.equal(byCode['AZ-MXJ-01'].questions.length, 4);
  assert.equal(byCode['AZ-MXJ-01'].roadmap?.stages.length, 4);
});

test('filterConcepts filters accurately by all 6 categories and deep-content search queries', () => {
  const counts = getCategoryCounts(ARIONZ_CONCEPTS);
  assert.equal(counts.All, 11);
  assert.equal(counts['Temporal & Cosmology'], 2);
  assert.equal(counts['Quantum & Fusion Energy'], 2);
  assert.equal(counts['Renewable & Storage'], 3);
  assert.equal(counts['Aerospace & Space-Time'], 2);
  assert.equal(counts['Intelligent Hardware & Defense'], 2);

  const renewable = filterConcepts(ARIONZ_CONCEPTS, 'Renewable & Storage', '');
  assert.equal(renewable.length, 3);

  const aerospace = filterConcepts(ARIONZ_CONCEPTS, 'Aerospace & Space-Time', '');
  assert.equal(aerospace.length, 2);

  const hardware = filterConcepts(
    ARIONZ_CONCEPTS,
    'Intelligent Hardware & Defense',
    ''
  );
  assert.equal(hardware.length, 2);

  // Deep searches across Concepts 5-11
  const pseudocapMatch = filterConcepts(ARIONZ_CONCEPTS, 'All', '35,000 mAh');
  assert.equal(pseudocapMatch.length, 1);
  assert.equal(pseudocapMatch[0].code, 'AZ-GEP-01');

  const tengMatch = filterConcepts(ARIONZ_CONCEPTS, 'All', 'ETFE/PVDF');
  assert.equal(tengMatch.length, 1);
  assert.equal(tengMatch[0].code, 'AZ-OX-001');

  const betzMatch = filterConcepts(ARIONZ_CONCEPTS, 'All', '0.593');
  assert.equal(betzMatch.length, 2);
  assert.deepEqual(
    betzMatch.map((c) => c.code),
    ['AZ-OX-001', 'AZ-AER-001']
  );

  const safMatch = filterConcepts(ARIONZ_CONCEPTS, 'All', 'SAF-1');
  assert.equal(safMatch.length, 1);
  assert.equal(safMatch[0].code, 'AZ-AER-001');

  const magLockMatch = filterConcepts(ARIONZ_CONCEPTS, 'All', 'MAG-LOCK');
  assert.equal(magLockMatch.length, 1);
  assert.equal(magLockMatch[0].code, 'AZ-MSD-1.0');

  const tungstenMatch = filterConcepts(ARIONZ_CONCEPTS, 'All', '3422°C');
  assert.equal(tungstenMatch.length, 2);
  assert.deepEqual(
    tungstenMatch.map((c) => c.code),
    ['AZ-FR-01', 'AZ-APS-001']
  );

  const miuraMatch = filterConcepts(ARIONZ_CONCEPTS, 'All', 'Miura-ori');
  assert.equal(miuraMatch.length, 1);
  assert.equal(miuraMatch[0].code, 'AZ-APS-001');

  const aspfMatch = filterConcepts(ARIONZ_CONCEPTS, 'All', 'Time-Lock Principle');
  assert.equal(aspfMatch.length, 1);
  assert.equal(aspfMatch[0].code, 'AZ-SFT-01');

  const mxjMatch = filterConcepts(ARIONZ_CONCEPTS, 'All', 'Wardenclyffe');
  assert.equal(mxjMatch.length, 1);
  assert.equal(mxjMatch[0].code, 'AZ-MXJ-01');
});

test('Physics derivations match worked numerical steps across Concepts 1 to 11', () => {
  // Concept 1: Time Drive DQR
  const dqr = computeTimeDriveDQR({
    deltaTimeHours: 0,
    coherenceHorizonHours: 10,
    bioQuantumCoupling: 0.8,
    signalStrength: 80,
    thermalNoise: 20,
    threshold: 0.5,
  });
  assert.ok(Math.abs(dqr.perceivedInfoI0 - 0.64) < 1e-6);
  assert.equal(dqr.shiftsTimeline, true);

  // Concept 2: DEO-01 Interferometer
  const deo = computeDeoInterferometer({
    plateSeparationNm: 100,
    armLengthMeters: 40,
    laserWavelengthNm: 1064,
    metricCouplingProduct: 1e-18,
    photonCountLog10: 20,
  });
  assert.ok(deo.casimirEnergyDensityJm3 < 0);
  assert.ok(deo.deltaPhiDeo > 0);

  // Concept 3: Quantum Battery Dicke Superabsorption
  const qb = computeQuantumBattery({
    cellCountN: 100,
    alphaExponent: 2,
    singleCellChargeSec: 60,
    relaxationTimeHours: 100,
    storageElapsedHours: 0,
    conversionEfficiency: 0.92,
  });
  assert.equal(qb.collectiveChargeSec, 6);

  // Concept 4: FR-01 100 MWth baseline
  const fr = computeFusionReactor({
    thermalPowerMw: 100,
    thermalEfficiency: 0.4,
    parasiticLoadMw: 12,
    tritiumBreedingRatio: 1.08,
  });
  assert.equal(fr.grossElectricMw, 40);
  assert.equal(fr.netElectricMw, 28);

  // Concept 5: GEP-01 Hybrid Supercapacitor
  const gep = computeGepSupercapacitor({
    cEdlcFarads: 3000,
    cPseudoFarads: 2000,
    voltageWindowV: 3.0,
    esrMilliohms: 0.5,
    cellVolumeLiters: 0.1,
    cellMassKg: 0.15,
    pumpWorkRatio: 0.05,
  });
  assert.equal(gep.cTotal, 5000);
  assert.equal(gep.storedEnergyJoules, 22500);

  // Concept 6: OX-001 Tri-Energy
  const ox = computeOmniHarvestTriGen({
    irradianceWm2: 800,
    incidenceAngleDeg: 0,
    panelAreaM2: 2.0,
    rainRateDropsPerSecM2: 1000,
    windSpeedMs: 8.0,
    ductAreaM2: 0.5,
  });
  assert.ok(ox.pSolarW > 300);
  assert.ok(ox.pTotalW > ox.pSolarW);

  // Concept 7: AER-001 Airflow Recovery
  const aerBrake = computeAeroChargeEV({
    carSpeedMs: 30,
    ductAreaM2: 0.2,
    turbineCp: 0.4,
    deltaCdA: 0.05,
    isBrakingOrDescent: true,
  });
  assert.equal(aerBrake.pDragPenaltyW, 0);
  assert.equal(aerBrake.isNetGain, true);

  // Concept 8: MSD-1.0 Deduplication
  const msd = computeMsdDeduplication({
    fileCountN: 100,
    avgFileSizeMb: 10,
    sharedContextRatio: 0.75,
    eccMirrorFactor: 2,
  });
  assert.equal(msd.sStandardMb, 1000);
  assert.ok(msd.gammaEff > 3.5);

  // Concept 9: APS-001 AEGIS Shield
  const aps = computeAegisShield({
    foldedAreaM2: 0.2,
    deployedAreaM2: 1.2,
    titaniumMm: 2.0,
    grapheneCompMm: 4.0,
    tungstenCapMm: 1.0,
    heatFluxKwM2: 300,
  });
  assert.ok(Math.abs(aps.gammaDeploy - 6.0) < 1e-6);
  assert.ok(aps.totalShieldMassKg > 0);

  // Concept 10: SFT-01 Space-Folding
  const sft = computeAspfSpaceFolding({
    properDistanceLightYears: 4.37,
    foldFactorEta: 0.98,
    localShipSpeedFractionC: 0.1,
  });
  assert.ok(Math.abs(sft.dFoldedLy - 0.0874) < 1e-4);
  assert.ok(sft.apparentSpeedFactorC > 4.9);

  // Concept 11: MXJ-01 MAX & JEXI Solar Tower & Smart Pin Port
  const mxj = computeMaxSolarTowerAndPort({
    faceAreaM2: 0.4,
    panelEfficiency: 0.2,
    faceIrradiancesWm2: [600, 900, 500],
    activeSignalPins: 12,
    busVoltageV: 20,
    busCurrentA: 5,
  });
  assert.ok(Math.abs(mxj.towerPowerW - 160) < 1e-6);
  assert.equal(mxj.rContactMilliohms, 2);
});

test('RELATED_RESEARCH_DIRECTIONS contains all 5 Fundamental Physics Research Directions and Prompt 2 marker exists', () => {
  assert.equal(RELATED_RESEARCH_DIRECTIONS.length, 5);
  assert.deepEqual(
    RELATED_RESEARCH_DIRECTIONS.map((d) => d.number),
    ['01', '02', '03', '04', '05']
  );

  const dataFile = fs.readFileSync(
    path.resolve(process.cwd(), 'src/data/arionzConcepts.ts'),
    'utf-8'
  );
  assert.ok(
    dataFile.includes('// === PASTE PROMPT 2 (CONCEPTS 5 TO 8) BELOW THIS LINE ==='),
    'Must preserve exact Prompt 2 marker comment inside ARIONZ_CONCEPTS'
  );
});
