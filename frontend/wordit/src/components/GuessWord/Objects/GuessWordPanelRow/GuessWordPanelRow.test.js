import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import GuessWordPanelRow from './GuessWordPanelRow';

describe('<GuessWordPanelRow />', () => {
  test('it should mount', () => {
    render(<GuessWordPanelRow />);
    
    const guessWordPanelRow = screen.getByTestId('GuessWordPanelRow');

    expect(guessWordPanelRow).toBeInTheDocument();
  });
});