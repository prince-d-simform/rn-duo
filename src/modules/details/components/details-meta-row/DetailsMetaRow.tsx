import React from 'react';
import { Text, View } from 'react-native';
import { Rating } from '../../../../components';
import { useTheme } from '../../../../hooks';
import { I18n } from '../../../../translations';
import styleSheet from './DetailsMetaRowStyles';
import { DetailsMetaRowDefaultProps, type DetailsMetaRowProps } from './DetailsMetaRowTypes';

/**
 * The DetailsMetaRow component.
 * A single row of quick facts: rating with review count, best season, and price level.
 * @param {DetailsMetaRowProps} props - The props for the DetailsMetaRow component.
 * @returns {React.ReactElement} A React element.
 */
const DetailsMetaRow: React.FC<DetailsMetaRowProps> = (props) => {
  const {
    rating,
    reviewCount,
    bestSeason,
    priceLevel,
    customStyle,
    testID = DetailsMetaRowDefaultProps.testID!
  } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <View style={[styles.row, customStyle]} testID={testID}>
      <View style={styles.ratingGroup}>
        <Rating value={rating} />
        <Text style={styles.reviews}>
          {I18n.t('details:reviews', { total: reviewCount.toLocaleString('en-US') })}
        </Text>
      </View>
      <Text style={styles.highlight}>{I18n.t('details:bestSeason', { season: bestSeason })}</Text>
      <Text
        style={styles.highlight}
        accessibilityLabel={I18n.t('details:labelPriceLevel', { level: priceLevel })}
      >
        {priceLevel}
      </Text>
    </View>
  );
};

export default DetailsMetaRow;
DetailsMetaRow.displayName = 'DetailsMetaRow';
