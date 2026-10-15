import { StyleSheet } from 'react-native';
import { ApplicationStyles, Colors, scale, type ThemeMode } from '../../../../theme';

/**
 * Style function for the DetailsHero component.
 * @param {ThemeMode} theme - Current theme mode.
 * @returns StyleSheet object.
 */
const styleSheet = (theme: ThemeMode) =>
  StyleSheet.create({
    ...ApplicationStyles(theme),
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      left: scale(14),
      position: 'absolute',
      right: scale(14)
    },
    hero: {
      height: scale(396),
      width: '100%'
    },
    image: {
      ...StyleSheet.absoluteFill
    },
    info: {
      bottom: scale(20),
      left: scale(15),
      position: 'absolute',
      right: scale(15)
    },
    location: {
      color: Colors[theme]?.onMediaMuted,
      fontSize: scale(12),
      fontWeight: '500',
      marginBottom: scale(2)
    },
    name: {
      color: Colors[theme]?.onMedia,
      fontSize: scale(30),
      fontWeight: '800',
      letterSpacing: -0.5
    },
    scrim: {
      bottom: 0,
      experimental_backgroundImage: `linear-gradient(to bottom, ${Colors[theme]?.transparentBlack}, ${Colors[theme]?.mediaScrim})`,
      height: '45%',
      left: 0,
      position: 'absolute',
      right: 0
    },
    topScrim: {
      experimental_backgroundImage: `linear-gradient(to top, ${Colors[theme]?.transparentBlack}, ${Colors[theme]?.mediaBadge})`,
      height: '25%',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    }
  });

export default styleSheet;
