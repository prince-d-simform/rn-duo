/**
 * @format
 */

import { useRoute } from '@react-navigation/native';
import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Strings } from '../../src/constants';
import { DetailsScreen } from '../../src/modules';
import { RenderWrapper } from '../Wrapper';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useRoute: jest.fn()
}));

const mockedUseRoute = useRoute as jest.Mock;

describe('DetailsScreen', () => {
  it('renders the destination content and the pinned footer', () => {
    mockedUseRoute.mockReturnValue({ params: { destinationId: 'santorini' } });
    const { getByText } = RenderWrapper(<DetailsScreen />);

    expect(getByText('Santorini')).toBeTruthy();
    expect(getByText('Greece · Cyclades')).toBeTruthy();
    expect(getByText('1,204 reviews')).toBeTruthy();
    expect(getByText('Best May–Oct')).toBeTruthy();
    expect(getByText('Oia sunset')).toBeTruthy();
    expect(getByText(Strings.Details.topExperiences)).toBeTruthy();
    expect(getByText('Caldera sailing')).toBeTruthy();
    expect(getByText('$890')).toBeTruthy();
    expect(getByText('5 nights')).toBeTruthy();
    expect(getByText(Strings.Details.btnPlanTrip)).toBeTruthy();
  });

  it('toggles the saved state from the footer', () => {
    mockedUseRoute.mockReturnValue({ params: { destinationId: 'bali' } });
    const { getByTestId } = RenderWrapper(<DetailsScreen />);

    // Bali is saved by default
    expect(getByTestId('details-footer-favorite').props.accessibilityState).toEqual({
      selected: true
    });
    fireEvent.press(getByTestId('details-footer-favorite'));
    expect(getByTestId('details-footer-favorite').props.accessibilityState).toEqual({
      selected: false
    });
  });

  it('shows a not-found state for an unknown destination', () => {
    mockedUseRoute.mockReturnValue({ params: { destinationId: 'atlantis' } });
    const { getByText, getByTestId } = RenderWrapper(<DetailsScreen />);

    expect(getByText(Strings.Details.notFoundTitle)).toBeTruthy();
    expect(getByTestId('details-not-found-back')).toBeTruthy();
  });
});
