import React, { useState } from 'react';
import {
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
} from '../utils/archiveLogic';
import { Sliders, RotateCcw } from 'lucide-react';

interface InteractivePhysicsBenchProps {
  conceptCode: string;
}

export const InteractivePhysicsBench: React.FC<InteractivePhysicsBenchProps> = ({
  conceptCode,
}) => {
  // Concept 1: Time Drive state
  const [tdDeltaT, setTdDeltaT] = useState<number>(4.0);
  const [tdTauC, setTdTauC] = useState<number>(12.0);
  const [tdGammaQ, setTdGammaQ] = useState<number>(0.85);
  const [tdSignal, setTdSignal] = useState<number>(78);
  const [tdNoise, setTdNoise] = useState<number>(22);
  const [tdThreshold, setTdThreshold] = useState<number>(0.35);

  // Concept 2: DEO-01 state
  const [deoPlateNm, setDeoPlateNm] = useState<number>(120);
  const [deoArmM, setDeoArmM] = useState<number>(40);
  const [deoLambdaNm, setDeoLambdaNm] = useState<number>(1064);
  const [deoStrainExp, setDeoStrainExp] = useState<number>(-18);
  const [deoPhotonsLog, setDeoPhotonsLog] = useState<number>(20);

  // Concept 3: QB-1.0 state
  const [qbCellsN, setQbCellsN] = useState<number>(100);
  const [qbAlpha, setQbAlpha] = useState<number>(2.0);
  const [qbSingleTime, setQbSingleTime] = useState<number>(120);
  const [qbT1Hours, setQbT1Hours] = useState<number>(240);
  const [qbElapsedHours, setQbElapsedHours] = useState<number>(12);
  const [qbEtaQe, setQbEtaQe] = useState<number>(0.92);

  // Concept 4: FR-01 state
  const [frThermalMw, setFrThermalMw] = useState<number>(100);
  const [frEfficiency, setFrEfficiency] = useState<number>(0.4);
  const [frParasiticMw, setFrParasiticMw] = useState<number>(14);
  const [frTbr, setFrTbr] = useState<number>(1.08);

  // Concept 5: AZ-GEP-01 state
  const [gepEdlcF, setGepEdlcF] = useState<number>(3200);
  const [gepPseudoF, setGepPseudoF] = useState<number>(1800);
  const [gepVoltageV, setGepVoltageV] = useState<number>(3.2);
  const [gepEsrMohm, setGepEsrMohm] = useState<number>(0.6);
  const [gepPumpRatio, setGepPumpRatio] = useState<number>(0.05);

  // Concept 6: AZ-OX-001 state
  const [oxIrradiance, setOxIrradiance] = useState<number>(850);
  const [oxAngleDeg, setOxAngleDeg] = useState<number>(20);
  const [oxRainDrops, setOxRainDrops] = useState<number>(1500);
  const [oxWindMs, setOxWindMs] = useState<number>(7.5);

  // Concept 7: AZ-AER-001 state
  const [aerSpeedMs, setAerSpeedMs] = useState<number>(28);
  const [aerDuctM2, setAerDuctM2] = useState<number>(0.18);
  const [aerCp, setAerCp] = useState<number>(0.42);
  const [aerBrakingMode, setAerBrakingMode] = useState<boolean>(true);

  // Concept 8: AZ-MSD-1.0 state
  const [msdFilesN, setMsdFilesN] = useState<number>(100);
  const [msdAvgMb, setMsdAvgMb] = useState<number>(12);
  const [msdSharedRatio, setMsdSharedRatio] = useState<number>(0.72);
  const [msdEccMirror, setMsdEccMirror] = useState<number>(2);

  // Concept 9: AZ-APS-001 state
  const [apsDeployedM2, setApsDeployedM2] = useState<number>(1.2);
  const [apsTitaniumMm, setApsTitaniumMm] = useState<number>(2.5);
  const [apsGrapheneMm, setApsGrapheneMm] = useState<number>(4.0);
  const [apsHeatKwM2, setApsHeatKwM2] = useState<number>(350);

  // Concept 10: AZ-SFT-01 state
  const [sftDistanceLy, setSftDistanceLy] = useState<number>(4.37);
  const [sftFoldEta, setSftFoldEta] = useState<number>(0.98);
  const [sftShipVelocityC, setSftShipVelocityC] = useState<number>(0.1);

  // Concept 11: AZ-MXJ-01 state
  const [mxjEastWm2, setMxjEastWm2] = useState<number>(620);
  const [mxjSouthWm2, setMxjSouthWm2] = useState<number>(880);
  const [mxjWestWm2, setMxjWestWm2] = useState<number>(540);
  const [mxjActivePins, setMxjActivePins] = useState<number>(16);

  if (conceptCode === 'AZ-TD-001') {
    const res = computeTimeDriveDQR({
      deltaTimeHours: tdDeltaT,
      coherenceHorizonHours: tdTauC,
      bioQuantumCoupling: tdGammaQ,
      signalStrength: tdSignal,
      thermalNoise: tdNoise,
      threshold: tdThreshold,
    });

    return (
      <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#0b0b10] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#d4af37]" />
            <h4 className="font-mono text-sm font-semibold text-[#f7d665]">
              Interactive Numerical Calibration — DQR Information Integral I(t₀)
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setTdDeltaT(4.0);
              setTdTauC(12.0);
              setTdGammaQ(0.85);
              setTdSignal(78);
              setTdNoise(22);
              setTdThreshold(0.35);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 px-2.5 py-1 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Baseline
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Temporal Offset |t&apos; - t₀|</span>
                <span className="text-[#f7d665] tabular-nums">{tdDeltaT.toFixed(1)} hrs</span>
              </div>
              <input
                type="range"
                min="0"
                max="48"
                step="0.5"
                value={tdDeltaT}
                onChange={(e) => setTdDeltaT(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Coherence Horizon τ_c</span>
                <span className="text-[#f7d665] tabular-nums">{tdTauC.toFixed(1)} hrs</span>
              </div>
              <input
                type="range"
                min="1"
                max="48"
                step="0.5"
                value={tdTauC}
                onChange={(e) => setTdTauC(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Bio-Quantum Coupling γ_q</span>
                <span className="text-[#f7d665] tabular-nums">{tdGammaQ.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="1"
                step="0.01"
                value={tdGammaQ}
                onChange={(e) => setTdGammaQ(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Microtubule Signal S_signal vs Noise N_thermal</span>
                <span className="text-[#f7d665] tabular-nums">
                  {tdSignal} : {tdNoise}
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                step="1"
                value={tdSignal}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10);
                  setTdSignal(val);
                  setTdNoise(100 - val);
                }}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Entanglement Kernel Ω_ent</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.omegaEnt.toFixed(4)}
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                exp(-|t&apos;-t₀|/τ_c)·γ_q
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Receptivity δ(M_c)</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {(res.deltaMc * 100).toFixed(1)}%
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                S_signal / (S_signal + N_thermal)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Perceived Info I(t₀)</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.perceivedInfoI0.toFixed(4)}
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Threshold I_th = {tdThreshold.toFixed(2)}
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Timeline Trajectory</div>
              <div className="mt-1 font-mono text-sm font-bold text-[#f7d665]">
                {res.shiftsTimeline
                  ? '● Shifts Future A → Future B'
                  : '▲ Remains on Future A'}
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8] tabular-nums">
                P(A)={res.futureAPr} · P(B)={res.futureBPr}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (conceptCode === 'AZ-DEO-01') {
    const res = computeDeoInterferometer({
      plateSeparationNm: deoPlateNm,
      armLengthMeters: deoArmM,
      laserWavelengthNm: deoLambdaNm,
      metricCouplingProduct: Math.pow(10, deoStrainExp),
      photonCountLog10: deoPhotonsLog,
    });

    return (
      <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#0b0b10] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#d4af37]" />
            <h4 className="font-mono text-sm font-semibold text-[#f7d665]">
              Interactive Numerical Calibration — DEO-01 Vacuum Chamber &amp; Interferometer
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setDeoPlateNm(120);
              setDeoArmM(40);
              setDeoLambdaNm(1064);
              setDeoStrainExp(-18);
              setDeoPhotonsLog(20);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 px-2.5 py-1 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Baseline
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Casimir Plate Separation d₀</span>
                <span className="text-[#f7d665] tabular-nums">{deoPlateNm} nm</span>
              </div>
              <input
                type="range"
                min="20"
                max="500"
                step="10"
                value={deoPlateNm}
                onChange={(e) => setDeoPlateNm(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Interferometer Arm Length L</span>
                <span className="text-[#f7d665] tabular-nums">{deoArmM} m</span>
              </div>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={deoArmM}
                onChange={(e) => setDeoArmM(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Effective Metric Perturbation h_eff = α_g·δΦ</span>
                <span className="text-[#f7d665] tabular-nums">10^{deoStrainExp}</span>
              </div>
              <input
                type="range"
                min="-22"
                max="-15"
                step="0.5"
                value={deoStrainExp}
                onChange={(e) => setDeoStrainExp(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Integrated Photon Count N_photons</span>
                <span className="text-[#f7d665] tabular-nums">10^{deoPhotonsLog}</span>
              </div>
              <input
                type="range"
                min="16"
                max="24"
                step="0.5"
                value={deoPhotonsLog}
                onChange={(e) => setDeoPhotonsLog(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Casimir Density ρ_vac(d₀)</div>
              <div className="mt-1 font-mono text-lg font-bold text-[#f2f2f7] tabular-nums">
                {res.casimirEnergyDensityJm3.toExponential(2)} J/m³
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                -π²ℏc / (720·d⁴)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Phase Shift Δφ_DEO</div>
              <div className="mt-1 font-mono text-lg font-bold text-[#f7d665] tabular-nums">
                {res.deltaPhiDeo.toExponential(2)} rad
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                (4πL/λ_laser)·α_g·δΦ
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Shot-Noise Limit Δφ_noise</div>
              <div className="mt-1 font-mono text-lg font-bold text-[#f2f2f7] tabular-nums">
                {res.shotNoiseLimit.toExponential(2)} rad
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                1 / √N_photons
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Detection Status (SNR)</div>
              <div className="mt-1 font-mono text-sm font-bold text-[#f7d665] tabular-nums">
                {res.anomalyDetected
                  ? `● Candidate Anomaly (SNR ${res.snr.toFixed(1)}×)`
                  : `▲ Below Shot Noise (SNR ${res.snr.toFixed(2)}×)`}
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Requires QED subtraction
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (conceptCode === 'AZ-QB-1.0') {
    const res = computeQuantumBattery({
      cellCountN: qbCellsN,
      alphaExponent: qbAlpha,
      singleCellChargeSec: qbSingleTime,
      relaxationTimeHours: qbT1Hours,
      storageElapsedHours: qbElapsedHours,
      conversionEfficiency: qbEtaQe,
    });

    return (
      <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#0b0b10] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#d4af37]" />
            <h4 className="font-mono text-sm font-semibold text-[#f7d665]">
              Interactive Numerical Calibration — Dicke Superabsorption &amp; Retention
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setQbCellsN(100);
              setQbAlpha(2.0);
              setQbSingleTime(120);
              setQbT1Hours(240);
              setQbElapsedHours(12);
              setQbEtaQe(0.92);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 px-2.5 py-1 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Baseline
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Coupled Quantum Cells N</span>
                <span className="text-[#f7d665] tabular-nums">{qbCellsN} cells</span>
              </div>
              <input
                type="range"
                min="1"
                max="400"
                step="1"
                value={qbCellsN}
                onChange={(e) => setQbCellsN(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Collective Scaling Exponent α (1 = Classical, 2 = Ideal Dicke)</span>
                <span className="text-[#f7d665] tabular-nums">{qbAlpha.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="2.0"
                step="0.05"
                value={qbAlpha}
                onChange={(e) => setQbAlpha(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Single-Cell Baseline Charge Time τ_single</span>
                <span className="text-[#f7d665] tabular-nums">{qbSingleTime} s</span>
              </div>
              <input
                type="range"
                min="10"
                max="600"
                step="10"
                value={qbSingleTime}
                onChange={(e) => setQbSingleTime(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Storage Duration t vs Relaxation Lifetime T₁_eff ({qbT1Hours}h)</span>
                <span className="text-[#f7d665] tabular-nums">{qbElapsedHours} hrs</span>
              </div>
              <input
                type="range"
                min="0"
                max="240"
                step="4"
                value={qbElapsedHours}
                onChange={(e) => setQbElapsedHours(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Collective Charge Time τ_coll</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.collectiveChargeSec.toFixed(2)} s
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                τ_single / N^((α-1)/2)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Quantum Power Advantage Γ</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.quantumAdvantageFactor.toFixed(1)}×
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                P_quantum / P_classical = N^(α-1)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">State Retention exp(-t/T₁_eff)</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {(res.retentionFraction * 100).toFixed(1)}%
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Si+V Barrier Stabilization
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Net Discharge Efficiency</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {(res.netRoundTripEfficiency * 100).toFixed(1)}%
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Includes Ni Interface η_qe={qbEtaQe}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (conceptCode === 'AZ-GEP-01') {
    const res = computeGepSupercapacitor({
      cEdlcFarads: gepEdlcF,
      cPseudoFarads: gepPseudoF,
      voltageWindowV: gepVoltageV,
      esrMilliohms: gepEsrMohm,
      cellVolumeLiters: 0.12,
      cellMassKg: 0.18,
      pumpWorkRatio: gepPumpRatio,
    });

    return (
      <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#0b0b10] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#d4af37]" />
            <h4 className="font-mono text-sm font-semibold text-[#f7d665]">
              Interactive Numerical Calibration — GEP Hybrid Graphene Supercapacitor
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setGepEdlcF(3200);
              setGepPseudoF(1800);
              setGepVoltageV(3.2);
              setGepEsrMohm(0.6);
              setGepPumpRatio(0.05);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 px-2.5 py-1 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Baseline
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>3D Graphene EDLC Capacitance C_EDLC</span>
                <span className="text-[#f7d665] tabular-nums">{gepEdlcF} F</span>
              </div>
              <input
                type="range"
                min="500"
                max="6000"
                step="100"
                value={gepEdlcF}
                onChange={(e) => setGepEdlcF(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Pseudocapacitive Redox Capacitance C_pseudo</span>
                <span className="text-[#f7d665] tabular-nums">{gepPseudoF} F</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={gepPseudoF}
                onChange={(e) => setGepPseudoF(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Ionic-Liquid Operating Voltage Window V</span>
                <span className="text-[#f7d665] tabular-nums">{gepVoltageV.toFixed(1)} V</span>
              </div>
              <input
                type="range"
                min="1.2"
                max="4.2"
                step="0.1"
                value={gepVoltageV}
                onChange={(e) => setGepVoltageV(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Equivalent Series Resistance R_ESR</span>
                <span className="text-[#f7d665] tabular-nums">{gepEsrMohm.toFixed(2)} mΩ</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="5.0"
                step="0.1"
                value={gepEsrMohm}
                onChange={(e) => setGepEsrMohm(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Total Capacitance C_total</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.cTotal.toLocaleString()} F
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                C_EDLC + C_pseudo
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Volumetric Energy E_vol</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.volumetricEnergyWhPerL.toFixed(1)} Wh/L
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                ½C_total·V² / (3600·V_cell)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Peak Power Density P_max</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {(res.peakPowerWPerKg / 1000).toFixed(1)} kW/kg
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                V² / (4·R_ESR·M_cell)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Flow-Assisted Efficiency η_eff</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {(res.netSystemEfficiency * 100).toFixed(1)}%
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Includes W_pump overhead
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (conceptCode === 'AZ-OX-001') {
    const res = computeOmniHarvestTriGen({
      irradianceWm2: oxIrradiance,
      incidenceAngleDeg: oxAngleDeg,
      panelAreaM2: 2.0,
      rainRateDropsPerSecM2: oxRainDrops,
      windSpeedMs: oxWindMs,
      ductAreaM2: 0.45,
    });

    return (
      <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#0b0b10] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#d4af37]" />
            <h4 className="font-mono text-sm font-semibold text-[#f7d665]">
              Interactive Numerical Calibration — OMNI-HARVEST X Tri-Energy Output
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setOxIrradiance(850);
              setOxAngleDeg(20);
              setOxRainDrops(1500);
              setOxWindMs(7.5);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 px-2.5 py-1 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Baseline
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Solar Irradiance G_irr (2.0 m² Tile)</span>
                <span className="text-[#f7d665] tabular-nums">{oxIrradiance} W/m²</span>
              </div>
              <input
                type="range"
                min="0"
                max="1100"
                step="25"
                value={oxIrradiance}
                onChange={(e) => setOxIrradiance(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Solar Incidence Angle θ_inc</span>
                <span className="text-[#f7d665] tabular-nums">{oxAngleDeg}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="80"
                step="5"
                value={oxAngleDeg}
                onChange={(e) => setOxAngleDeg(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Raindrop Impact Flux f_drop (TENG Top Layer)</span>
                <span className="text-[#f7d665] tabular-nums">{oxRainDrops} drops/s·m²</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="250"
                value={oxRainDrops}
                onChange={(e) => setOxRainDrops(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Sub-Surface Wind / Airflow Velocity v_w</span>
                <span className="text-[#f7d665] tabular-nums">{oxWindMs.toFixed(1)} m/s</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="0.5"
                value={oxWindMs}
                onChange={(e) => setOxWindMs(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Solar PV Power P_solar</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.pSolarW.toFixed(1)} W
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                η_PV·G_irr·A·cos(θ)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Rain TENG Power P_rain</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {(res.pRainW * 1000).toFixed(0)} mW
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Aux mW–W Wet-Weather Sensor Feed
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Micro-Wind Power P_wind</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.pWindW.toFixed(1)} W
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                ½·η_aero·ρ_air·A_duct·v_w³
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Combined MPPT Output P_total</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.pTotalW.toFixed(1)} W
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                η_MPPT·(P_solar + P_rain + P_wind)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (conceptCode === 'AZ-AER-001') {
    const res = computeAeroChargeEV({
      carSpeedMs: aerSpeedMs,
      ductAreaM2: aerDuctM2,
      turbineCp: aerCp,
      deltaCdA: 0.045,
      isBrakingOrDescent: aerBrakingMode,
    });

    return (
      <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#0b0b10] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#d4af37]" />
            <h4 className="font-mono text-sm font-semibold text-[#f7d665]">
              Interactive Numerical Calibration — AERO-CHARGE EV Airflow vs Drag Balance
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setAerSpeedMs(28);
              setAerDuctM2(0.18);
              setAerCp(0.42);
              setAerBrakingMode(true);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 px-2.5 py-1 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Baseline
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Vehicle Speed v_car ({(aerSpeedMs * 3.6).toFixed(0)} km/h)</span>
                <span className="text-[#f7d665] tabular-nums">{aerSpeedMs} m/s</span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="1"
                value={aerSpeedMs}
                onChange={(e) => setAerSpeedMs(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Intake Duct Area A_duct</span>
                <span className="text-[#f7d665] tabular-nums">{aerDuctM2.toFixed(2)} m²</span>
              </div>
              <input
                type="range"
                min="0.06"
                max="0.35"
                step="0.02"
                value={aerDuctM2}
                onChange={(e) => setAerDuctM2(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Turbine Power Coefficient C_p (Betz Limit ≤ 0.593)</span>
                <span className="text-[#f7d665] tabular-nums">{aerCp.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.15"
                max="0.58"
                step="0.01"
                value={aerCp}
                onChange={(e) => setAerCp(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-xs text-[#9a9aa8]">
                Active Intake Louver Mode:
              </span>
              <button
                type="button"
                onClick={() => setAerBrakingMode((prev) => !prev)}
                className="rounded border border-[#d4af37]/40 bg-[#12121a] px-3 py-1 font-mono text-xs font-semibold text-[#f7d665] hover:bg-[#d4af37] hover:text-[#050507] transition-colors"
              >
                {aerBrakingMode
                  ? '● Braking / Downhill Coasting (Louvers OPEN)'
                  : '▲ Constant-Speed Cruise (Added Drag Penalty)'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Duct Airflow Power P_air</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {(res.pAirW / 1000).toFixed(2)} kW
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                ½·ρ_air·A_duct·v³
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Recovered Electric P_elec</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {(res.pElecW / 1000).toFixed(2)} kW
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                η_sys·C_p·P_air
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Traction Drag Penalty P_drag</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {(res.pDragPenaltyW / 1000).toFixed(2)} kW
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                {aerBrakingMode ? '0 kW (Free Deceleration)' : '½·ρ·v³·Δ(C_d·A)'}
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Net Thermodynamic Balance</div>
              <div className="mt-1 font-mono text-base font-bold text-[#f7d665] tabular-nums">
                {res.pNetBalanceW >= 0 ? '+' : ''}
                {(res.pNetBalanceW / 1000).toFixed(2)} kW ({res.isNetGain ? '● Net Gain' : '✖ Net Loss'})
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                P_elec - P_drag_added
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (conceptCode === 'AZ-MSD-1.0') {
    const res = computeMsdDeduplication({
      fileCountN: msdFilesN,
      avgFileSizeMb: msdAvgMb,
      sharedContextRatio: msdSharedRatio,
      eccMirrorFactor: msdEccMirror,
    });

    return (
      <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#0b0b10] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#d4af37]" />
            <h4 className="font-mono text-sm font-semibold text-[#f7d665]">
              Interactive Numerical Calibration — MSD Context Deduplication &amp; ECC Safety
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setMsdFilesN(100);
              setMsdAvgMb(12);
              setMsdSharedRatio(0.72);
              setMsdEccMirror(2);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 px-2.5 py-1 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Baseline
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Correlated Files in Context Group N</span>
                <span className="text-[#f7d665] tabular-nums">{msdFilesN} files</span>
              </div>
              <input
                type="range"
                min="10"
                max="500"
                step="10"
                value={msdFilesN}
                onChange={(e) => setMsdFilesN(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Average Raw File Size S(F_i)</span>
                <span className="text-[#f7d665] tabular-nums">{msdAvgMb} MB</span>
              </div>
              <input
                type="range"
                min="2"
                max="50"
                step="2"
                value={msdAvgMb}
                onChange={(e) => setMsdAvgMb(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Neuro-Chip Shared Pattern Extraction Ratio</span>
                <span className="text-[#f7d665] tabular-nums">{(msdSharedRatio * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.02"
                value={msdSharedRatio}
                onChange={(e) => setMsdSharedRatio(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>ECC Multi-Mirror Redundancy on C_shared</span>
                <span className="text-[#f7d665] tabular-nums">{msdEccMirror}× Mirror</span>
              </div>
              <input
                type="range"
                min="1"
                max="4"
                step="1"
                value={msdEccMirror}
                onChange={(e) => setMsdEccMirror(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Standard Storage S_standard</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.sStandardMb.toFixed(0)} MB
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Σ S(F_i) Blind Block Storage
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">MSD Footprint S_MSD</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.sMsdMb.toFixed(1)} MB
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                S(C_shared) + Σ S(Δ_i) + S(G_meta)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Capacity Multiplier Γ_eff</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.gammaEff.toFixed(2)}×
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                S_standard / S_MSD
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Shared Context Block C_shared</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.cSharedMb.toFixed(1)} MB
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Protected by {msdEccMirror}× ECC + SHA-3
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (conceptCode === 'AZ-APS-001') {
    const res = computeAegisShield({
      foldedAreaM2: 0.18,
      deployedAreaM2: apsDeployedM2,
      titaniumMm: apsTitaniumMm,
      grapheneCompMm: apsGrapheneMm,
      tungstenCapMm: 1.2,
      heatFluxKwM2: apsHeatKwM2,
    });

    return (
      <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#0b0b10] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#d4af37]" />
            <h4 className="font-mono text-sm font-semibold text-[#f7d665]">
              Interactive Numerical Calibration — AEGIS Tri-Material Shield Mass &amp; Thermal Drop
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setApsDeployedM2(1.2);
              setApsTitaniumMm(2.5);
              setApsGrapheneMm(4.0);
              setApsHeatKwM2(350);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 px-2.5 py-1 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Baseline
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Deployed Barrier Surface Area A_deployed</span>
                <span className="text-[#f7d665] tabular-nums">{apsDeployedM2.toFixed(2)} m²</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.2"
                step="0.1"
                value={apsDeployedM2}
                onChange={(e) => setApsDeployedM2(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Titanium Alloy Skeleton Thickness t_Ti</span>
                <span className="text-[#f7d665] tabular-nums">{apsTitaniumMm.toFixed(1)} mm</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="5.0"
                step="0.5"
                value={apsTitaniumMm}
                onChange={(e) => setApsTitaniumMm(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Graphene Composite Core Thickness t_G</span>
                <span className="text-[#f7d665] tabular-nums">{apsGrapheneMm.toFixed(1)} mm</span>
              </div>
              <input
                type="range"
                min="1.5"
                max="8.0"
                step="0.5"
                value={apsGrapheneMm}
                onChange={(e) => setApsGrapheneMm(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Incident Thermal Flux q_heat (Tungsten 3422°C Cap)</span>
                <span className="text-[#f7d665] tabular-nums">{apsHeatKwM2} kW/m²</span>
              </div>
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={apsHeatKwM2}
                onChange={(e) => setApsHeatKwM2(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Expansion Ratio Γ_deploy</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.gammaDeploy.toFixed(1)}×
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                A_deployed / A_folded (0.18 m²)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Areal Density Σ(ρ_i·t_i)</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.arealMassKgM2.toFixed(1)} kg/m²
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Ti Frame + Graphene + 25% W Cap
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Total Shield Mass M_shield</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.totalShieldMassKg.toFixed(1)} kg
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Portable Non-Weaponized Barrier
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Through-Thickness ΔT</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.deltaTempK.toFixed(1)} K
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Fourier Heat Spread Insulation
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (conceptCode === 'AZ-SFT-01') {
    const res = computeAspfSpaceFolding({
      properDistanceLightYears: sftDistanceLy,
      foldFactorEta: sftFoldEta,
      localShipSpeedFractionC: sftShipVelocityC,
    });

    return (
      <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#0b0b10] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#d4af37]" />
            <h4 className="font-mono text-sm font-semibold text-[#f7d665]">
              Interactive Numerical Calibration — ASPF Space-Folding Proper Distance D_folded
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setSftDistanceLy(4.37);
              setSftFoldEta(0.98);
              setSftShipVelocityC(0.1);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 px-2.5 py-1 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Alpha Centauri Baseline
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Unfolded Proper Distance L₀</span>
                <span className="text-[#f7d665] tabular-nums">{sftDistanceLy.toFixed(2)} ly</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="50.0"
                step="0.5"
                value={sftDistanceLy}
                onChange={(e) => setSftDistanceLy(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Metric Contraction Factor η_fold (0 = Flat, →1 = Deep Fold)</span>
                <span className="text-[#f7d665] tabular-nums">{sftFoldEta.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.995"
                step="0.005"
                value={sftFoldEta}
                onChange={(e) => setSftFoldEta(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Sub-Luminal Local Spacecraft Speed v_local &lt; c</span>
                <span className="text-[#f7d665] tabular-nums">{(sftShipVelocityC * 100).toFixed(0)}% c</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.5"
                step="0.01"
                value={sftShipVelocityC}
                onChange={(e) => setSftShipVelocityC(parseFloat(e.target.value))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Folded Distance D_folded</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.dFoldedLy.toFixed(3)} ly
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                L₀ · (1 - η_fold)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Transit Duration Δt_trav</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.traversalTimeYears.toFixed(2)} yrs
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                D_folded / v_local (Local v &lt; c)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Effective Transit Ratio v_eff/c</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.apparentSpeedFactorC.toFixed(2)}× c
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Geometric Shortcut (No Local FTL)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Einstein Stiffness c⁴/(8πG)</div>
              <div className="mt-1 font-mono text-lg font-bold text-[#f2f2f7] tabular-nums">
                {res.curvaturePrefactorN.toExponential(2)} N
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Requires Exotic T_μν (&lt; 0 NEC)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (conceptCode === 'AZ-MXJ-01') {
    const res = computeMaxSolarTowerAndPort({
      faceAreaM2: 0.35,
      panelEfficiency: 0.22,
      faceIrradiancesWm2: [mxjEastWm2, mxjSouthWm2, mxjWestWm2],
      activeSignalPins: mxjActivePins,
      busVoltageV: 20,
      busCurrentA: 5,
    });

    return (
      <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#0b0b10] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-[#d4af37]" />
            <h4 className="font-mono text-sm font-semibold text-[#f7d665]">
              Interactive Numerical Calibration — MAX Triangular Solar Tower &amp; Smart Pin Port
            </h4>
          </div>
          <button
            type="button"
            onClick={() => {
              setMxjEastWm2(620);
              setMxjSouthWm2(880);
              setMxjWestWm2(540);
              setMxjActivePins(16);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 px-2.5 py-1 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Reset Baseline
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Face 1 (East Morning) Irradiance G₁</span>
                <span className="text-[#f7d665] tabular-nums">{mxjEastWm2} W/m²</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="20"
                value={mxjEastWm2}
                onChange={(e) => setMxjEastWm2(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Face 2 (South Midday) Irradiance G₂</span>
                <span className="text-[#f7d665] tabular-nums">{mxjSouthWm2} W/m²</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="20"
                value={mxjSouthWm2}
                onChange={(e) => setMxjSouthWm2(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Face 3 (West Afternoon) Irradiance G₃</span>
                <span className="text-[#f7d665] tabular-nums">{mxjWestWm2} W/m²</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="20"
                value={mxjWestWm2}
                onChange={(e) => setMxjWestWm2(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>

            <label className="block">
              <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
                <span>Universal Port Active Micro-Pins N_active</span>
                <span className="text-[#f7d665] tabular-nums">{mxjActivePins} pins</span>
              </div>
              <input
                type="range"
                min="4"
                max="32"
                step="2"
                value={mxjActivePins}
                onChange={(e) => setMxjActivePins(parseInt(e.target.value, 10))}
                className="mt-1 w-full accent-[#d4af37]"
              />
            </label>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">3-Face Tower Output E_tower</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.towerPowerW.toFixed(1)} W
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                Σ η_panel·A_f·G_f (3 Vertical Faces)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Multi-Angle Gain vs Flat Panel</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.multiAngleGainRatio.toFixed(2)}×
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                No Mechanical Sun-Tracking Motors
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Smart Pin Resistance R_contact</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f2f2f7] tabular-nums">
                {res.rContactMilliohms.toFixed(2)} mΩ
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                ρ_c / (N_active·A_pin)
              </div>
            </div>

            <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
              <div className="font-mono text-xs text-[#9a9aa8]">Universal Port Delivery P_port</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#f7d665] tabular-nums">
                {res.deliveredPortPowerW.toFixed(2)} W
              </div>
              <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
                20V·5A Bus (I²R Loss: {res.resistiveLossW.toFixed(2)}W)
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Concept 4 (AZ-FR-01)
  const res = computeFusionReactor({
    thermalPowerMw: frThermalMw,
    thermalEfficiency: frEfficiency,
    parasiticLoadMw: frParasiticMw,
    tritiumBreedingRatio: frTbr,
  });

  return (
    <div className="mt-6 rounded-lg border border-[#d4af37]/30 bg-[#0b0b10] p-5">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#d4af37]/20 pb-3">
        <div className="flex items-center gap-2">
          <Sliders className="h-4 w-4 text-[#d4af37]" />
          <h4 className="font-mono text-sm font-semibold text-[#f7d665]">
            Interactive Numerical Calibration — D–T Fusion Reaction Rate &amp; Plant Balance
          </h4>
        </div>
        <button
          type="button"
          onClick={() => {
            setFrThermalMw(100);
            setFrEfficiency(0.4);
            setFrParasiticMw(14);
            setFrTbr(1.08);
          }}
          className="inline-flex items-center gap-1.5 rounded border border-[#d4af37]/30 px-2.5 py-1 font-mono text-xs text-[#9a9aa8] hover:border-[#d4af37] hover:text-[#f2f2f7] transition-colors"
        >
          <RotateCcw className="h-3 w-3" />
          Reset 100 MWth Baseline
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <label className="block">
            <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
              <span>Target Thermal Fusion Power P_thermal</span>
              <span className="text-[#f7d665] tabular-nums">{frThermalMw} MW</span>
            </div>
            <input
              type="range"
              min="25"
              max="500"
              step="25"
              value={frThermalMw}
              onChange={(e) => setFrThermalMw(parseInt(e.target.value, 10))}
              className="mt-1 w-full accent-[#d4af37]"
            />
          </label>

          <label className="block">
            <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
              <span>Thermal-to-Electric Conversion Efficiency η_th</span>
              <span className="text-[#f7d665] tabular-nums">{(frEfficiency * 100).toFixed(0)}%</span>
            </div>
            <input
              type="range"
              min="0.25"
              max="0.55"
              step="0.01"
              value={frEfficiency}
              onChange={(e) => setFrEfficiency(parseFloat(e.target.value))}
              className="mt-1 w-full accent-[#d4af37]"
            />
          </label>

          <label className="block">
            <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
              <span>Parasitic Plant Load P_aux (Magnets, Heating, Pumps, AI)</span>
              <span className="text-[#f7d665] tabular-nums">{frParasiticMw} MW</span>
            </div>
            <input
              type="range"
              min="5"
              max="80"
              step="1"
              value={frParasiticMw}
              onChange={(e) => setFrParasiticMw(parseInt(e.target.value, 10))}
              className="mt-1 w-full accent-[#d4af37]"
            />
          </label>

          <label className="block">
            <div className="flex justify-between font-mono text-xs text-[#9a9aa8]">
              <span>Li-6 Blanket Tritium Breeding Ratio (TBR)</span>
              <span className="text-[#f7d665] tabular-nums">{frTbr.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.85"
              max="1.35"
              step="0.01"
              value={frTbr}
              onChange={(e) => setFrTbr(parseFloat(e.target.value))}
              className="mt-1 w-full accent-[#d4af37]"
            />
          </label>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
            <div className="font-mono text-xs text-[#9a9aa8]">D–T Reaction Rate R_fusion</div>
            <div className="mt-1 font-mono text-lg font-bold text-[#f7d665] tabular-nums">
              {res.reactionRatePerSec.toExponential(2)} /s
            </div>
            <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
              E_rxn = 17.6 MeV ≈ 2.82×10⁻¹² J
            </div>
          </div>

          <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
            <div className="font-mono text-xs text-[#9a9aa8]">Neutron vs Alpha Split</div>
            <div className="mt-1 font-mono text-base font-bold text-[#f2f2f7] tabular-nums">
              {res.neutronPowerMw.toFixed(1)} MW n / {res.alphaPowerMw.toFixed(1)} MW α
            </div>
            <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
              80.1% Blanket · 19.9% Self-Heat
            </div>
          </div>

          <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
            <div className="font-mono text-xs text-[#9a9aa8]">Gross vs Net Electric</div>
            <div className="mt-1 font-mono text-lg font-bold text-[#f7d665] tabular-nums">
              {res.grossElectricMw.toFixed(1)} MW → {res.netElectricMw.toFixed(1)} MW
            </div>
            <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
              Q_eng = {res.engineeringGainQ.toFixed(2)} ({res.isNetPositive ? '● Net +' : '✖ Net -'})
            </div>
          </div>

          <div className="rounded border border-[#d4af37]/25 bg-[#12121a] p-3">
            <div className="font-mono text-xs text-[#9a9aa8]">Tritium Fuel Cycle Status</div>
            <div className="mt-1 font-mono text-sm font-bold text-[#f2f2f7] tabular-nums">
              {res.isTritiumSelfSufficient
                ? `● Self-Sufficient (TBR ${frTbr.toFixed(2)} ≥ 1.05)`
                : `▲ Deficit (TBR ${frTbr.toFixed(2)} < 1.05)`}
            </div>
            <div className="mt-1 font-mono text-[11px] text-[#9a9aa8]">
              ⁶₃Li + ¹₀n → ⁴₂He + ³₁T + 4.78 MeV
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
