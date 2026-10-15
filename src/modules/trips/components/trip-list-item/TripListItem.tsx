import { Ionicons } from '@expo/vector-icons';
import React, { memo, useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import { RemoteImage } from '../../../../components';
import { Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { Colors, scale } from '../../../../theme';
import styleSheet from './TripListItemStyles';
import { TripListItemDefaultProps, type TripListItemProps } from './TripListItemTypes';

/**
 * The TripListItem component.
 * A row inside the trips card with the destination thumbnail, name, dates, and a chevron.
 * The first and last rows draw the card's rounded top and bottom edges.
 * @param {TripListItemProps} props - The props for the TripListItem component.
 * @returns {React.ReactElement} A React element.
 */
const TripListItem: React.FC<TripListItemProps> = (props) => {
  const {
    entry,
    isFirst,
    isLast,
    onPress,
    customStyle,
    testID = TripListItemDefaultProps.testID!
  } = props;
  const { styles, theme } = useTheme(styleSheet);

  const handlePress = useCallback(() => onPress(entry), [onPress, entry]);

  return (
    <Pressable
      accessible
      style={({ pressed }) => [
        styles.row,
        isFirst && styles.first,
        isLast && styles.last,
        pressed && styles.pressed,
        customStyle
      ]}
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={`${entry.destination.name}, ${entry.dateLabel}`}
      accessibilityHint={Strings.Trips.hintOpenTrip}
      onPress={handlePress}
    >
      <RemoteImage uri={entry.destination.imageUrl} customStyle={styles.thumbnail} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {entry.destination.name}
        </Text>
        <Text style={styles.dates} numberOfLines={1}>
          {entry.dateLabel}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={scale(16)} color={Colors[theme]?.textTertiary} />
    </Pressable>
  );
};

const MemoizedTripListItem = memo(TripListItem);
MemoizedTripListItem.displayName = 'TripListItem';

export default MemoizedTripListItem;
