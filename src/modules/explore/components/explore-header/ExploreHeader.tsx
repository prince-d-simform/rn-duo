import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from '../../../../components';
import { Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { scale } from '../../../../theme';
import styleSheet from './ExploreHeaderStyles';
import { ExploreHeaderDefaultProps, type ExploreHeaderProps } from './ExploreHeaderTypes';

/**
 * The ExploreHeader component.
 * Shows today's date, the screen headline, and the user's avatar.
 * @param {ExploreHeaderProps} props - The props for the ExploreHeader component.
 * @returns {React.ReactElement} A React element.
 */
const ExploreHeader: React.FC<ExploreHeaderProps> = (props) => {
  const {
    dateLabel,
    title,
    initials,
    onAvatarPress,
    customStyle,
    testID = ExploreHeaderDefaultProps.testID!
  } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      <View style={styles.textContainer}>
        <Text style={styles.date}>{dateLabel}</Text>
        <Text style={styles.title} accessibilityRole="header" numberOfLines={1}>
          {title}
        </Text>
      </View>
      <Avatar
        initials={initials}
        size={scale(32)}
        testID={`${testID}-avatar`}
        accessibilityLabel={Strings.Explore.labelAvatar}
        onPress={onAvatarPress}
      />
    </View>
  );
};

export default ExploreHeader;
ExploreHeader.displayName = 'ExploreHeader';
