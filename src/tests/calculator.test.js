import { describe, it, expect } from 'vitest';
import { 
  calculateCompoundInterest, 
  formatCurrency, 
  generateChartData,
  formatChartCurrency,
  calculateYAxisRange
} from '@/modules/calculator/internal/utils';

describe('Calculator Utilities', () => {
  describe('calculateCompoundInterest', () => {
    it('calculates compound interest correctly without contributions', () => {
      const result = calculateCompoundInterest(1000, 5, 10, 1, 0, false);
      expect(result.futureValue).toBeCloseTo(1628.89, 2);
      expect(result.interestEarned).toBeCloseTo(628.89, 2);
      expect(result.totalContributions).toBe(1000);
    });

    it('calculates compound interest correctly with contributions at end', () => {
      const result = calculateCompoundInterest(1000, 5, 10, 12, 100, false);
      expect(result.futureValue).toBeCloseTo(17175.24, 2);
      expect(result.totalContributions).toBe(13000);
      expect(result.interestEarned).toBeCloseTo(4175.24, 2);
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

  describe('formatChartCurrency', () => {
    it('formats small numbers without suffix', () => {
      expect(formatChartCurrency(123, 'USD')).toBe('$123');
      expect(formatChartCurrency(999, 'GBP')).toBe('£999');
    });

    it('formats thousands with k suffix', () => {
      expect(formatChartCurrency(1234, 'USD')).toBe('$1.2k');
      expect(formatChartCurrency(56789, 'GBP')).toBe('£56.8k');
    });

    it('formats millions with M suffix', () => {
      expect(formatChartCurrency(1234567, 'USD')).toBe('$1.2M');
      expect(formatChartCurrency(56789012, 'GBP')).toBe('£56.8M');
    });
  });

  describe('calculateYAxisRange', () => {
    it('returns default values for empty chart data', () => {
      const result = calculateYAxisRange(null);
      expect(result.min).toBe(0);
      expect(result.max).toBe(10000);
      expect(result.stepSize).toBe(2000);
    });

    it('calculates appropriate range for small values', () => {
      const chartData = {
        datasets: [
          { data: [100, 200, 300, 400, 500] }
        ]
      };
      const result = calculateYAxisRange(chartData);
      expect(result.min).toBe(0);
      expect(result.max).toBe(1000);
    });

    it('calculates appropriate range for medium values', () => {
      const chartData = {
        datasets: [
          { data: [1000, 2000, 5000, 8000] }
        ]
      };
      const result = calculateYAxisRange(chartData);
      expect(result.min).toBe(0);
      expect(result.max).toBeGreaterThanOrEqual(8000);
    });

    it('calculates appropriate range for large values in thousands', () => {
      const chartData = {
        datasets: [
          { data: [10000, 20000, 50000, 90000] }
        ]
      };
      const result = calculateYAxisRange(chartData);
      expect(result.min).toBe(0);
      expect(result.max).toBeGreaterThanOrEqual(90000);
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
    
    it('respects the time period specified by the user', () => {
      // Test with 5 years
      const chartData5 = generateChartData(1000, 5, 5, 12, 100, false);
      expect(chartData5.labels.length).toBe(6); // 0, 1, 2, 3, 4, 5
      expect(chartData5.labels[5]).toBe(5);
      
      // Test with 8 years
      const chartData8 = generateChartData(1000, 5, 8, 12, 100, false);
      expect(chartData8.labels.length).toBe(9); // 0, 1, 2, 3, 4, 5, 6, 7, 8
      expect(chartData8.labels[8]).toBe(8);
      
      // Test with 15 years
      const chartData15 = generateChartData(1000, 5, 15, 12, 100, false);
      expect(chartData15.labels.length).toBe(16); // 0 through 15
      expect(chartData15.labels[15]).toBe(15);
    });
    
    it('handles invalid time periods gracefully', () => {
      // Test with zero years (should default to 1)
      const chartData0 = generateChartData(1000, 5, 0, 12, 100, false);
      expect(chartData0.labels.length).toBe(2); // 0, 1
      
      // Test with negative years (should default to 1)
      const chartDataNeg = generateChartData(1000, 5, -2, 12, 100, false);
      expect(chartDataNeg.labels.length).toBe(2); // 0, 1
      
      // Test with non-numeric input (should default to 1)
      const chartDataNaN = generateChartData(1000, 5, 'abc', 12, 100, false);
      expect(chartDataNaN.labels.length).toBe(2); // 0, 1
    });
  });
});