import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import JoinContestForm from './JoinContestForm';

describe('<JoinContestForm />', () => {
  test('it should mount', () => {
    render(<JoinContestForm />);
    
    const joinContestForm = screen.getByTestId('JoinContestForm');

    expect(joinContestForm).toBeInTheDocument();
  });
});