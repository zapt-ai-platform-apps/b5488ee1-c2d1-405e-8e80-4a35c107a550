import React, { useState, useEffect } from 'react';
import EducationSection from './modules/education/components/EducationSection';
import Calculator from './modules/calculator/components/Calculator';
import Disclaimer from './components/Disclaimer';

export default function App() {
  const [activeTab, setActiveTab] = useState('education');
  const [hasAgreedToDisclaimer, setHasAgreedToDisclaimer] = useState(false);

  // Show disclaimer when app first loads
  useEffect(() => {
    // We could check localStorage here if we wanted to persist the agreement
    // For now, we'll just show it every time the app loads
  }, []);

  const navigateToCalculator = () => {
    setActiveTab('calculator');
  };

  const handleDisclaimerAgreement = () => {
    setHasAgreedToDisclaimer(true);
  };

  // Show the disclaimer first if the user hasn't agreed to it
  if (!hasAgreedToDisclaimer) {
    return <Disclaimer onAgree={handleDisclaimerAgreement} initialAgreement={true} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <header className="bg-blue-700 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">CompoundInterest.uk</h1>
          <p className="text-blue-100">Calculate how your investments grow over time</p>
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
        {activeTab === 'education' && <EducationSection onNavigateToCalculator={navigateToCalculator} />}
        {activeTab === 'calculator' && <Calculator />}
      </main>
      
      <footer className="bg-blue-800 text-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div className="mb-4 md:mb-0">
              <p>CompoundInterest.uk</p>
              <p className="text-sm text-blue-300">Free investment growth calculator</p>
              <p className="text-sm text-blue-300 mt-1">© 2025 CompoundInterest.uk. All rights reserved.</p>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white mb-2">
                Made on ZAPT
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}