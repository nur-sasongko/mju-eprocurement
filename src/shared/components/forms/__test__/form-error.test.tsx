import React from 'react';
import { render, screen } from '@testing-library/react';
import FormError from '../form-error';

describe('FormError', () => {
  it('renders the error message', () => {
    render(<FormError message="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('applies the correct styles', () => {
    render(<FormError message="Another error" />);
    const div = screen.getByText('Another error');
    expect(div).toHaveClass('bg-red-100');
    expect(div).toHaveClass('text-red-700');
    expect(div).toHaveClass('p-2');
    expect(div).toHaveClass('text-sm');
    expect(div).toHaveClass('rounded');
  });
});
