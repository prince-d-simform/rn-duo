import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../theme';

/**
 * Style function for the Rating component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    badge: {
      backgroundColor: Colors[theme]?.mediaBadge,
      borderRadius: scale(10),
      paddingHorizontal: scale(7),
      paddingVertical: scale(2)
    },
    badgeText: {
      color: Colors[theme]?.onMedia,
      fontSize: scale(12)
    },
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: scale(3)
    },
    inlineText: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(13)
    },
    value: {
      fontWeight: '700'
    }
  });

export default styleSheet;
