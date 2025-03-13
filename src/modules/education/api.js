import { introContent, applicationCards, keyPrinciples } from './internal/data';
import { validateEducationContent } from './validators';

export const api = {
  /**
   * Get educational content about compound interest
   * 
   * @returns {Object} Educational content
   */
  getEducationalContent() {
    const content = {
      intro: introContent,
      applications: applicationCards,
      principles: keyPrinciples
    };

    return validateEducationContent(content, {
      actionName: 'getEducationalContent',
      location: 'education/api.js',
      direction: 'outgoing',
      moduleFrom: 'education',
      moduleTo: 'client'
    });
  }
};