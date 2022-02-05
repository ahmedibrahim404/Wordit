import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GuessWordHome from './GuessWordHome';

describe('<GuessWordHome />', () => {
  test('it should mount', () => {
    render(<GuessWordHome />);
    
    const guessWordHome = screen.getByTestId('GuessWordHome');

    expect(guessWordHome).toBeInTheDocument();
  });
});