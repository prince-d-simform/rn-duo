import React, { memo, useCallback, useMemo } from 'react';
import { FlatList, Text, View, type ListRenderItemInfo, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  ChipGroup,
  DestinationCard,
  getDestinationCardWidth,
  SearchBar
} from '../../../../components';
import { exploreCategories, Strings } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { ExploreHeader } from '../explore-header';
import styleSheet, { CAROUSEL_ITEM_SPACING } from './ExploreListHeaderStyles';
import {
  ExploreListHeaderDefaultProps,
  type ExploreListHeaderProps
} from './ExploreListHeaderTypes';
import type { Destination } from '../../../../types';

/**
 * Returns the stable key for a destination.
 * @param {Destination} item - The destination.
 * @returns {string} The destination id.
 */
const keyExtractor = (item: Destination): string => item.id;

/**
 * The ExploreListHeader component.
 * Everything above the weekend list on the Explore screen: greeting header,
 * search, category filters, the popular destinations carousel, and the
 * "Weekend escapes" section title. Rendered as the list's ListHeaderComponent.
 * @param {ExploreListHeaderProps} props - The props for the ExploreListHeader component.
 * @returns {React.ReactElement} A React element.
 */
const ExploreListHeader: React.FC<ExploreListHeaderProps> = (props) => {
  const {
    dateLabel,
    initials,
    onAvatarPress,
    searchQuery,
    onChangeSearch,
    onClearSearch,
    selectedCategory,
    onSelectCategory,
    popularDestinations,
    showWeekendTitle,
    isFavorite,
    onToggleFavorite,
    onDestinationPress,
    customStyle,
    testID = ExploreListHeaderDefaultProps.testID!
  } = props;
  const { styles } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();

  // Keep the header and search clear of side insets, e.g. the vertical status bar
  // on the right edge of iPhone Duo's inner display.
  const sideInsetStyle = useMemo<ViewStyle>(
    () => ({ marginLeft: insets.left, marginRight: insets.right }),
    [insets.left, insets.right]
  );

  const renderPopularItem = useCallback(
    ({ item }: ListRenderItemInfo<Destination>) => (
      <DestinationCard
        destination={item}
        isFavorite={isFavorite(item.id)}
        testID={`destination-card-${item.id}`}
        onPress={onDestinationPress}
        onToggleFavorite={onToggleFavorite}
      />
    ),
    [isFavorite, onDestinationPress, onToggleFavorite]
  );

  const renderCarouselSeparator = useCallback(
    () => <View style={styles.carouselSeparator} />,
    [styles.carouselSeparator]
  );

  return (
    <View style={[styles.container, customStyle]} testID={testID}>
      <ExploreHeader
        dateLabel={dateLabel}
        title={Strings.Explore.title}
        initials={initials}
        customStyle={sideInsetStyle}
        onAvatarPress={onAvatarPress}
      />
      <SearchBar
        value={searchQuery}
        placeholder={Strings.Explore.hintSearch}
        clearAccessibilityLabel={Strings.Explore.labelClearSearch}
        customStyle={[styles.search, sideInsetStyle]}
        testID="explore-search"
        onChangeText={onChangeSearch}
        onClear={onClearSearch}
      />
      <ChipGroup
        options={exploreCategories}
        selectedId={selectedCategory}
        customStyle={styles.categories}
        testID="category-list"
        onSelect={onSelectCategory}
      />
      {popularDestinations.length > 0 && (
        <>
          <Text style={styles.sectionTitle} accessibilityRole="header">
            {Strings.Explore.popularThisWeek}
          </Text>
          <FlatList
            horizontal
            data={popularDestinations}
            renderItem={renderPopularItem}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={renderCarouselSeparator}
            showsHorizontalScrollIndicator={false}
            snapToInterval={getDestinationCardWidth() + CAROUSEL_ITEM_SPACING}
            decelerationRate="fast"
            testID="explore-popular-list"
          />
        </>
      )}
      {showWeekendTitle && (
        <Text style={[styles.sectionTitle, styles.weekendTitle]} accessibilityRole="header">
          {Strings.Explore.weekendEscapes}
        </Text>
      )}
    </View>
  );
};

const MemoizedExploreListHeader = memo(ExploreListHeader);
MemoizedExploreListHeader.displayName = 'ExploreListHeader';

export default MemoizedExploreListHeader;
