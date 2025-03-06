import { describe, it, expect } from 'vitest';
import { 
  calculateCompoundInterest, 
  formatCurrency, 
  generateChartData 
} from '../utils';

describe('Calculator Utilities', () => {
  describe('calculateCompoundInterest', () => {
    it('calculates compound interest correctly without contributions', () => {
      const result = calculateCompoundInterest(1000, 5, 10, 1, 0, false);
      expect(result.futureValue).toBeCloseTo(1628.89, 1);
      expect(result.interestEarned).toBeCloseTo(628.89, 1);
      expect(result.totalContributions).toBe(1000);
    });

    it('calculates compound interest correctly with contributions at end', () => {
      const result = calculateCompoundInterest(1000, 5, 10, 12, 100, false);
      expect(result.futureValue).toBeCloseTo(16378.93, 1);
      expect(result.totalContributions).toBe(13000);
      expect(result.interestEarned).toBeCloseTo(3378.93, 1);
    });
  });

  describe('formatCurrency', () => {
    it('formats USD correctly', () => {
      expect(formatCurrency(1234.56, 'USD')).toBe('$1,234.56');
    });

    it('formats GBP correctly', () => {
      expect(formatCurrency(1234.56, 'GBP')).toBe('£1,234.56');
    });

    it('formats EUR correctly', () => {
      expect(formatCurrency(1234.56, 'EUR')).toBe('1.234,56 €');
    });
  });

  describe('generateChartData', () => {
    it('generates correct chart data points for principal + contributions', () => {
      const principal = 1000;
      const regularContribution = 100;
      const compoundingFrequency = 12; // monthly
      const time = 2; // years
      
      const chartData = generateChartData(
        principal,
        5,
        time,
        compoundingFrequency,
        regularContribution,
        false
      );
      
      // Check if there are time + 1 data points (including year 0)
      expect(chartData.labels.length).toBe(time + 1);
      expect(chartData.datasets[0].data.length).toBe(time + 1);
      
      // Check principal + contributions for year 0
      expect(chartData.datasets[0].data[0]).toBe(principal);
      
      // Check principal + contributions for year 1
      // Should be principal + (12 months * monthly contribution)
      expect(chartData.datasets[0].data[1]).toBe(principal + (regularContribution * compoundingFrequency * 1));
      
      // Check principal + contributions for year 2
      // Should be principal + (24 months * monthly contribution)
      expect(chartData.datasets[0].data[2]).toBe(principal + (regularContribution * compoundingFrequency * 2));
    });
  });
});