/**
 * @format
 */

import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Strings } from '../../src/constants';
import { ExploreScreen } from '../../src/modules';
import { DestinationCategory } from '../../src/types';
import { RenderWrapper } from '../Wrapper';

describe('ExploreScreen', () => {
  it('renders the header, sections, and destinations', () => {
    const { getByText } = RenderWrapper(<ExploreScreen />);

    expect(getByText(Strings.Explore.title)).toBeTruthy();
    expect(getByText(Strings.Explore.popularThisWeek)).toBeTruthy();
    expect(getByText(Strings.Explore.weekendEscapes)).toBeTruthy();
    expect(getByText('Santorini')).toBeTruthy();
    expect(getByText('Lago di Braies')).toBeTruthy();
    expect(getByText('Italy · from $420')).toBeTruthy();
  });

  it('filters destinations by category', () => {
    const { getByTestId, getByText, queryByText } = RenderWrapper(<ExploreScreen />);

    fireEvent.press(getByTestId(`category-list-${DestinationCategory.Cities}`));

    expect(getByText('Kyoto')).toBeTruthy();
    expect(getByText('Porto')).toBeTruthy();
    expect(queryByText('Santorini')).toBeNull();
    expect(queryByText('Zermatt')).toBeNull();
  });

  it('filters by search and shows the empty state when nothing matches', () => {
    const { getByTestId, getByText, queryByText } = RenderWrapper(<ExploreScreen />);

    fireEvent.changeText(getByTestId('explore-search'), 'portugal');
    expect(getByText('Porto')).toBeTruthy();
    expect(queryByText('Kyoto')).toBeNull();
    expect(queryByText(Strings.Explore.popularThisWeek)).toBeNull();

    fireEvent.changeText(getByTestId('explore-search'), 'atlantis');
    expect(getByText(Strings.Explore.noResultsTitle)).toBeTruthy();

    fireEvent.press(getByTestId('explore-search-clear'));
    expect(getByText('Santorini')).toBeTruthy();
  });

  it('toggles a destination favorite', () => {
    const { getByTestId } = RenderWrapper(<ExploreScreen />);
    const favorite = getByTestId('destination-card-santorini-favorite');

    expect(favorite.props.accessibilityState).toEqual({ selected: false });
    fireEvent.press(favorite);
    expect(getByTestId('destination-card-santorini-favorite').props.accessibilityState).toEqual({
      selected: true
    });
  });
});
