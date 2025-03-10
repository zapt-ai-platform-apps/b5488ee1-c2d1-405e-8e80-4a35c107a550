import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Disclaimer from './Disclaimer';

describe('Disclaimer Component', () => {
  it('renders correctly with default props', () => {
    render(<Disclaimer onClose={() => {}} />);
    
    // Check if the disclaimer content is visible
    expect(screen.getByText('Financial Disclaimer')).toBeInTheDocument();
    expect(screen.getByText(/CompoundInterest.uk is designed for informational and educational purposes only/)).toBeInTheDocument();
    
    // Check if the close button exists
    expect(screen.getByRole('button', { name: /I Understand/i })).toBeInTheDocument();
  });

  it('calls onClose when "I Understand" button is clicked in regular mode', () => {
    const onCloseMock = vi.fn();
    render(<Disclaimer onClose={onCloseMock} />);
    
    // Click the "I Understand" button
    fireEvent.click(screen.getByRole('button', { name: /I Understand/i }));
    
    // Check if onClose was called
    expect(onCloseMock).toHaveBeenCalled();
  });

  it('calls onAgree when "I Understand and Agree" button is clicked in initialAgreement mode', () => {
    const onAgreeMock = vi.fn();
    render(<Disclaimer onAgree={onAgreeMock} initialAgreement={true} />);
    
    // Check for the different button text
    expect(screen.getByRole('button', { name: /I Understand and Agree/i })).toBeInTheDocument();
    
    // Click the agreement button
    fireEvent.click(screen.getByRole('button', { name: /I Understand and Agree/i }));
    
    // Check if onAgree was called
    expect(onAgreeMock).toHaveBeenCalled();
  });

  it('does not show close X button in initialAgreement mode', () => {
    render(<Disclaimer onAgree={() => {}} initialAgreement={true} />);
    
    // The close button should not be visible in initialAgreement mode
    const closeButtons = document.querySelectorAll('svg');
    let closeButtonFound = false;
    
    closeButtons.forEach(button => {
      if (button.innerHTML.includes('M6 18L18 6M6 6l12 12')) {
        closeButtonFound = true;
      }
    });
    
    expect(closeButtonFound).toBe(false);
  });
});