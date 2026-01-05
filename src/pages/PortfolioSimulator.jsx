import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

import Footer from "../components/Footer";

import "../styles/PortfolioSimulator.css";
import "../styles/Home.css";

// Utility function to format currency
const formatDKK = (value) => {
  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1000000) return `${sign}${(absValue / 1000000).toFixed(1)}M`;
  if (absValue >= 1000) return `${sign}${(absValue / 1000).toFixed(0)}k`;
  return `${sign}${absValue.toFixed(0)}`;
};

// Seeded pseudo-random number generator
const createSeededRandom = (seed) => {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
};

// Box-Muller transform for gaussian random numbers
const createGaussianRandom = (random) => () => {
  const u1 = random();
  const u2 = random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
};

// Unified simulation function - returns detailed breakdown data for both graph and table
const runSimulation = (params, seed = null, includeVolatility = true) => {
  const {
    currentAge, retireAge, endAge, monthlySavings, savingsGrowthRate,
    expectedReturn, volatility, monthlyWithdrawal, withdrawalGrowthRate, crashEnabled, crashAge, crashPercent
  } = params;

  const data = [];
  let portfolio = 0;
  let yearDeposits = 0;
  let yearInterest = 0;
  let totalDeposits = 0;
  let currentSavings = monthlySavings;
  let currentWithdrawal = monthlyWithdrawal;
  const monthlyReturn = expectedReturn / 100 / 12;
  const monthlyVol = includeVolatility ? volatility / 100 / Math.sqrt(12) : 0;

  const random = seed !== null ? createSeededRandom(seed) : Math.random;
  const gaussianRandom = createGaussianRandom(random);

  const totalMonths = (endAge - currentAge + 1) * 12 - 1;
  const retireMonth = (retireAge - currentAge) * 12;
  const crashMonth = crashEnabled ? Math.round((crashAge - currentAge) * 12) : -1;

  for (let month = 0; month <= totalMonths; month++) {
    const isRetired = month >= retireMonth;

    // Apply crash (counts as negative interest)
    if (crashEnabled && month === crashMonth) {
      const crashLoss = portfolio * (crashPercent / 100);
      portfolio *= (1 - crashPercent / 100);
      yearInterest -= crashLoss;
    }

    // Apply returns - track interest earned
    const monthReturn = includeVolatility
      ? monthlyReturn + monthlyVol * gaussianRandom()
      : monthlyReturn;
    const interestEarned = portfolio * monthReturn;
    portfolio *= (1 + monthReturn);
    yearInterest += interestEarned;

    // Accumulation or withdrawal - track actual deposits
    if (!isRetired) {
      portfolio += currentSavings;
      yearDeposits += currentSavings;
      if (month > 0 && month % 12 === 0) {
        currentSavings *= (1 + savingsGrowthRate / 100);
      }
    } else {
      portfolio -= currentWithdrawal;
      yearDeposits -= currentWithdrawal;
      // Increase withdrawal at the start of each retirement year (except the first)
      if (month > retireMonth && (month - retireMonth) % 12 === 0) {
        currentWithdrawal *= (1 + withdrawalGrowthRate / 100);
      }
    }

    // Record at end of each year (after 12 months of simulation)
    if ((month + 1) % 12 === 0) {
      const age = currentAge + Math.floor(month / 12);
      totalDeposits += yearDeposits;

      data.push({
        age,
        portfolio,
        yearDeposit: yearDeposits,
        totalDeposits,
        yearInterest,
        accruedInterest: portfolio - totalDeposits,
      });

      yearDeposits = 0;
      yearInterest = 0;
    }
  }

  return data;
};

// Optimized percentile calculation using quickselect-like approach
const getPercentileValue = (sortedValues, percentile) => {
  const index = Math.floor(sortedValues.length * percentile);
  return sortedValues[index] || 0;
};

// Design tokens
const colors = {
  background: '#02060f',
  cardBg: '#1F2937',
  border: '#35465E',
  borderHover: '#5395f2',
  accent: '#15bbe5',
  accentHover: '#5395f2',
  text: 'rgb(255, 255, 255)',
  textMuted: '#888',
  success: '#22c55e',
  warning: '#f97316',
  danger: '#ef4444',
};

