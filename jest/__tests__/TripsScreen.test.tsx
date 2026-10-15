/**
 * @format
 */

import React from 'react';
import { Strings } from '../../src/constants';
import { TripsScreen } from '../../src/modules';
import { RenderWrapper } from '../Wrapper';

describe('TripsScreen', () => {
  it('renders planned trips with their dates', () => {
    const { getByText } = RenderWrapper(<TripsScreen />);

    expect(getByText(Strings.Trips.title)).toBeTruthy();
    expect(getByText('2 planned trips')).toBeTruthy();
    expect(getByText('Santorini')).toBeTruthy();
    expect(getByText('12–17 Jun 2027')).toBeTruthy();
    expect(getByText('Kyoto')).toBeTruthy();
    expect(getByText(Strings.Trips.someday)).toBeTruthy();
  });
});
