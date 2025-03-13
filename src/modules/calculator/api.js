import { calculateCompoundInterest, calculateInflationAdjustedValue, generateChartData } from './internal/utils';
import { validateCalculatorInputs, validateCalculatorResults } from './validators';

export const api = {
  /**
   * Calculate compound interest
   * 
   * @param {Object} inputs - Calculator inputs
   * @returns {Object} Calculator results
   */
  calculateCompoundInterest(inputs) {
    const validInputs = validateCalculatorInputs(inputs, {
      actionName: 'calculateCompoundInterest',
      location: 'calculator/api.js',
      direction: 'incoming',
      moduleFrom: 'client',
      moduleTo: 'calculator'
    });

    const { 
      principal, 
      rate, 
      time, 
      compoundingFrequency, 
      regularContribution, 
      isContributionAtStart,
      inflationRate 
    } = validInputs;

    // Calculate compound interest
    const compoundResults = calculateCompoundInterest(
      principal,
      rate,
      time,
      compoundingFrequency,
      regularContribution,
      isContributionAtStart
    );

    // Calculate inflation-adjusted value
    const inflationAdjusted = calculateInflationAdjustedValue(
      compoundResults.futureValue,
      inflationRate,
      time
    );

    const results = {
      ...compoundResults,
      inflationAdjusted
    };

    return validateCalculatorResults(results, {
      actionName: 'calculateCompoundInterest',
      location: 'calculator/api.js',
      direction: 'outgoing',
      moduleFrom: 'calculator',
      moduleTo: 'client'
    });
  },

  /**
   * Generate chart data for compound interest growth
   * 
   * @param {Object} inputs - Calculator inputs
   * @returns {Object} Chart data
   */
  generateChartData(inputs) {
    const validInputs = validateCalculatorInputs(inputs, {
      actionName: 'generateChartData',
      location: 'calculator/api.js',
      direction: 'incoming',
      moduleFrom: 'client',
      moduleTo: 'calculator'
    });

    const { 
      principal, 
      rate, 
      time, 
      compoundingFrequency, 
      regularContribution, 
      isContributionAtStart,
      inflationRate 
    } = validInputs;

    return generateChartData(
      principal,
      rate,
      time,
      compoundingFrequency,
      regularContribution,
      isContributionAtStart,
      inflationRate
    );
  }
};