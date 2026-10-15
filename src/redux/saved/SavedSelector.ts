import { createSelector } from '@reduxjs/toolkit';
import type { RootStateType } from '../Store';

/**
 * Selects the ids of the saved destinations.
 * @param {RootStateType} state - The root state.
 * @returns {string[]} The saved destination ids.
 */
const getSavedIds = (state: RootStateType): string[] => state.saved.destinationIds;

/**
 * Selects the saved destination ids as a Set for fast lookups.
 * @returns {Set<string>} The saved destination ids.
 */
const getSavedIdSet = createSelector([getSavedIds], (ids: string[]) => new Set(ids));

/**
 * Selects the number of saved destinations.
 * @returns {number} The number of saved destinations.
 */
const getSavedCount = createSelector([getSavedIds], (ids: string[]) => ids.length);

/**
 * A type containing the selectors for the saved state.
 */
const SavedSelectors = {
  getSavedIds,
  getSavedIdSet,
  getSavedCount
};

export default SavedSelectors;
