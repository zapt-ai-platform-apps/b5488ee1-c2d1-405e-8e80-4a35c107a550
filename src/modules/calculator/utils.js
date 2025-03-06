import { currencyLocales } from './constants/currencies';

/**
 * Calculate future value using compound interest formula
 * 
 * @param {number} principal - Initial investment amount
 * @param {number} rate - Annual interest rate (as a decimal, e.g., 0.05 for 5%)
 * @param {number} time - Time period in years
 * @param {number} compoundingFrequency - Number of times interest compounds per year
 * @param {number} regularContribution - Regular contribution amount
 * @param {boolean} isContributionAtStart - Whether contribution is made at start or end of period
 * @returns {Object} Object containing future value and interest earned
 */
export function calculateCompoundInterest(
  principal,
  rate,
  time,
  compoundingFrequency,
  regularContribution = 0,
  isContributionAtStart = false
) {
  // Convert all inputs to numbers to ensure calculations work properly
  principal = Number(principal);
  rate = Number(rate) / 100; // Convert percentage to decimal
  time = Number(time);
  compoundingFrequency = Number(compoundingFrequency);
  regularContribution = Number(regularContribution);

  // Basic compound interest (no regular contributions)
  let futureValue = principal * Math.pow(1 + rate / compoundingFrequency, compoundingFrequency * time);

  // If there are regular contributions, calculate their future value
  if (regularContribution > 0) {
    const n = compoundingFrequency * time; // Total number of compounding periods
    const i = rate / compoundingFrequency; // Interest rate per compounding period

    if (isContributionAtStart) {
      // Formula for contributions made at the start of each period
      futureValue += regularContribution * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    } else {
      // Formula for contributions made at the end of each period
      futureValue += regularContribution * ((Math.pow(1 + i, n) - 1) / i);
    }
  }

  // Calculate total contributions
  const totalContributions = principal + (regularContribution * compoundingFrequency * time);
  
  // Calculate total interest earned
  const interestEarned = futureValue - totalContributions;

  return {
    futureValue: futureValue,
    totalContributions: totalContributions,
    interestEarned: interestEarned
  };
}

/**
 * Calculate inflation-adjusted future value
 * 
 * @param {number} futureValue - Future value calculated from compound interest
 * @param {number} inflationRate - Annual inflation rate (as a decimal)
 * @param {number} time - Time period in years
 * @returns {number} Inflation-adjusted future value
 */
export function calculateInflationAdjustedValue(futureValue, inflationRate, time) {
  // Convert inflation rate from percentage to decimal
  inflationRate = Number(inflationRate) / 100;
  
  // Calculate present value of the future amount
  const adjustedValue = futureValue / Math.pow(1 + inflationRate, time);
  
  return adjustedValue;
}

/**
 * Generate data for compound interest graph
 * 
 * @param {number} principal - Initial investment amount
 * @param {number} rate - Annual interest rate (as a decimal)
 * @param {number} time - Time period in years
 * @param {number} compoundingFrequency - Number of times interest compounds per year
 * @param {number} regularContribution - Regular contribution amount
 * @param {boolean} isContributionAtStart - Whether contribution is made at start or end of period
 * @returns {Object} Object containing labels and datasets for the chart
 */
export function generateChartData(
  principal,
  rate,
  time,
  compoundingFrequency,
  regularContribution = 0,
  isContributionAtStart = false,
  inflationRate = 0
) {
  const years = Array.from({ length: time + 1 }, (_, i) => i);
  const principalData = [];
  const interestData = [];
  const totalData = [];
  const inflationAdjustedData = [];
  
  for (const year of years) {
    if (year === 0) {
      principalData.push(principal);
      interestData.push(0);
      totalData.push(principal);
      inflationAdjustedData.push(principal);
      continue;
    }
    
    // Calculate values for this year
    const result = calculateCompoundInterest(
      principal,
      rate,
      year,
      compoundingFrequency,
      regularContribution,
      isContributionAtStart
    );
    
    // Correctly calculate running principal (original principal + all contributions to date)
    // Each contribution happens at the frequency specified for each year
    const contributionsToDate = regularContribution * compoundingFrequency * year;
    const runningPrincipal = principal + contributionsToDate;
    
    // Store data points
    principalData.push(runningPrincipal);
    interestData.push(result.interestEarned);
    totalData.push(result.futureValue);
    
    // Calculate inflation-adjusted value if inflation rate is provided
    if (inflationRate > 0) {
      const adjustedValue = calculateInflationAdjustedValue(
        result.futureValue,
        inflationRate,
        year
      );
      inflationAdjustedData.push(adjustedValue);
    } else {
      inflationAdjustedData.push(result.futureValue);
    }
  }
  
  return {
    labels: years,
    datasets: [
      {
        label: 'Principal + Contributions',
        data: principalData,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgb(53, 162, 235)',
        borderWidth: 2,
      },
      {
        label: 'Interest Earned',
        data: interestData,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 2,
      },
      {
        label: 'Total Value',
        data: totalData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgb(255, 99, 132)',
        borderWidth: 2,
      },
      {
        label: 'Inflation-Adjusted Value',
        data: inflationAdjustedData,
        backgroundColor: 'rgba(255, 159, 64, 0.5)',
        borderColor: 'rgb(255, 159, 64)',
        borderWidth: 2,
        borderDash: [5, 5],
      }
    ]
  };
}

// Compounding frequency options for the calculator
export const compoundingFrequencies = [
  { label: 'Annually', value: 1 },
  { label: 'Semi-annually', value: 2 },
  { label: 'Quarterly', value: 4 },
  { label: 'Monthly', value: 12 },
  { label: 'Daily', value: 365 }
];

/**
 * Format currency with 2 decimal places
 * @param {number} value - The amount to format
 * @param {string} currencyCode - The currency code (USD, GBP, EUR)
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value, currencyCode = 'USD') {
  const locale = currencyLocales[currencyCode] || 'en-US';
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Format percentage with 2 decimal places
export function formatPercentage(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
}