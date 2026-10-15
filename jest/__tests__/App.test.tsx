/**
 * @format
 */

import React from 'react';
import App from '../../src/App';
import { Strings } from '../../src/constants';
import { RenderWrapper } from '../Wrapper';

describe('App', () => {
  it('should render the sign in screen when logged out', async () => {
    const { findByText } = RenderWrapper(<App />);

    // Navigation resolves the initial deep link asynchronously before rendering
    expect(await findByText(Strings.Auth.signInTitle)).toBeTruthy();
  }, 10000);
});
