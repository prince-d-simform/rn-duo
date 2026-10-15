import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  Text,
  View,
  type ListRenderItemInfo,
  type ViewStyle
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState, IconButton, Tag } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { Colors, scale } from '../../theme';
import { DetailsFooter, DetailsHero, DetailsMetaRow, ExperienceCard } from './components';
import styleSheet from './DetailsStyles';
import useDetails from './useDetails';
import type { Experience } from '../../types';

/**
 * Returns the stable key for an experience.
 * @param {Experience} item - The experience.
 * @returns {string} The experience id.
 */
const keyExtractor = (item: Experience): string => item.id;

/**
 * The DetailsScreen component.
 * A scrollable destination page (hero, quick facts, tags, description, and
 * top experiences) with the price and Plan trip action pinned to the bottom.
 * @returns {React.ReactElement} A React element.
 */
const DetailsScreen: React.FC = (): React.ReactElement => {
  const { styles, theme } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();
  const {
    destination,
    details,
    location,
    price,
    durationLabel,
    isFavorite,
    onToggleFavorite,
    onBack,
    onShare,
    onPlanTrip
  } = useDetails();

  const renderExperience = useCallback(
    ({ item }: ListRenderItemInfo<Experience>) => (
      <ExperienceCard
        experience={item}
        customStyle={styles.experienceCard}
        testID={`experience-card-${item.id}`}
      />
    ),
    [styles.experienceCard]
  );

  const renderExperienceSeparator = useCallback(
    () => <View style={styles.experienceSeparator} />,
    [styles.experienceSeparator]
  );

  const notFoundBackPosition = useMemo<ViewStyle>(
    () => ({ top: insets.top + scale(26) }),
    [insets.top]
  );

  if (!destination || !details) {
    return (
      <View style={styles.container}>
        <View style={styles.notFound}>
          <EmptyState
            icon="compass-outline"
            title={Strings.Details.notFoundTitle}
            message={Strings.Details.notFoundMessage}
            testID="details-not-found"
          />
        </View>
        <IconButton
          icon="chevron-back"
          variant="outlined"
          customStyle={[styles.notFoundBack, notFoundBackPosition]}
          testID="details-not-found-back"
          accessibilityLabel={Strings.Details.labelBack}
          onPress={onBack}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors[theme]?.transparent} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        testID="details-scroll"
      >
        <DetailsHero
          imageUrl={destination.imageUrl}
          name={destination.name}
          location={location}
          onBack={onBack}
          onShare={onShare}
        />
        <View style={styles.body}>
          <DetailsMetaRow
            rating={destination.rating}
            reviewCount={details.reviewCount}
            bestSeason={details.bestSeason}
            priceLevel={details.priceLevel}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tagsList}
            contentContainerStyle={styles.tags}
          >
            {details.tags.map((tag: string) => (
              <Tag key={tag} label={tag} />
            ))}
          </ScrollView>
          <Text style={styles.description}>{details.description}</Text>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            {Strings.Details.topExperiences}
          </Text>
          <FlatList
            horizontal
            data={details.experiences}
            renderItem={renderExperience}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={renderExperienceSeparator}
            showsHorizontalScrollIndicator={false}
            testID="details-experiences"
          />
        </View>
      </ScrollView>
      <DetailsFooter
        price={price}
        durationLabel={durationLabel}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
        onPlanTrip={onPlanTrip}
      />
    </View>
  );
};

export default DetailsScreen;
