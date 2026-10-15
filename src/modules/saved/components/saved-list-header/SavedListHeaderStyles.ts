import { StyleSheet } from 'react-native';
import { ApplicationStyles, scale, type ThemeMode } from '../../../../theme';

/**
 * Style function for the SavedListHeader component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    container: {
      paddingBottom: scale(14)
    },
    filters: {
      marginTop: scale(13)
    }
  });

export default styleSheet;
