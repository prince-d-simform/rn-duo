import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * Style function for the ExperienceCard component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    card: {
      borderRadius: scale(12),
      height: scale(146),
      overflow: 'hidden'
    },
    image: {
      ...StyleSheet.absoluteFill
    },
    info: {
      bottom: 0,
      left: 0,
      paddingBottom: scale(11),
      paddingHorizontal: scale(10),
      position: 'absolute',
      right: 0
    },
    meta: {
      color: Colors[theme]?.onMediaMuted,
      fontSize: scale(12),
      marginTop: scale(1)
    },
    scrim: {
      bottom: 0,
      experimental_backgroundImage: `linear-gradient(to bottom, ${Colors[theme]?.transparentBlack}, ${Colors[theme]?.mediaScrim})`,
      height: '55%',
      left: 0,
      position: 'absolute',
      right: 0
    },
    title: {
      color: Colors[theme]?.onMedia,
      fontSize: scale(14),
      fontWeight: '600'
    }
  });

export default styleSheet;
