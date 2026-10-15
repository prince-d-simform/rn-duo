import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import { I18n } from '../../translations';
import { formatRating } from '../../utils';
import styleSheet from './RatingStyles';
import { RatingDefaultProps, type RatingProps } from './RatingTypes';

/**
 * The Rating component.
 * Shows a star with a one-decimal rating, either as a translucent badge
 * over images or inline on regular surfaces.
 * @param {RatingProps} props - The props for the Rating component.
 * @returns {React.ReactElement} A React element.
 */
const Rating: React.FC<RatingProps> = (props) => {
  const {
    value,
    variant = RatingDefaultProps.variant!,
    customStyle,
    testID = RatingDefaultProps.testID!,
    accessibilityLabel
  } = props;
  const { styles, theme } = useTheme(styleSheet);
  const isBadge = variant === 'badge';
  const formattedValue = formatRating(value);

  return (
    <View
      accessible
      style={[styles.container, isBadge && styles.badge, customStyle]}
      testID={testID}
      accessibilityRole="text"
      accessibilityLabel={
        accessibilityLabel ?? I18n.t('explore:labelRating', { rating: formattedValue })
      }
    >
      <Ionicons name="star" size={isBadge ? scale(11) : scale(12)} color={Colors[theme]?.star} />
      <Text style={[styles.value, isBadge ? styles.badgeText : styles.inlineText]}>
        {formattedValue}
      </Text>
    </View>
  );
};

const MemoizedRating = memo(Rating);
MemoizedRating.displayName = 'Rating';

export default MemoizedRating;
