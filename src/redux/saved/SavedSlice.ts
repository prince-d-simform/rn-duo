import { createSlice, type Draft, type PayloadAction } from '@reduxjs/toolkit';
import INITIAL_STATE, { type SavedStateType } from './SavedInitial';

/**
 * Creating a saved slice of the redux store.
 * Tracks which destinations the user has saved.
 */
const savedSlice = createSlice({
  name: 'saved',
  initialState: INITIAL_STATE,
  reducers: {
    /**
     * Saves a destination, or removes it if it is already saved.
     * @param {SavedStateType} state - The current saved state.
     * @param {PayloadAction<string>} action - The id of the destination to toggle.
     */
    toggleSaved: (state: Draft<SavedStateType>, action: PayloadAction<string>) => {
      const index = state.destinationIds.indexOf(action.payload);
      if (index === -1) {
        state.destinationIds.push(action.payload);
      } else {
        state.destinationIds.splice(index, 1);
      }
    },
    /**
     * Clears the sync error.
     * @param {SavedStateType} state - The current saved state.
     */
    clearError: (state: Draft<SavedStateType>) => {
      state.error = undefined;
    },
    /**
     * Resets the saved state to its initial value.
     * @returns {SavedStateType} The initial state.
     */
    resetState: () => INITIAL_STATE
  }
});

/* Exporting the reducer function that will be used in the root reducer. */
export const SavedReducer = savedSlice.reducer;

/**
 * An object with all of the actions for the saved slice.
 */
export const SavedActions = { ...savedSlice.actions };
