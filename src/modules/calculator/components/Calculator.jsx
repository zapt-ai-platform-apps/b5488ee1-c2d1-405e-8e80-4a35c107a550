import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { 
  calculateCompoundInterest, 
  calculateInflationAdjustedValue, 
  generateChartData,
  compoundingFrequencies,
  formatCurrency,
  formatPercentage,
  formatChartCurrency,
  calculateYAxisRange
} from '../utils';
import { DEFAULT_CURRENCY } from '../constants/currencies';
import CalculatorForm from './CalculatorForm';
import CalculatorResults from './CalculatorResults';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Calculator = () => {
  const [calculatorInputs, setCalculatorInputs] = useState({
    principal: 10000,
    rate: 7,
    time: 10,
    compoundingFrequency: 12, // monthly
    regularContribution: 100,
    isContributionAtStart: false,
    inflationRate: 2.5,
    currency: 'GBP' // Set default to GBP for UK audience
  });

  const [results, setResults] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [yAxisConfig, setYAxisConfig] = useState({ min: 0, max: 50000, stepSize: 10000 });
  const [scenarios, setScenarios] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // Calculate results when inputs change
  useEffect(() => {
    console.log('Calculating compound interest with inputs:', calculatorInputs);
    const { 
      principal, 
      rate, 
      time, 
      compoundingFrequency, 
      regularContribution, 
      isContributionAtStart,
      inflationRate 
    } = calculatorInputs;

    setIsCalculating(true);

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

    // Set results
    setResults({
      ...compoundResults,
      inflationAdjusted
    });

    // Generate chart data
    const data = generateChartData(
      principal,
      rate,
      time,
      compoundingFrequency,
      regularContribution,
      isContributionAtStart,
      inflationRate
    );

    setChartData(data);
    
    // Calculate appropriate Y axis range based on the data
    const { min, max, stepSize } = calculateYAxisRange(data);
    setYAxisConfig({ min, max, stepSize });
    
    setIsCalculating(false);
    console.log('Calculation complete with results:', compoundResults);
  }, [calculatorInputs]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCalculatorInputs(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle form submission
  const handleCalculate = (e) => {
    e.preventDefault();
    // We're already calculating in the useEffect, 
    // but we could add additional logic here if needed
    console.log('Calculate button clicked');
  };

  // Save current scenario for comparison
  const saveScenario = () => {
    const newScenario = {
      id: Date.now(),
      name: `Scenario ${scenarios.length + 1}`,
      inputs: { ...calculatorInputs },
      results: { ...results }
    };
    
    setScenarios([...scenarios, newScenario]);
    console.log('Saved new scenario:', newScenario);
  };

  // Remove a scenario
  const removeScenario = (id) => {
    setScenarios(scenarios.filter(scenario => scenario.id !== id));
    console.log('Removed scenario with id:', id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-blue-800 mb-6">Investment Growth Calculator</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <CalculatorForm 
            inputs={calculatorInputs}
            handleInputChange={handleInputChange}
            handleCalculate={handleCalculate}
            compoundingFrequencies={compoundingFrequencies}
          />
          
          <div className="mt-6">
            <button 
              onClick={saveScenario}
              disabled={isCalculating || !results}
              className={`w-full ${isCalculating || !results ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-2 px-4 rounded-md transition-colors cursor-pointer`}
            >
              Save Scenario for Comparison
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {isCalculating ? (
            <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-t-blue-500 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600">Calculating results...</p>
              </div>
            </div>
          ) : results ? (
            <CalculatorResults 
              results={results}
              inputs={calculatorInputs}
            />
          ) : (
            <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">Enter your values and click Calculate</p>
            </div>
          )}
          
          {chartData && !isCalculating && (
            <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-blue-800 mb-4">Investment Growth Over Time</h3>
              <Line 
                data={chartData}
                options={{
                  responsive: true,
                  scales: {
                    x: {
                      title: {
                        display: true,
                        text: 'Years',
                        font: {
                          size: 14,
                          weight: 'bold'
                        }
                      }
                    },
                    y: {
                      beginAtZero: true,
                      min: yAxisConfig.min,
                      max: yAxisConfig.max,
                      ticks: {
                        stepSize: yAxisConfig.stepSize,
                        callback: (value) => {
                          return formatChartCurrency(value, calculatorInputs.currency);
                        }
                      },
                      title: {
                        display: true,
                        text: `Value (${calculatorInputs.currency})`,
                        font: {
                          size: 14,
                          weight: 'bold'
                        }
                      }
                    }
                  },
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: (context) => {
                          return `${context.dataset.label}: ${formatCurrency(context.parsed.y, calculatorInputs.currency)}`;
                        }
                      }
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
      
      {scenarios.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">Investment Scenario Comparison</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-blue-100">
                <tr>
                  <th className="py-3 px-4 text-left">Scenario</th>
                  <th className="py-3 px-4 text-left">Principal</th>
                  <th className="py-3 px-4 text-left">Rate</th>
                  <th className="py-3 px-4 text-left">Time</th>
                  <th className="py-3 px-4 text-left">Contribution</th>
                  <th className="py-3 px-4 text-left">Future Value</th>
                  <th className="py-3 px-4 text-left">Interest Earned</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scenarios.map((scenario) => (
                  <tr key={scenario.id} className="border-t border-gray-200">
                    <td className="py-3 px-4">{scenario.name}</td>
                    <td className="py-3 px-4">{formatCurrency(scenario.inputs.principal, scenario.inputs.currency)}</td>
                    <td className="py-3 px-4">{formatPercentage(scenario.inputs.rate)}</td>
                    <td className="py-3 px-4">{scenario.inputs.time} years</td>
                    <td className="py-3 px-4">{formatCurrency(scenario.inputs.regularContribution, scenario.inputs.currency)}/month</td>
                    <td className="py-3 px-4 font-semibold">{formatCurrency(scenario.results.futureValue, scenario.inputs.currency)}</td>
                    <td className="py-3 px-4">{formatCurrency(scenario.results.interestEarned, scenario.inputs.currency)}</td>
                    <td className="py-3 px-4">
                      <button 
                        onClick={() => removeScenario(scenario.id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;