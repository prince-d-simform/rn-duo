import React, { memo } from 'react';
import { Text, View } from 'react-native';
import { RemoteImage } from '../../../../components';
import { useTheme } from '../../../../hooks';
import styleSheet from './ExperienceCardStyles';
import { ExperienceCardDefaultProps, type ExperienceCardProps } from './ExperienceCardTypes';

/**
 * The ExperienceCard component.
 * A photo card with the experience title and a short meta line over a gradient.
 * @param {ExperienceCardProps} props - The props for the ExperienceCard component.
 * @returns {React.ReactElement} A React element.
 */
const ExperienceCard: React.FC<ExperienceCardProps> = (props) => {
  const { experience, customStyle, testID = ExperienceCardDefaultProps.testID! } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <View
      accessible
      style={[styles.card, customStyle]}
      testID={testID}
      accessibilityLabel={`${experience.title}, ${experience.meta}`}
    >
      <RemoteImage uri={experience.imageUrl} customStyle={styles.image} />
      <View style={styles.scrim} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {experience.title}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {experience.meta}
        </Text>
      </View>
    </View>
  );
};

const MemoizedExperienceCard = memo(ExperienceCard);
MemoizedExperienceCard.displayName = 'ExperienceCard';

export default MemoizedExperienceCard;
