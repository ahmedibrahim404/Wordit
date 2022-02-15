import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GuessWordPanel from './GuessWordPanel';

describe('<GuessWordPanel />', () => {
  test('it should mount', () => {
    render(<GuessWordPanel />);
    
    const guessWordPanel = screen.getByTestId('GuessWordPanel');

    expect(guessWordPanel).toBeInTheDocument();
  });
});