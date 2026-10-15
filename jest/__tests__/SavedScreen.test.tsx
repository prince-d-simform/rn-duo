/**
 * @format
 */

import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Strings } from '../../src/constants';
import { SavedScreen } from '../../src/modules';
import { RenderWrapper } from '../Wrapper';

describe('SavedScreen', () => {
  it('renders the summary, filters, and saved places', () => {
    const { getByText } = RenderWrapper(<SavedScreen />);

    expect(getByText(Strings.Saved.title)).toBeTruthy();
    expect(getByText('5 places · 2 collections')).toBeTruthy();
    expect(getByText(Strings.Saved.allPlaces)).toBeTruthy();
    expect(getByText('Summer 2027')).toBeTruthy();
    ['Kyoto', 'Lago di Braies', 'Bali', 'Porto', 'Zermatt'].forEach((name: string) =>
      expect(getByText(name)).toBeTruthy()
    );
  });

  it('filters by collection', () => {
    const { getByTestId, getByText, queryByText } = RenderWrapper(<SavedScreen />);

    fireEvent.press(getByTestId('saved-filters-someday'));

    expect(getByText('Kyoto')).toBeTruthy();
    expect(getByText('Zermatt')).toBeTruthy();
    expect(queryByText('Porto')).toBeNull();
  });

  it('removes a place when its heart is pressed', () => {
    const { getByTestId, getByText, queryByText } = RenderWrapper(<SavedScreen />);

    fireEvent.press(getByTestId('saved-filters-all'));
    fireEvent.press(getByTestId('saved-card-porto-favorite'));

    expect(queryByText('Porto')).toBeNull();
    expect(getByText('4 places · 2 collections')).toBeTruthy();
  });
});
