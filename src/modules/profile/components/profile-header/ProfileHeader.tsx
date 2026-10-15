import React from 'react';
import { Text, View } from 'react-native';
import { Avatar } from '../../../../components';
import { useTheme } from '../../../../hooks';
import { scale } from '../../../../theme';
import styleSheet from './ProfileHeaderStyles';
import { ProfileHeaderDefaultProps, type ProfileHeaderProps } from './ProfileHeaderTypes';

/**
 * The ProfileHeader component.
 * A centered large avatar with the user's name and membership line.
 * @param {ProfileHeaderProps} props - The props for the ProfileHeader component.
 * @returns {React.ReactElement} A React element.
 */
const ProfileHeader: React.FC<ProfileHeaderProps> = (props) => {
  const {
    name,
    initials,
    subtitle,
    customStyle,
    testID = ProfileHeaderDefaultProps.testID!
  } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      <Avatar initials={initials} size={scale(63)} accessibilityLabel={name} />
      <Text style={styles.name} accessibilityRole="header" numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

export default ProfileHeader;
ProfileHeader.displayName = 'ProfileHeader';
