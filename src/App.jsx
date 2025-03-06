import React, { useState } from 'react';
import EducationSection from './modules/education/components/EducationSection';
import Calculator from './modules/calculator/components/Calculator';

export default function App() {
  const [activeTab, setActiveTab] = useState('education');

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-blue-700 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Compound Interest</h1>
          <p className="text-blue-100">Learn and calculate the power of compound interest</p>
        </div>
      </header>
      
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('education')}
              className={`py-4 px-6 focus:outline-none ${
                activeTab === 'education' 
                  ? 'text-blue-700 border-b-2 border-blue-700 font-medium' 
                  : 'text-gray-600 hover:text-blue-700'
              } cursor-pointer`}
            >
              Education
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`py-4 px-6 focus:outline-none ${
                activeTab === 'calculator' 
                  ? 'text-blue-700 border-b-2 border-blue-700 font-medium' 
                  : 'text-gray-600 hover:text-blue-700'
              } cursor-pointer`}
            >
              Calculator
            </button>
          </div>
        </div>
      </nav>
      
      <main className="container mx-auto py-8">
        {activeTab === 'education' && <EducationSection />}
        {activeTab === 'calculator' && <Calculator />}
      </main>
      
      <footer className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>Compound Interest</p>
              <p className="text-sm text-blue-300">A powerful tool for financial planning</p>
            </div>
            <div className="text-sm">
              <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white">
                Made on ZAPT
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}