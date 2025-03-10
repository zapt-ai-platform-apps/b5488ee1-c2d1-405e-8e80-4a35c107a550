import React from 'react';

const Disclaimer = ({ onClose, onAgree, initialAgreement = false }) => {
  const handleAgree = () => {
    if (initialAgreement && onAgree) {
      onAgree();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-blue-800">Financial Disclaimer</h3>
            {!initialAgreement && (
              <button 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="text-gray-700 space-y-4">
            <p>
              CompoundInterest.uk is designed for informational and educational purposes only. While we strive for accuracy and reliability, the calculations and content may be incomplete, inaccurate, or not applicable to your specific financial situation. Users must exercise their own judgment and verify all output before acting upon it.
            </p>
            
            <p className="font-medium">By using this application, you acknowledge and agree that:</p>
            
            <ol className="list-decimal pl-6 space-y-2">
              <li>The calculator and educational content are not a substitute for professional financial advice. For personalized investment guidance, please consult a qualified financial advisor.</li>
              <li>Investment returns are never guaranteed. Past performance is not indicative of future results, and actual returns may vary significantly from the calculations shown.</li>
              <li>You are solely responsible for reviewing, verifying, and validating any output before relying on it for decision-making.</li>
              <li>The developers and providers of CompoundInterest.uk are not liable for any errors, omissions, or consequences arising from the use or reliance on the calculator results or educational content.</li>
            </ol>
            
            <p>
              For precise financial guidance specific to your situation, please consult a qualified financial professional.
            </p>
          </div>
        </div>
        
        <div className="bg-gray-100 px-6 py-4 rounded-b-lg">
          <button
            onClick={handleAgree}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
          >
            {initialAgreement ? "I Understand and Agree" : "I Understand"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;