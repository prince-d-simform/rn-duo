import React, { useMemo } from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton, RemoteImage } from '../../../../components';
import { Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { scale } from '../../../../theme';
import styleSheet from './DetailsHeroStyles';
import { DetailsHeroDefaultProps, type DetailsHeroProps } from './DetailsHeroTypes';

/**
 * The DetailsHero component.
 * A full-bleed destination photo that extends under the status bar, with
 * back and share buttons on top and the location and name over a gradient.
 * @param {DetailsHeroProps} props - The props for the DetailsHero component.
 * @returns {React.ReactElement} A React element.
 */
const DetailsHero: React.FC<DetailsHeroProps> = (props) => {
  const {
    imageUrl,
    name,
    location,
    onBack,
    onShare,
    customStyle,
    testID = DetailsHeroDefaultProps.testID!
  } = props;
  const { styles } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();

  // Offset by each side's inset so the buttons clear the status bar and camera,
  // which sit on the side on iPhone Duo's inner display.
  const actionsPosition = useMemo<ViewStyle>(
    () => ({
      top: insets.top || scale(26),
      left: scale(14) + insets.left,
      right: scale(14) + insets.right
    }),
    [insets.top, insets.left, insets.right]
  );

  return (
    <View style={[styles.hero, customStyle]} testID={testID}>
      <RemoteImage uri={imageUrl} customStyle={styles.image} />
      <View style={styles.topScrim} />
      <View style={styles.scrim} />
      <View style={styles.info}>
        <Text style={styles.location} numberOfLines={1}>
          {location}
        </Text>
        <Text style={styles.name} accessibilityRole="header" numberOfLines={2}>
          {name}
        </Text>
      </View>
      <View style={[styles.actions, actionsPosition]}>
        <IconButton
          icon="chevron-back"
          testID={`${testID}-back`}
          accessibilityLabel={Strings.Details.labelBack}
          onPress={onBack}
        />
        <IconButton
          icon="share-outline"
          testID={`${testID}-share`}
          accessibilityLabel={Strings.Details.labelShare}
          onPress={onShare}
        />
      </View>
    </View>
  );
};

export default DetailsHero;
DetailsHero.displayName = 'DetailsHero';
