import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GuessWordPlay from './GuessWordPlay';

describe('<GuessWordPlay />', () => {
  test('it should mount', () => {
    render(<GuessWordPlay />);
    
    const guessWordPlay = screen.getByTestId('GuessWordPlay');

    expect(guessWordPlay).toBeInTheDocument();
  });
});