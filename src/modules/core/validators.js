import * as Sentry from '@sentry/browser';

/**
 * Creates a validator function for the given schema
 * 
 * @param {Object} schema - Schema to validate against
 * @param {string} contextName - Name of what's being validated (e.g., 'User', 'Order')
 * @returns {function} - Enhanced validator function with additional context options
 */
export const createValidator = (schema, contextName) => {
  /**
   * Validates data against the schema
   * @param {any} data - Data to validate
   * @param {Object} options - Additional validation context
   * @param {string} options.actionName - The specific action/event
   * @param {string} options.location - Where in the code this validation is happening
   * @param {string} options.direction - 'incoming' or 'outgoing' data
   * @param {string} options.moduleFrom - Source module
   * @param {string} options.moduleTo - Target module
   * @returns {any} - The validated data
   */
  return (data, options = {}) => {
    const {
      actionName = 'unknown',
      location = 'unknown',
      direction = 'unknown',
      moduleFrom = 'unknown',
      moduleTo = 'unknown'
    } = options;
    
    try {
      // Basic validation (would use zod in a real implementation)
      if (data === undefined || data === null) {
        throw new Error('Data cannot be undefined or null');
      }
      
      return data;
    } catch (error) {
      // Create full context for error reporting
      const validationContext = {
        type: contextName,
        action: actionName,
        location,
        direction,
        flow: `${moduleFrom} → ${moduleTo}`,
        timestamp: new Date().toISOString()
      };
      
      // Safe version of data for logging
      const safeData = typeof data === 'object' ? 
        JSON.stringify(data, (key, value) => 
          ['password', 'token', 'secret'].includes(key) ? '[REDACTED]' : value
        ) : String(data);
      
      // Format validation errors
      const errorMessage = `Validation failed in ${validationContext.action} (${validationContext.flow})
Location: ${location}
Errors: ${error.message}`;
      
      // Log to console with detailed info
      console.error(errorMessage, '\nReceived:', safeData);
      
      // Send to Sentry with full context
      Sentry.captureException(error, {
        extra: {
          ...validationContext,
          receivedData: safeData,
        },
        tags: {
          validationType: contextName,
          validationAction: actionName,
          validationDirection: direction,
          moduleFlow: `${moduleFrom}-to-${moduleTo}`
        }
      });
      
      // Throw with improved message
      throw new Error(errorMessage);
    }
  };
};