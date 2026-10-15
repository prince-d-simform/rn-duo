import React from 'react';
import { Text, View } from 'react-native';
import { Card } from '../../../../components';
import { useTheme } from '../../../../hooks';
import styleSheet from './ProfileStatsStyles';
import { ProfileStatsDefaultProps, type ProfileStatsProps } from './ProfileStatsTypes';
import type { ProfileStat } from '../../ProfileTypes';

/**
 * The ProfileStats component.
 * A card with travel stats laid out in equal-width columns.
 * @param {ProfileStatsProps} props - The props for the ProfileStats component.
 * @returns {React.ReactElement} A React element.
 */
const ProfileStats: React.FC<ProfileStatsProps> = (props) => {
  const { stats, customStyle, testID = ProfileStatsDefaultProps.testID! } = props;
  const { styles } = useTheme(styleSheet);

  return (
    <Card customStyle={customStyle} testID={testID}>
      <View style={styles.row}>
        {stats.map((stat: ProfileStat) => (
          <View
            accessible
            key={stat.id}
            style={styles.stat}
            testID={`${testID}-${stat.id}`}
            accessibilityLabel={`${stat.value} ${stat.label}`}
          >
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
          </View>
        ))}
      </View>
    </Card>
  );
};

export default ProfileStats;
ProfileStats.displayName = 'ProfileStats';
