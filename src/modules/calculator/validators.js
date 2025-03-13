import { createValidator } from '@/modules/core/validators';

/**
 * Validates calculator inputs
 */
export const validateCalculatorInputs = createValidator({}, 'CalculatorInputs');

/**
 * Validates calculator results
 */
export const validateCalculatorResults = createValidator({}, 'CalculatorResults');