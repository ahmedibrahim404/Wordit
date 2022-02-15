import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateContestForm from './CreateContestForm';

describe('<CreateContestForm />', () => {
  test('it should mount', () => {
    render(<CreateContestForm />);
    
    const createContestForm = screen.getByTestId('CreateContestForm');

    expect(createContestForm).toBeInTheDocument();
  });
});