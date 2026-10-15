import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the IconButton component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    button: {
      alignItems: 'center',
      justifyContent: 'center'
    },
    outlined: {
      backgroundColor: Colors[theme]?.surface,
      borderColor: Colors[theme]?.border,
      borderRadius: scale(12),
      borderWidth: StyleSheet.hairlineWidth * 2
    },
    overlay: {
      backgroundColor: Colors[theme]?.mediaOverlayButton
    },
    pressed: {
      opacity: 0.7
    }
  });

export default styleSheet;
