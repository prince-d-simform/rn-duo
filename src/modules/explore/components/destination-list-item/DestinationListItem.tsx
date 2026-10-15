import React, { memo, useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Rating, RemoteImage } from '../../../../components';
import { Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { I18n } from '../../../../translations';
import { formatPrice } from '../../../../utils';
import styleSheet from './DestinationListItemStyles';
import {
  DestinationListItemDefaultProps,
  type DestinationListItemProps
} from './DestinationListItemTypes';

/**
 * The DestinationListItem component.
 * A compact row with a thumbnail, the destination name, country and starting
 * price, and the rating aligned to the right.
 * @param {DestinationListItemProps} props - The props for the DestinationListItem component.
 * @returns {React.ReactElement} A React element.
 */
const DestinationListItem: React.FC<DestinationListItemProps> = (props) => {
  const {
    destination,
    onPress,
    customStyle,
    testID = DestinationListItemDefaultProps.testID!
  } = props;
  const { styles } = useTheme(styleSheet);

  const handlePress = useCallback(() => onPress(destination), [onPress, destination]);
  const subtitle = I18n.t('explore:priceFrom', {
    country: destination.country,
    price: formatPrice(destination.priceFrom)
  });

  return (
    <Pressable
      accessible
      style={({ pressed }) => [styles.row, pressed && styles.pressed, customStyle]}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={`${destination.name}, ${subtitle}`}
      accessibilityHint={Strings.Explore.hintOpenDestination}
      onPress={handlePress}
    >
      <RemoteImage uri={destination.imageUrl} customStyle={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {destination.name}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      <Rating value={destination.rating} />
    </Pressable>
  );
};

const MemoizedDestinationListItem = memo(DestinationListItem);
MemoizedDestinationListItem.displayName = 'DestinationListItem';

export default MemoizedDestinationListItem;
