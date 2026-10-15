import React, { Fragment, useMemo } from 'react';
import { ScrollView, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card, CustomButton } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { scale } from '../../theme';
import { ProfileHeader, ProfileStats, SettingsRow } from './components';
import styleSheet from './ProfileStyles';
import useProfile from './useProfile';
import type { ProfileSetting } from './ProfileTypes';

/**
 * The ProfileScreen component.
 * Shows the traveler's avatar and name, travel stats, app settings, and sign out.
 * @returns {React.ReactElement} A React element.
 */
const ProfileScreen: React.FC = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();
  const { name, initials, memberSinceLabel, stats, settings, onSignOut } = useProfile();

  const topInsetStyle = useMemo<ViewStyle>(
    () => ({ paddingTop: insets.top + scale(18) }),
    [insets.top]
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[styles.content, topInsetStyle]}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        testID="profile-scroll"
      >
        <ProfileHeader name={name} initials={initials} subtitle={memberSinceLabel} />
        <ProfileStats stats={stats} customStyle={styles.stats} />
        <Card customStyle={styles.section} testID="profile-settings">
          {settings.map((setting: ProfileSetting, index: number) => (
            <Fragment key={setting.id}>
              {index > 0 && <View style={styles.separator} />}
              <SettingsRow
                label={setting.label}
                value={setting.value}
                testID={`settings-row-${setting.id}`}
              />
            </Fragment>
          ))}
        </Card>
        <CustomButton
          variant="danger"
          title={Strings.Profile.btnSignOut}
          style={styles.signOutButton}
          titleProps={{ style: styles.signOutTitle }}
          testID="profile-sign-out"
          accessibilityRole="button"
          accessibilityLabel={Strings.Profile.btnSignOut}
          onPress={onSignOut}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;
