import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * Style function for the DestinationListItem component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    content: {
      flex: 1,
      marginHorizontal: scale(11)
    },
    name: {
      color: Colors[theme]?.textPrimary,
      fontSize: scale(14),
      fontWeight: '600'
    },
    pressed: {
      opacity: 0.7
    },
    row: {
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: scale(10)
    },
    subtitle: {
      color: Colors[theme]?.textSecondary,
      fontSize: scale(12),
      marginTop: scale(2)
    },
    thumbnail: {
      borderRadius: scale(10),
      height: scale(50),
      width: scale(50)
    }
  });

export default styleSheet;
