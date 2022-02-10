import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Scoreboard from './Scoreboard';

describe('<Scoreboard />', () => {
  test('it should mount', () => {
    render(<Scoreboard />);
    
    const scoreboard = screen.getByTestId('Scoreboard');

    expect(scoreboard).toBeInTheDocument();
  });
});