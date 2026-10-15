import React, { useMemo } from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton, IconButton } from '../../../../components';
import { Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { Colors, scale } from '../../../../theme';
import styleSheet from './DetailsFooterStyles';
import { DetailsFooterDefaultProps, type DetailsFooterProps } from './DetailsFooterTypes';

/**
 * The DetailsFooter component.
 * A bar pinned to the bottom of the details screen with the starting price,
 * a save toggle, and the primary Plan trip action.
 * @param {DetailsFooterProps} props - The props for the DetailsFooter component.
 * @returns {React.ReactElement} A React element.
 */
const DetailsFooter: React.FC<DetailsFooterProps> = (props) => {
  const {
    price,
    durationLabel,
    isFavorite,
    onToggleFavorite,
    onPlanTrip,
    customStyle,
    testID = DetailsFooterDefaultProps.testID!
  } = props;
  const { styles, theme } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();

  const bottomPadding = useMemo<ViewStyle>(
    () => ({ paddingBottom: Math.max(insets.bottom, scale(12)) }),
    [insets.bottom]
  );

  return (
    <View style={[styles.container, bottomPadding, customStyle]} testID={testID}>
      <View
        accessible
        accessibilityLabel={`${Strings.Details.priceFromLabel} ${price}, ${durationLabel}`}
      >
        <Text style={styles.fromLabel}>{Strings.Details.priceFromLabel}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{price}</Text>
          <Text style={styles.duration}>{durationLabel}</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <IconButton
          icon={isFavorite ? 'heart' : 'heart-outline'}
          variant="outlined"
          iconSize={scale(19)}
          iconColor={isFavorite ? Colors[theme]?.favorite : undefined}
          selected={isFavorite}
          testID={`${testID}-favorite`}
          accessibilityLabel={isFavorite ? Strings.Details.labelUnsave : Strings.Details.labelSave}
          onPress={onToggleFavorite}
        />
        <CustomButton
          variant="accent"
          title={Strings.Details.btnPlanTrip}
          style={styles.planTripButton}
          titleProps={{ style: styles.planTripTitle }}
          testID={`${testID}-plan-trip`}
          accessibilityRole="button"
          accessibilityLabel={Strings.Details.btnPlanTrip}
          onPress={onPlanTrip}
        />
      </View>
    </View>
  );
};

export default DetailsFooter;
DetailsFooter.displayName = 'DetailsFooter';
