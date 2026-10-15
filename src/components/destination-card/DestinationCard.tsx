import React, { memo, useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { I18n } from '../../translations';
import { FavoriteButton } from '../favorite-button';
import { Rating } from '../rating';
import { RemoteImage } from '../remote-image';
import styleSheet from './DestinationCardStyles';
import { DestinationCardDefaultProps, type DestinationCardProps } from './DestinationCardTypes';

/**
 * The DestinationCard component.
 * A tall photo card with a rating badge, a save toggle, and the destination
 * name and country over a darkened footer.
 * @param {DestinationCardProps} props - The props for the DestinationCard component.
 * @returns {React.ReactElement} A React element.
 */
const DestinationCard: React.FC<DestinationCardProps> = (props) => {
  const {
    destination,
    isFavorite,
    onPress,
    onToggleFavorite,
    customStyle,
    testID = DestinationCardDefaultProps.testID!
  } = props;
  const { styles } = useTheme(styleSheet);

  const handlePress = useCallback(() => onPress(destination), [onPress, destination]);
  const handleToggleFavorite = useCallback(
    () => onToggleFavorite(destination),
    [onToggleFavorite, destination]
  );

  return (
    <View style={[styles.card, customStyle]} testID={testID}>
      <Pressable
        accessible
        style={({ pressed }) => [styles.image, pressed && styles.pressed]}
        testID={`${testID}-press`}
        accessibilityRole="button"
        accessibilityLabel={`${destination.name}, ${destination.country}`}
        accessibilityHint={Strings.Explore.hintOpenDestination}
        onPress={handlePress}
      >
        <RemoteImage uri={destination.imageUrl} customStyle={styles.image} />
        <View style={styles.scrim} />
        <View style={styles.info}>
          <Text style={styles.name} numberOfLines={1}>
            {destination.name}
          </Text>
          <Text style={styles.country} numberOfLines={1}>
            {destination.country}
          </Text>
        </View>
        <Rating value={destination.rating} variant="badge" customStyle={styles.rating} />
      </Pressable>
      <FavoriteButton
        isFavorite={isFavorite}
        customStyle={styles.favorite}
        testID={`${testID}-favorite`}
        accessibilityLabel={I18n.t(
          isFavorite ? 'explore:labelUnsaveDestination' : 'explore:labelSaveDestination',
          { name: destination.name }
        )}
        onPress={handleToggleFavorite}
      />
    </View>
  );
};

const MemoizedDestinationCard = memo(DestinationCard);
MemoizedDestinationCard.displayName = 'DestinationCard';

export default MemoizedDestinationCard;
