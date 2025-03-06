import React from 'react';

const CalculatorForm = ({ 
  inputs, 
  handleInputChange, 
  handleCalculate,
  compoundingFrequencies
}) => {
  return (
    <form onSubmit={handleCalculate} className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <label htmlFor="principal" className="block text-sm font-medium text-gray-700 mb-1">
          Initial Investment ($)
        </label>
        <input
          type="number"
          id="principal"
          name="principal"
          value={inputs.principal}
          onChange={handleInputChange}
          min="0"
          step="100"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 box-border"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="rate" className="block text-sm font-medium text-gray-700 mb-1">
          Annual Interest Rate (%)
        </label>
        <input
          type="number"
          id="rate"
          name="rate"
          value={inputs.rate}
          onChange={handleInputChange}
          min="0"
          step="0.1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 box-border"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
          Time Period (Years)
        </label>
        <input
          type="number"
          id="time"
          name="time"
          value={inputs.time}
          onChange={handleInputChange}
          min="1"
          max="100"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 box-border"
          required
        />
      </div>

      <div className="mb-4">
        <label htmlFor="compoundingFrequency" className="block text-sm font-medium text-gray-700 mb-1">
          Compounding Frequency
        </label>
        <select
          id="compoundingFrequency"
          name="compoundingFrequency"
          value={inputs.compoundingFrequency}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 box-border"
        >
          {compoundingFrequencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="regularContribution" className="block text-sm font-medium text-gray-700 mb-1">
          Regular Contribution ($)
        </label>
        <input
          type="number"
          id="regularContribution"
          name="regularContribution"
          value={inputs.regularContribution}
          onChange={handleInputChange}
          min="0"
          step="10"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 box-border"
        />
      </div>

      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isContributionAtStart"
            name="isContributionAtStart"
            checked={inputs.isContributionAtStart}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isContributionAtStart" className="ml-2 block text-sm text-gray-700">
            Contribution at beginning of period
          </label>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="inflationRate" className="block text-sm font-medium text-gray-700 mb-1">
          Inflation Rate (%)
        </label>
        <input
          type="number"
          id="inflationRate"
          name="inflationRate"
          value={inputs.inflationRate}
          onChange={handleInputChange}
          min="0"
          step="0.1"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 box-border"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Calculate
      </button>
    </form>
  );
};

export default CalculatorForm;