import { defaultSavedDestinationIds } from '../../constants/StaticData';
import type { ErrorResponse } from '../../types';

/**
 * The state of the user's saved destinations.
 * @typedef {Object} SavedStateType
 * @property {string[]} destinationIds - Ids of saved destinations, in the order they were saved.
 * @property {boolean} isLoading - Whether saved destinations are being synced.
 * @property {ErrorResponse | undefined} error - The error from the last sync, if any.
 */
export interface SavedStateType {
  destinationIds: string[];
  isLoading: boolean;
  error?: ErrorResponse;
}

/**
 * Defining the initial state of the saved reducer.
 * @returns {SavedStateType} The initial state of the saved reducer.
 */
const INITIAL_STATE: SavedStateType = {
  destinationIds: defaultSavedDestinationIds,
  isLoading: false,
  error: undefined
};

export default INITIAL_STATE;
