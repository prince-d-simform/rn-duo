import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, width, type ThemeMode } from '../../theme';

const HORIZONTAL_PADDING: number = scale(15);
const GRID_SPACING: number = scale(9);

/**
 * Style function for the Saved screen.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    card: {
      height: scale(235),
      width: (width - HORIZONTAL_PADDING * 2 - GRID_SPACING) / 2
    },
    column: {
      gap: GRID_SPACING
    },
    container: {
      backgroundColor: Colors[theme]?.background,
      flex: 1
    },
    listContent: {
      paddingBottom: scale(16),
      paddingHorizontal: HORIZONTAL_PADDING
    },
    rowSeparator: {
      height: GRID_SPACING
    }
  });

export default styleSheet;
