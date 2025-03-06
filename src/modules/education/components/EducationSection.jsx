import React from 'react';
import { introContent, applicationCards, keyPrinciples } from '../data';

const EducationSection = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">{introContent.title}</h1>
        <p className="text-gray-700 text-lg mb-6">{introContent.description}</p>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">The Formula</h3>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <div className="bg-white p-3 rounded-lg shadow-sm text-xl font-mono mb-4 md:mb-0 md:mr-6">
              {introContent.formula}
            </div>
            <p className="text-gray-700">{introContent.formulaExplanation}</p>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Applications of Compound Interest</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applicationCards.map((card) => (
            <div key={card.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-blue-700 mb-3">{card.title}</h3>
              <p className="text-gray-700 mb-4">{card.description}</p>
              <p className="text-sm text-gray-600 italic">{card.example}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-blue-800 mb-6">Key Principles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {keyPrinciples.map((principle) => (
            <div key={principle.id} className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">{principle.title}</h3>
              <p className="text-gray-700">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EducationSection;