import React from 'react';
import { api } from '../api';
import { eventBus } from '@/modules/core/events';
import { events } from '../events';

const EducationSection = ({ onNavigateToCalculator }) => {
  const { intro, applications, principles } = api.getEducationalContent();

  const handleNavigateToCalculator = () => {
    // Emit event to navigate to calculator
    eventBus.publish(events.NAVIGATE_TO_CALCULATOR, {});
    
    // Also call the callback if provided
    if (onNavigateToCalculator) {
      onNavigateToCalculator();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">{intro.title}</h1>
        <p className="text-gray-700 text-lg mb-6">{intro.description}</p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">How to Calculate Compound Interest</h3>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="bg-white p-3 rounded-lg shadow-sm text-xl font-mono mb-4 md:mb-0 md:mr-6">
              {intro.formula}
            </div>
            <p className="text-gray-700">{intro.formulaExplanation}</p>
          </div>
          <p className="text-gray-700 mt-2">
            This compound interest formula is the foundation for understanding how your investments can grow over time. Our investment calculator uses this formula to give you accurate projections for your future wealth.
          </p>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">How Compound Interest Powers Your Financial Growth</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((card) => (
            <div key={card.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">{card.title}</h3>
              <p className="text-gray-700 mb-4">{card.description}</p>
              <p className="text-sm text-gray-600 italic">{card.example}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Maximizing Your Investment Returns</h2>
        <p className="text-gray-700 mb-6">
          Understanding how compound interest works is essential for building long-term wealth through investments, savings, and retirement planning. The following principles will help you maximize the potential of your investment growth over time.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {principles.map((principle) => (
            <div key={principle.id} className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{principle.title}</h3>
              <p className="text-gray-700">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Why Use CompoundInterest.uk?</h2>
        <p className="text-gray-700 mb-4">
          Our free compound interest calculator helps you make informed financial decisions by showing exactly how your investments can grow over time. Whether you're planning for retirement, saving for a major purchase, or building wealth for the future, our tools provide the insights you need.
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
          <li>Calculate future investment value with regular contributions</li>
          <li>See how inflation affects your purchasing power</li>
          <li>Compare different investment scenarios side by side</li>
          <li>Visualize your wealth growth with interactive charts</li>
          <li>Understand the impact of different interest rates and compounding frequencies</li>
          <li>Plan for retirement with greater confidence</li>
        </ul>
        <p className="text-gray-700">
          Ready to see how your investments can grow? Try our{' '}
          <span 
            onClick={handleNavigateToCalculator} 
            className="font-semibold text-blue-700 cursor-pointer hover:underline"
          >
            compound interest calculator
          </span>{' '}
          now.
        </p>
      </div>
    </div>
  );
};

export default EducationSection;