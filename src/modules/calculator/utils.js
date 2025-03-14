import { currencyLocales } from './constants/currencies';

/**
 * Calculate future value using compound interest formula
 * 
 * @param {number} principal - Initial investment amount
 * @param {number} rate - Annual interest rate (as a percentage, e.g., 5 for 5%)
 * @param {number} time - Time period in years
 * @param {number} compoundingFrequency - Number of times interest compounds per year
 * @param {number} regularContribution - Regular contribution amount
 * @param {boolean} isContributionAtStart - Whether contribution is made at start or end of period
 * @returns {Object} Object containing future value, total contributions, and interest earned
 */
export function calculateCompoundInterest(
  principal,
  rate,
  time,
  compoundingFrequency,
  regularContribution = 0,
  isContributionAtStart = false
) {
  // Ensure numeric values
  principal = Number(principal);
  rate = Number(rate) / 100; // Convert percentage to decimal
  time = Number(time);
  compoundingFrequency = Number(compoundingFrequency);
  regularContribution = Number(regularContribution);

  // Total number of compounding periods
  const totalPeriods = compoundingFrequency * time;
  // Interest rate per compounding period
  const i = rate / compoundingFrequency;
  
  // Calculate future value for the principal
  let futureValue = principal * Math.pow(1 + i, totalPeriods);

  // Calculate future value for regular contributions if any exist
  if (regularContribution > 0) {
    if (isContributionAtStart) {
      // For contributions at the start, they get an extra period of compounding
      futureValue += regularContribution * ((Math.pow(1 + i, totalPeriods) - 1) / i) * (1 + i);
    } else {
      // Standard formula for contributions at the end of each period
      futureValue += regularContribution * ((Math.pow(1 + i, totalPeriods) - 1) / i);
    }
  }

  // Calculate total contributions made over the period
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
 * @param {number} inflationRate - Annual inflation rate (as a percentage)
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
 * @param {number} rate - Annual interest rate (as a percentage)
 * @param {number} time - Time period in years
 * @param {number} compoundingFrequency - Number of times interest compounds per year
 * @param {number} regularContribution - Regular contribution amount
 * @param {boolean} isContributionAtStart - Whether contribution is made at start or end of period
 * @param {number} inflationRate - Annual inflation rate (as a percentage)
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
  const principalOnlyData = []; // Initial principal without contributions
  const principalPlusContributionsData = []; // Principal + all contributions to date
  const interestData = [];
  const totalData = [];
  const inflationAdjustedData = [];
  
  // Convert all inputs to numbers to ensure proper calculation
  principal = Number(principal);
  regularContribution = Number(regularContribution);
  compoundingFrequency = Number(compoundingFrequency);
  
  for (const year of years) {
    if (year === 0) {
      principalOnlyData.push(principal);
      principalPlusContributionsData.push(principal);
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
    
    // Store the original principal for the principal-only line
    principalOnlyData.push(principal);
    
    // Calculate total contributions to date
    const contributionsToDate = regularContribution * compoundingFrequency * year;
    
    // Principal + all contributions to date
    principalPlusContributionsData.push(principal + contributionsToDate);
    
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
        data: principalPlusContributionsData,
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
  // For EUR, use a specific format to ensure test consistency
  if (currencyCode === 'EUR') {
    const formattedNumber = new Intl.NumberFormat('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
    return `${formattedNumber} €`;
  }
  
  const locale = currencyLocales[currencyCode] || 'en-US';
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

/**
 * Format percentage with 2 decimal places
 * @param {number} value - The percentage value (e.g., 50 for 50%)
 * @returns {string} Formatted percentage string
 */
export function formatPercentage(value) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value / 100);
}

/**
 * Format currency values for chart axis labels with consistent unit display
 * @param {number} value - The value to format
 * @param {string} currencyCode - The currency code
 * @returns {string} Formatted value string with appropriate unit (k, M, B)
 */
export function formatChartCurrency(value, currencyCode = 'USD') {
  // Symbol map for currencies
  const currencySymbol = {
    'USD': '$',
    'GBP': '£',
    'EUR': '€'
  }[currencyCode] || '$';
  
  // Get absolute value for formatting
  const absValue = Math.abs(value);
  
  // Format based on the magnitude, but maintain consistent presentation
  if (absValue >= 1000000) {
    // Format as millions
    return `${currencySymbol}${(value / 1000000).toFixed(1)}M`;
  } else if (absValue >= 1000) {
    // Format as thousands
    return `${currencySymbol}${(value / 1000).toFixed(1)}k`;
  } else {
    // Format regular values
    return `${currencySymbol}${value.toFixed(0)}`;
  }
}

/**
 * Calculate a reasonable Y axis range based on the data
 * Ensures consistent scaling when time periods change
 * 
 * @param {Object} chartData - The chart data object
 * @returns {Object} Contains min, max, and stepSize for Y axis
 */
export function calculateYAxisRange(chartData) {
  if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
    return { min: 0, max: 10000, stepSize: 2000 };
  }
  
  // Find the highest value across all datasets
  let maxValue = 0;
  chartData.datasets.forEach(dataset => {
    const datasetMax = Math.max(...dataset.data.filter(val => !isNaN(val) && val !== null));
    if (datasetMax > maxValue) {
      maxValue = datasetMax;
    }
  });
  
  // Add 10% padding to the max value
  const paddedMax = maxValue * 1.1;
  
  // Calculate the magnitude of the max value (10^n)
  const magnitude = Math.pow(10, Math.floor(Math.log10(paddedMax)));
  
  // Calculate the normalized value (value / magnitude)
  const normalized = paddedMax / magnitude;
  
  // Round to a nice number based on the normalized value
  let roundedMax;
  if (normalized <= 1.2) roundedMax = 1 * magnitude;
  else if (normalized <= 2.5) roundedMax = 2.5 * magnitude;
  else if (normalized <= 5) roundedMax = 5 * magnitude;
  else roundedMax = 10 * magnitude;
  
  // Calculate a nice step size (aim for 5-7 steps)
  const stepSize = roundedMax / 5;
  
  return { min: 0, max: roundedMax, stepSize };
}