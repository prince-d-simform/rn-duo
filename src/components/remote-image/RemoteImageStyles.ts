import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, type ThemeMode } from '../../theme';

/**
 * Style function for the RemoteImage component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    frame: {
      backgroundColor: Colors[theme]?.placeholder,
      overflow: 'hidden'
    },
    image: {
      ...StyleSheet.absoluteFill
    },
    overlay: {
      ...StyleSheet.absoluteFill,
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

export default styleSheet;
