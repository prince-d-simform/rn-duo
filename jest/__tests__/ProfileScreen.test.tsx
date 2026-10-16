/**
 * @format
 */

import { fireEvent } from '@testing-library/react-native';
import React from 'react';
import { Strings } from '../../src/constants';
import { ProfileScreen } from '../../src/modules';
import { AuthActions } from '../../src/redux';
import { RenderWrapper } from '../Wrapper';

describe('ProfileScreen', () => {
  it('renders the profile, stats, and settings', () => {
    const { getByText } = RenderWrapper(<ProfileScreen />);

    expect(getByText('AM')).toBeTruthy();
    expect(getByText('Ava Moreno')).toBeTruthy();
    expect(getByText('Exploring since 2021')).toBeTruthy();
    expect(getByText('14')).toBeTruthy();
    expect(getByText('countries')).toBeTruthy();
    expect(getByText(Strings.Profile.currency)).toBeTruthy();
    expect(getByText('USD')).toBeTruthy();
    expect(getByText(Strings.Profile.btnSignOut)).toBeTruthy();
  });

  it('signs the user out', () => {
    // CustomButton debounces presses with a timer
    jest.useFakeTimers();
    const { getByTestId, store } = RenderWrapper(<ProfileScreen />);
    store.dispatch(AuthActions.setLoggedIn(true));

    fireEvent.press(getByTestId('profile-sign-out'));

    expect(store.getState().auth.isLoggedIn).toBe(false);
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
