import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the FavoriteButton component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    button: {
      alignItems: 'center',
      backgroundColor: Colors[theme]?.mediaButton,
      borderRadius: scale(12),
      height: scale(24),
      justifyContent: 'center',
      width: scale(24)
    },
    pressed: {
      opacity: 0.7
    }
  });

export default styleSheet;
