/**
 * Available currency options for the calculator
 */
export const currencies = [
  { code: 'USD', symbol: '$', label: 'USD ($)' },
  { code: 'GBP', symbol: '£', label: 'GBP (£)' },
  { code: 'EUR', symbol: '€', label: 'EUR (€)' }
];

/**
 * Default currency code
 */
export const DEFAULT_CURRENCY = 'USD';

/**
 * Map of currency codes to locale strings
 */
export const currencyLocales = {
  'USD': 'en-US',
  'GBP': 'en-GB',
  'EUR': 'de-DE'
};