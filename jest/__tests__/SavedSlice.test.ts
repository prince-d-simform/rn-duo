import { SavedActions, SavedReducer } from '../../src/redux';
import { formatDateRange } from '../../src/utils';

describe('SavedSlice', () => {
  it('adds and removes a destination', () => {
    const initial = { destinationIds: ['kyoto'], isLoading: false };

    const added = SavedReducer(initial, SavedActions.toggleSaved('porto'));
    expect(added.destinationIds).toEqual(['kyoto', 'porto']);

    const removed = SavedReducer(added, SavedActions.toggleSaved('kyoto'));
    expect(removed.destinationIds).toEqual(['porto']);
  });
});

describe('formatDateRange', () => {
  it('formats ranges within a month, across months, and across years', () => {
    expect(formatDateRange('2027-06-12', '2027-06-17')).toBe('12–17 Jun 2027');
    expect(formatDateRange('2027-06-28', '2027-07-03')).toBe('28 Jun–3 Jul 2027');
    expect(formatDateRange('2027-12-30', '2028-01-02')).toBe('30 Dec 2027–2 Jan 2028');
  });
});
