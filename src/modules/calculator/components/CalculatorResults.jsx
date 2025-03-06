import React from 'react';
import { formatCurrency, formatPercentage } from '../utils';

const CalculatorResults = ({ results, inputs }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-blue-800 mb-4">Results</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500">Future Value</h4>
          <p className="text-2xl font-bold text-blue-700">{formatCurrency(results.futureValue)}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500">Total Interest Earned</h4>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(results.interestEarned)}</p>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500">Total Contributions</h4>
          <p className="text-2xl font-bold text-purple-700">{formatCurrency(results.totalContributions)}</p>
        </div>
        
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500">Inflation-Adjusted Value</h4>
          <p className="text-2xl font-bold text-yellow-700">{formatCurrency(results.inflationAdjusted)}</p>
        </div>
      </div>
      
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-2">Details</h4>
        <ul className="text-gray-700 space-y-2">
          <li>
            <span className="font-medium">Initial Investment:</span> {formatCurrency(inputs.principal)}
          </li>
          <li>
            <span className="font-medium">Interest Rate:</span> {formatPercentage(inputs.rate)}
          </li>
          <li>
            <span className="font-medium">Time Period:</span> {inputs.time} years
          </li>
          <li>
            <span className="font-medium">Compounding:</span> {
              inputs.compoundingFrequency === 1 ? 'Annually' :
              inputs.compoundingFrequency === 2 ? 'Semi-annually' :
              inputs.compoundingFrequency === 4 ? 'Quarterly' :
              inputs.compoundingFrequency === 12 ? 'Monthly' :
              'Daily'
            }
          </li>
          {inputs.regularContribution > 0 && (
            <li>
              <span className="font-medium">Regular Contribution:</span> {formatCurrency(inputs.regularContribution)} 
              {inputs.isContributionAtStart ? ' (beginning of period)' : ' (end of period)'}
            </li>
          )}
          {inputs.inflationRate > 0 && (
            <li>
              <span className="font-medium">Inflation Rate:</span> {formatPercentage(inputs.inflationRate)}
            </li>
          )}
        </ul>
      </div>
      
      <div className="mt-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-2">Summary</h4>
        <p className="text-gray-700">
          By investing {formatCurrency(inputs.principal)} with an annual interest rate of {formatPercentage(inputs.rate)} 
          compounded {
            inputs.compoundingFrequency === 1 ? 'annually' :
            inputs.compoundingFrequency === 2 ? 'semi-annually' :
            inputs.compoundingFrequency === 4 ? 'quarterly' :
            inputs.compoundingFrequency === 12 ? 'monthly' :
            'daily'
          }, and
          {inputs.regularContribution > 0 ? ` adding ${formatCurrency(inputs.regularContribution)} ${inputs.compoundingFrequency === 12 ? 'per month' : 'per period'},` : ''} 
          you'll have {formatCurrency(results.futureValue)} after {inputs.time} years.
        </p>
        {inputs.inflationRate > 0 && (
          <p className="text-gray-700 mt-2">
            When adjusted for inflation ({formatPercentage(inputs.inflationRate)} annually), your investment will be worth {formatCurrency(results.inflationAdjusted)} in today's money.
          </p>
        )}
      </div>
    </div>
  );
};

export default CalculatorResults;