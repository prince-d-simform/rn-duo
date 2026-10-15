import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, type ThemeMode } from '../../theme';

/**
 * Style function for the Avatar component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    avatar: {
      alignItems: 'center',
      backgroundColor: Colors[theme]?.accent,
      justifyContent: 'center',
      overflow: 'hidden'
    },
    initials: {
      color: Colors[theme]?.onAccent,
      fontWeight: '700'
    },
    pressed: {
      opacity: 0.8
    }
  });

export default styleSheet;
