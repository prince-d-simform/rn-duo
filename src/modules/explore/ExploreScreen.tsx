import React, { useCallback, useMemo } from 'react';
import { FlatList, View, type ListRenderItemInfo, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState } from '../../components';
import { Strings } from '../../constants';
import { useTheme } from '../../hooks';
import { DestinationListItem, ExploreListHeader } from './components';
import styleSheet from './ExploreStyles';
import useExplore from './useExplore';
import type { Destination } from '../../types';

/**
 * Returns the stable key for a destination.
 * @param {Destination} item - The destination.
 * @returns {string} The destination id.
 */
const keyExtractor = (item: Destination): string => item.id;

/**
 * The ExploreScreen component.
 * Renders the weekend escapes list, with the greeting header, search,
 * category filters, and popular destinations carousel as its list header.
 * @returns {React.ReactElement} A React element.
 */
const ExploreScreen: React.FC = (): React.ReactElement => {
  const { styles } = useTheme(styleSheet);
  const insets = useSafeAreaInsets();
  const {
    dateLabel,
    initials,
    searchQuery,
    onChangeSearch,
    onClearSearch,
    selectedCategory,
    onSelectCategory,
    popularDestinations,
    weekendDestinations,
    hasResults,
    isFavorite,
    onToggleFavorite,
    onDestinationPress,
    onAvatarPress
  } = useExplore();

  const topInsetStyle = useMemo<ViewStyle>(() => ({ paddingTop: insets.top }), [insets.top]);

  const renderWeekendItem = useCallback(
    ({ item }: ListRenderItemInfo<Destination>) => (
      <DestinationListItem
        destination={item}
        testID={`destination-list-item-${item.id}`}
        onPress={onDestinationPress}
      />
    ),
    [onDestinationPress]
  );

  const renderRowSeparator = useCallback(
    () => <View style={styles.rowSeparator} />,
    [styles.rowSeparator]
  );

  const listEmpty = useMemo(
    () =>
      hasResults ? null : (
        <EmptyState
          icon="search-outline"
          title={Strings.Explore.noResultsTitle}
          message={Strings.Explore.noResultsMessage}
          testID="explore-empty"
        />
      ),
    [hasResults]
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={weekendDestinations}
        renderItem={renderWeekendItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderRowSeparator}
        ListHeaderComponent={
          <ExploreListHeader
            dateLabel={dateLabel}
            initials={initials}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            popularDestinations={popularDestinations}
            showWeekendTitle={weekendDestinations.length > 0}
            isFavorite={isFavorite}
            onAvatarPress={onAvatarPress}
            onChangeSearch={onChangeSearch}
            onClearSearch={onClearSearch}
            onSelectCategory={onSelectCategory}
            onToggleFavorite={onToggleFavorite}
            onDestinationPress={onDestinationPress}
          />
        }
        ListEmptyComponent={listEmpty}
        contentContainerStyle={[styles.listContent, topInsetStyle]}
        contentInsetAdjustmentBehavior="never"
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        testID="explore-list"
      />
    </View>
  );
};

export default ExploreScreen;