function PortfolioSimulator() {
  // Set page title
  useEffect(() => {
    document.title = "Retirement Portfolio Simulator";
  }, []);

  // Accumulation phase inputs
  const [currentAge, setCurrentAge] = useState(25);
  const [retireAge, setRetireAge] = useState(55);
  const [monthlySavings, setMonthlySavings] = useState(15000);
  const [savingsGrowthRate, setSavingsGrowthRate] = useState(2);

  // Return assumptions
  const [expectedReturn, setExpectedReturn] = useState(7);
  const [volatility, setVolatility] = useState(15);

  // Withdrawal phase
  const [monthlyWithdrawal, setMonthlyWithdrawal] = useState(40000);
  const [withdrawalGrowthRate, setWithdrawalGrowthRate] = useState(2);
  const [endAge, setEndAge] = useState(90);

  // Crash scenarios
  const [crashEnabled, setCrashEnabled] = useState(false);
  const [crashAge, setCrashAge] = useState(56);
  const [crashPercent, setCrashPercent] = useState(40);

  // Monte Carlo
  const [showMonteCarlo, setShowMonteCarlo] = useState(false);
  const [numSimulations, setNumSimulations] = useState(100);
  const [monteCarloSeed, setMonteCarloSeed] = useState(12345);

  // Tooltip state
  const [showTooltip, setShowTooltip] = useState(false);
  const [showWithdrawalTooltip, setShowWithdrawalTooltip] = useState(false);
  const [showPortfolioTooltip, setShowPortfolioTooltip] = useState(false);

  // Breakdown table state
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [selectedPercentile, setSelectedPercentile] = useState('p50');

  // Memoized simulation parameters object
  const simParams = useMemo(() => ({
    currentAge, retireAge, endAge, monthlySavings, savingsGrowthRate,
    expectedReturn, volatility, monthlyWithdrawal, withdrawalGrowthRate, crashEnabled, crashAge, crashPercent
  }), [currentAge, retireAge, endAge, monthlySavings, savingsGrowthRate, expectedReturn, volatility, monthlyWithdrawal, withdrawalGrowthRate, crashEnabled, crashAge, crashPercent]);

  // Baseline simulation (no volatility) - full detailed data
  const baselineSimulation = useMemo(() => {
    return runSimulation(simParams, null, false);
  }, [simParams]);

  // Baseline data for graph (just age and portfolio)
  const baselineData = useMemo(() => {
    return baselineSimulation.map(d => ({ age: d.age, baseline: d.portfolio }));
  }, [baselineSimulation]);

  // Monte Carlo simulations - store all for breakdown selection
  const monteCarloSimulations = useMemo(() => {
    if (!showMonteCarlo) return null;

    const allSims = [];
    for (let i = 0; i < numSimulations; i++) {
      allSims.push(runSimulation(simParams, i * monteCarloSeed, true));
    }
    return allSims;
  }, [showMonteCarlo, numSimulations, monteCarloSeed, simParams]);

  // Monte Carlo graph data (percentiles at each age)
  const monteCarloData = useMemo(() => {
    if (!monteCarloSimulations) return null;

    const numYears = monteCarloSimulations[0].length;
    const combined = new Array(numYears);

    for (let i = 0; i < numYears; i++) {
      const values = monteCarloSimulations.map(sim => sim[i].portfolio);
      values.sort((a, b) => a - b);

      combined[i] = {
        age: monteCarloSimulations[0][i].age,
        p10: getPercentileValue(values, 0.1),
        p25: getPercentileValue(values, 0.25),
        p50: getPercentileValue(values, 0.5),
        p75: getPercentileValue(values, 0.75),
        p90: getPercentileValue(values, 0.9),
      };
    }

    return combined;
  }, [monteCarloSimulations]);

  // Breakdown data - uses baseline or synthetic Monte Carlo percentile path
  const breakdownData = useMemo(() => {
    if (!showMonteCarlo || !monteCarloData) {
      return baselineSimulation;
    }

    // Create synthetic percentile path that matches the graph
    // Deposits are deterministic (same across all simulations), so use baseline
    // Portfolio values come from the percentile data used in the graph
    return baselineSimulation.map((baseRow, i) => {
      const percentilePortfolio = monteCarloData[i]?.[selectedPercentile] ?? 0;
      const prevPercentilePortfolio = i > 0 ? (monteCarloData[i - 1]?.[selectedPercentile] ?? 0) : 0;

      // Calculate year interest: portfolio change minus deposits
      const yearInterest = percentilePortfolio - prevPercentilePortfolio - baseRow.yearDeposit;

      return {
        age: baseRow.age,
        portfolio: percentilePortfolio,
        yearDeposit: baseRow.yearDeposit,
        totalDeposits: baseRow.totalDeposits,
        yearInterest,
        accruedInterest: percentilePortfolio - baseRow.totalDeposits,
      };
    });
  }, [showMonteCarlo, baselineSimulation, monteCarloData, selectedPercentile]);

  const portfolioAtRetirement = useMemo(() => {
    if (showMonteCarlo && monteCarloData) {
      return monteCarloData.find(d => d.age === retireAge)?.p50 || 0;
    }
    return baselineData.find(d => d.age === retireAge)?.baseline || 0;
  }, [baselineData, monteCarloData, showMonteCarlo, retireAge]);

  const portfolioAtRetirementByPercentile = useMemo(() => {
    if (!showMonteCarlo || !monteCarloData) return null;
    const retirementData = monteCarloData.find(d => d.age === retireAge);
    if (!retirementData) return null;
    return {
      p10: retirementData.p10,
      p25: retirementData.p25,
      p50: retirementData.p50,
      p75: retirementData.p75,
      p90: retirementData.p90,
    };
  }, [showMonteCarlo, monteCarloData, retireAge]);

  const withdrawalRate = portfolioAtRetirement > 0 ? (monthlyWithdrawal * 12 / portfolioAtRetirement * 100) : 0;

  const meanWithdrawalRate = useMemo(() => {
    const annualWithdrawal = monthlyWithdrawal * 12;
    const data = showMonteCarlo && monteCarloData ? monteCarloData : baselineData;
    const portfolioKey = showMonteCarlo ? 'p50' : 'baseline';

    // Get retirement years with positive portfolio values
    const retirementYears = data.filter(d => d.age >= retireAge && d[portfolioKey] > 0);

    if (retirementYears.length === 0) return 0;

    // Calculate withdrawal rate for each year and average them
    const rates = retirementYears.map(d => (annualWithdrawal / d[portfolioKey]) * 100);
    return rates.reduce((sum, rate) => sum + rate, 0) / rates.length;
  }, [baselineData, monteCarloData, showMonteCarlo, retireAge, monthlyWithdrawal]);

  const runsOutAge = useMemo(() => {
    if (showMonteCarlo && monteCarloData) {
      return monteCarloData.find(d => d.p50 < 0)?.age;
    }
    return baselineData.find(d => d.baseline < 0)?.age;
  }, [baselineData, monteCarloData, showMonteCarlo]);

  const runsOutAgesByPercentile = useMemo(() => {
    if (!showMonteCarlo || !monteCarloData) return null;
    return {
      p10: monteCarloData.find(d => d.p10 < 0)?.age,
      p25: monteCarloData.find(d => d.p25 < 0)?.age,
      p50: monteCarloData.find(d => d.p50 < 0)?.age,
      p75: monteCarloData.find(d => d.p75 < 0)?.age,
      p90: monteCarloData.find(d => d.p90 < 0)?.age,
    };
  }, [showMonteCarlo, monteCarloData]);

  const withdrawalOk = withdrawalRate <= 4;

  return (
    <>
      <div className="simulator-container">
        <h1 className="simulator-title">Retirement Portfolio Simulator</h1>

        <div className="simulator-grid">
          {/* Accumulation Phase */}
          <div className="simulator-card">
            <h2 className="simulator-card-title">Accumulation Phase</h2>

            <label className="simulator-label">
              <span className="simulator-label-text">Current Age: {currentAge}</span>
              <input type="range" min="20" max="70" value={currentAge}
                onChange={e => {
                  const newAge = Number(e.target.value);
                  setCurrentAge(newAge);
                  if (retireAge < newAge + 5) {
                    setRetireAge(newAge + 5);
                  }
                }}
                className="simulator-slider" />
            </label>

            <label className="simulator-label">
              <span className="simulator-label-text">Retirement Age: {retireAge}</span>
              <input type="range" min={currentAge + 5} max="80" value={retireAge}
                onChange={e => {
                  const newRetireAge = Number(e.target.value);
                  setRetireAge(newRetireAge);
                  if (endAge < newRetireAge) {
                    setEndAge(newRetireAge);
                  }
                }}
                className="simulator-slider" />
            </label>

            <label className="simulator-label">
              <span className="simulator-label-text">Monthly Savings (DKK)</span>
              <input type="number" min="0" step="1000" value={monthlySavings}
                onChange={e => setMonthlySavings(Number(e.target.value))}
                className="simulator-input" />
            </label>

            <label className="simulator-label">
              <span className="simulator-label-text">Yearly Savings Increase: {savingsGrowthRate}%</span>
              <input type="range" min="0" max="5" step="0.5" value={savingsGrowthRate}
                onChange={e => setSavingsGrowthRate(Number(e.target.value))}
                className="simulator-slider" />
            </label>
          </div>

          {/* Returns & Volatility */}
          <div className="simulator-card">
            <h2 className="simulator-card-title">Market Assumptions</h2>

            <label className="simulator-label">
              <span className="simulator-label-text">Expected Return: {expectedReturn}%</span>
              <input type="range" min="3" max="12" step="0.5" value={expectedReturn}
                onChange={e => setExpectedReturn(Number(e.target.value))}
                className="simulator-slider" />
            </label>

            <div className="simulator-divider">
              <label className="simulator-checkbox-label">
                <input type="checkbox" checked={crashEnabled}
                  onChange={e => setCrashEnabled(e.target.checked)}
                  className="simulator-checkbox" />
                <span style={{ fontSize: '0.875rem', color: colors.warning, fontWeight: '500' }}>
                  Simulate Market Crash
                </span>
              </label>

              {crashEnabled && (
                <>
                  <label className="simulator-label">
                    <span className="simulator-label-text">Crash at Age: {crashAge}</span>
                    <input type="range" min={currentAge} max={endAge} value={crashAge}
                      onChange={e => setCrashAge(Number(e.target.value))}
                      className="simulator-slider" />
                  </label>

                  <label className="simulator-label">
                    <span className="simulator-label-text">Crash Size: -{crashPercent}%</span>
                    <input type="range" min="10" max="60" step="5" value={crashPercent}
                      onChange={e => setCrashPercent(Number(e.target.value))}
                      className="simulator-slider" />
                  </label>
                </>
              )}
            </div>

            <div className="simulator-divider">
              <label className="simulator-checkbox-label">
                <input type="checkbox" checked={showMonteCarlo}
                  onChange={e => setShowMonteCarlo(e.target.checked)}
                  className="simulator-checkbox" />
                <span style={{ fontSize: '0.875rem', color: colors.accentHover, fontWeight: '500' }}>
                  Monte Carlo Simulation
                </span>
              </label>

              {showMonteCarlo && (
                <>
                  <label className="simulator-label">
                    <span className="simulator-label-text">Volatility (Std Dev): {volatility}%</span>
                    <input type="range" min="5" max="30" step="1" value={volatility}
                      onChange={e => setVolatility(Number(e.target.value))}
                      className="simulator-slider" />
                  </label>

                  <label className="simulator-label">
                    <span className="simulator-label-text">Simulations: {numSimulations}</span>
                    <input type="range" min="100" max="500" step="50" value={numSimulations}
                      onChange={e => setNumSimulations(Number(e.target.value))}
                      className="simulator-slider" />
                  </label>

                  <button
                    onClick={() => setMonteCarloSeed(Math.floor(Math.random() * 100000))}
                    className="simulator-reroll-button"
                  >
                    Re-roll Simulation
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Withdrawal Phase */}
          <div className="simulator-card">
            <h2 className="simulator-card-title">Withdrawal Phase</h2>

            <label className="simulator-label">
              <span className="simulator-label-text">Monthly Withdrawal: {formatDKK(monthlyWithdrawal)} DKK</span>
              <input type="range" min="20000" max="80000" step="2500" value={monthlyWithdrawal}
                onChange={e => setMonthlyWithdrawal(Number(e.target.value))}
                className="simulator-slider" />
            </label>

            <label className="simulator-label">
              <span className="simulator-label-text">Yearly Withdrawal Increase: {withdrawalGrowthRate}%</span>
              <input type="range" min="0" max="5" step="0.5" value={withdrawalGrowthRate}
                onChange={e => setWithdrawalGrowthRate(Number(e.target.value))}
                className="simulator-slider" />
            </label>

            <label className="simulator-label">
              <span className="simulator-label-text">Plan Until Age: {endAge}</span>
              <input type="range" min={retireAge} max="100" value={endAge}
                onChange={e => setEndAge(Number(e.target.value))}
                className="simulator-slider" />
            </label>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="simulator-metrics-grid">
          <div
            className={`simulator-metric-card ${showMonteCarlo ? 'simulator-tooltip-container' : ''}`}
            style={{ borderLeft: `4px solid ${colors.accent}` }}
            onMouseEnter={() => showMonteCarlo && setShowPortfolioTooltip(true)}
            onMouseLeave={() => setShowPortfolioTooltip(false)}
          >
            <div className="simulator-metric-label">Portfolio at Retirement</div>
            <div className="simulator-metric-value" style={{ color: colors.accent }}>{formatDKK(portfolioAtRetirement)} DKK</div>
            {showMonteCarlo && showPortfolioTooltip && portfolioAtRetirementByPercentile && (
              <div className="simulator-tooltip">
                <div>10th percentile: {formatDKK(portfolioAtRetirementByPercentile.p10)} DKK</div>
                <div>25th percentile: {formatDKK(portfolioAtRetirementByPercentile.p25)} DKK</div>
                <div>Median (50th): {formatDKK(portfolioAtRetirementByPercentile.p50)} DKK</div>
                <div>75th percentile: {formatDKK(portfolioAtRetirementByPercentile.p75)} DKK</div>
                <div>90th percentile: {formatDKK(portfolioAtRetirementByPercentile.p90)} DKK</div>
                <div className="simulator-tooltip-arrow"></div>
              </div>
            )}
          </div>
          <div
            className="simulator-metric-card simulator-tooltip-container"
            style={{ borderLeft: `4px solid ${withdrawalOk ? colors.success : colors.danger}` }}
            onMouseEnter={() => setShowWithdrawalTooltip(true)}
            onMouseLeave={() => setShowWithdrawalTooltip(false)}
          >
            <div className="simulator-metric-label">Withdrawal Rate</div>
            <div className="simulator-metric-value" style={{ color: withdrawalOk ? colors.success : colors.danger }}>
              {withdrawalRate.toFixed(1)}%
            </div>
            {showWithdrawalTooltip && (
              <div className="simulator-tooltip simulator-withdrawal-tooltip">
                <div style={{ marginBottom: '0.5rem' }}>
                  Annual withdrawal as a percentage of your portfolio at the start of retirement (first year only).
                </div>
                <div style={{ borderTop: `1px solid ${colors.border}`, paddingTop: '0.5rem' }}>
                  <span style={{ color: colors.textMuted }}>Mean rate (all years):</span>{' '}
                  <span style={{ color: withdrawalOk ? colors.success : colors.danger, fontWeight: '600' }}>
                    {meanWithdrawalRate.toFixed(1)}%
                  </span>
                </div>
                <div className="simulator-tooltip-arrow"></div>
              </div>
            )}
          </div>
          <div
            className={`simulator-metric-card ${showMonteCarlo ? 'simulator-tooltip-container' : ''}`}
            style={{ borderLeft: `4px solid ${runsOutAge ? colors.danger : colors.success}` }}
            onMouseEnter={() => showMonteCarlo && setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <div className="simulator-metric-label">Money Lasts Until</div>
            <div className="simulator-metric-value" style={{ color: runsOutAge ? colors.danger : colors.success }}>
              {runsOutAge ? `Age ${runsOutAge}` : `${endAge}+`}
            </div>
            {showMonteCarlo && showTooltip && runsOutAgesByPercentile && (
              <div className="simulator-tooltip">
                <div>10th percentile: {runsOutAgesByPercentile.p10 ? `Age ${runsOutAgesByPercentile.p10}` : `${endAge}+`}</div>
                <div>25th percentile: {runsOutAgesByPercentile.p25 ? `Age ${runsOutAgesByPercentile.p25}` : `${endAge}+`}</div>
                <div>Median (50th): {runsOutAgesByPercentile.p50 ? `Age ${runsOutAgesByPercentile.p50}` : `${endAge}+`}</div>
                <div>75th percentile: {runsOutAgesByPercentile.p75 ? `Age ${runsOutAgesByPercentile.p75}` : `${endAge}+`}</div>
                <div>90th percentile: {runsOutAgesByPercentile.p90 ? `Age ${runsOutAgesByPercentile.p90}` : `${endAge}+`}</div>
                <div className="simulator-tooltip-arrow"></div>
              </div>
            )}
          </div>
          <div className="simulator-metric-card" style={{ borderLeft: `4px solid ${colors.accentHover}` }}>
            <div className="simulator-metric-label">Years in Retirement</div>
            <div className="simulator-metric-value" style={{ color: colors.accentHover }}>{retireAge} → {runsOutAge || endAge}</div>
          </div>
        </div>

        {/* Chart */}
        <div className="simulator-chart-card">
          <ResponsiveContainer width="100%" height={500}>
            <LineChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
              <XAxis
                dataKey="age"
                type="number"
                domain={[currentAge, endAge]}
                label={{ value: 'Age', position: 'insideBottom', offset: -5, fill: colors.textMuted }}
                tick={{ fill: colors.textMuted }}
                stroke={colors.border}
              />
              <YAxis
                tickFormatter={formatDKK}
                label={{ value: 'Portfolio (DKK)', angle: -90, position: 'insideLeft', offset: -15, style: { textAnchor: 'middle', fill: colors.textMuted } }}
                tick={{ fill: colors.textMuted }}
                stroke={colors.border}
              />
              <Tooltip
                formatter={(value, name) => [`${formatDKK(value)} DKK`, name]}
                labelFormatter={(age) => `Age ${age}`}
                contentStyle={{ backgroundColor: colors.cardBg, border: `1px solid ${colors.border}`, borderRadius: '8px', color: colors.text }}
                labelStyle={{ color: colors.text }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px', color: colors.text }} />
              <ReferenceLine x={retireAge} stroke={colors.textMuted} strokeDasharray="5 5" label={{ value: "Retirement", position: 'top', fill: colors.textMuted }} />
              {crashEnabled && <ReferenceLine x={crashAge} stroke={colors.danger} strokeDasharray="3 3" label={{ value: "Crash", position: 'insideTop', fill: colors.danger }} />}

              {showMonteCarlo && monteCarloData && (
                <>
                  <Line data={monteCarloData} type="monotone" dataKey="p10" stroke={colors.danger} strokeWidth={1} dot={false} name="10th percentile" />
                  <Line data={monteCarloData} type="monotone" dataKey="p25" stroke={colors.warning} strokeWidth={1} dot={false} name="25th percentile" />
                  <Line data={monteCarloData} type="monotone" dataKey="p50" stroke={colors.accent} strokeWidth={2} dot={false} name="Median" />
                  <Line data={monteCarloData} type="monotone" dataKey="p75" stroke={colors.success} strokeWidth={1} dot={false} name="75th percentile" />
                  <Line data={monteCarloData} type="monotone" dataKey="p90" stroke="#86efac" strokeWidth={1} dot={false} name="90th percentile" />
                </>
              )}

              {!showMonteCarlo && (
                <Line data={baselineData} type="monotone" dataKey="baseline" stroke={colors.accent} strokeWidth={2} dot={false} name="Value" />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Breakdown */}
        <div className="simulator-breakdown-card">
          <div
            className="simulator-breakdown-header"
            onClick={() => setShowBreakdown(!showBreakdown)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <h3 className="simulator-breakdown-title">Detailed Portfolio Breakdown</h3>
              {showMonteCarlo && (
                <select
                  value={selectedPercentile}
                  onChange={(e) => setSelectedPercentile(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  className="simulator-percentile-select"
                >
                  <option value="p10">10th Percentile</option>
                  <option value="p25">25th Percentile</option>
                  <option value="p50">Median (50th)</option>
                  <option value="p75">75th Percentile</option>
                  <option value="p90">90th Percentile</option>
                </select>
              )}
            </div>
            <span
              className="simulator-breakdown-arrow"
              style={{ transform: showBreakdown ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              ▼
            </span>
          </div>
          {showBreakdown && (
            <div className="simulator-breakdown-content">
              <table className="simulator-table">
                <thead className="simulator-table-header">
                  <tr>
                    <th className="simulator-th simulator-th-first">Age</th>
                    <th className="simulator-th">Deposits</th>
                    <th className="simulator-th">Total Deposits</th>
                    <th className="simulator-th">Interest</th>
                    <th className="simulator-th">Accrued Interest</th>
                    <th className="simulator-th">Portfolio Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {breakdownData.map((row) => (
                    <tr
                      key={row.age}
                      className={row.age === retireAge ? 'simulator-row-retirement' : ''}
                    >
                      <td className="simulator-td simulator-td-first">
                        {row.age}
                        {row.age === retireAge && <span style={{ color: colors.accent, marginLeft: '0.5rem', fontSize: '0.75rem' }}>Retirement</span>}
                      </td>
                      <td className={`simulator-td ${row.yearDeposit >= 0 ? 'simulator-td-positive' : 'simulator-td-negative'}`}>
                        {row.yearDeposit >= 0 ? '+' : ''}{formatDKK(row.yearDeposit)} DKK
                      </td>
                      <td className={`simulator-td ${row.totalDeposits < 0 ? 'simulator-td-negative' : ''}`}>
                        {formatDKK(row.totalDeposits)} DKK
                      </td>
                      <td className={`simulator-td ${row.yearInterest >= 0 ? 'simulator-td-positive' : 'simulator-td-negative'}`}>
                        {row.yearInterest >= 0 ? '+' : ''}{formatDKK(row.yearInterest)} DKK
                      </td>
                      <td className={`simulator-td ${row.accruedInterest >= 0 ? 'simulator-td-positive' : 'simulator-td-negative'}`}>
                        {row.accruedInterest >= 0 ? '+' : ''}{formatDKK(row.accruedInterest)} DKK
                      </td>
                      <td className={`simulator-td ${row.portfolio < 0 ? 'simulator-td-negative' : ''}`}>
                        {formatDKK(row.portfolio)} DKK
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Explanation */}
        <div className="simulator-info-box">
          <p className="simulator-info-paragraph"><strong style={{ color: colors.accent }}>How to use:</strong> Adjust the sliders to model your scenario. The 4% rule suggests keeping withdrawal rate under 4% for a 30-year retirement.</p>
          <p><strong style={{ color: colors.accent }}>Crash simulation:</strong> Models a sudden market drop at a specific age to see how sequence-of-returns risk affects your portfolio.</p>
          <p className="simulator-info-paragraph"><strong style={{ color: colors.accent }}>Monte Carlo:</strong> Runs multiple random simulations to show the range of possible outcomes given market volatility.</p>
        </div>
      </div>

      {/* Back navigation */}
      <div>
        <Link to="/miniprojects" className="icon-link">
          <i className="fa-solid fa-arrow-left" style={{ fontSize: "15pt" }}></i>
          <p>Go Back To Mini Projects Overview</p>
        </Link>
      </div>

      {/* Footer */}
      <div className="true-center">
        <Footer />
      </div>
    </>
  );
}

export default PortfolioSimulator;
