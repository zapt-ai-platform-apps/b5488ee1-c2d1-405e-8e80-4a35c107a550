import { eventBus } from './core/events';
import { events as educationEvents } from './education/events';
import { events as calculatorEvents } from './calculator/events';

/**
 * Initialize all modules
 */
export function initializeModules() {
  // Set up event listeners between modules
  setupEventListeners();
  
  // Additional initialization logic can go here
  console.log('All modules initialized');
}

/**
 * Set up cross-module event listeners
 */
function setupEventListeners() {
  // Listen for navigation events from education module
  eventBus.subscribe(educationEvents.NAVIGATE_TO_CALCULATOR, () => {
    console.log('Navigation event received: Navigate to calculator');
  });
  
  // Listen for calculator events
  eventBus.subscribe(calculatorEvents.CALCULATION_COMPLETED, (data) => {
    console.log('Calculation completed event received:', data);
  });
  
  eventBus.subscribe(calculatorEvents.SCENARIO_SAVED, (scenario) => {
    console.log('Scenario saved:', scenario);
  });
  
  eventBus.subscribe(calculatorEvents.SCENARIO_REMOVED, (scenario) => {
    console.log('Scenario removed:', scenario);
  });
}