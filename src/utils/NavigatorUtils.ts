import {
  CommonActions,
  createNavigationContainerRef,
  StackActions
} from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/NavigationTypes';

/**
 * A ref to the root NavigationContainer, used for imperative navigation outside of components.
 */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();

/**
 * A route name registered in the root stack.
 */
type RouteName = keyof RootStackParamList;

/**
 * Dismisses screens from the navigation stack.
 * @param {number} [screenCount=1] - The number of screens to dismiss.
 * @param {boolean} [isPopToTop=false] - If true, dismisses all screens back to the first screen in the stack.
 * @returns None
 */
export function navigatePop(screenCount: number = 1, isPopToTop: boolean = false): void {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(isPopToTop ? StackActions.popToTop() : StackActions.pop(screenCount));
}

/**
 * Navigates back one screen in the navigation history.
 * @returns None
 */
export function navigateBack(): void {
  if (navigationRef.isReady() && navigationRef.canGoBack()) {
    navigationRef.goBack();
  }
}

/**
 * Replace the current screen with a new one, without adding to the navigation stack.
 * @param {RouteName} routeName - The name of the route to navigate to.
 * @param {object} [params] - Optional parameters to pass to the route.
 * @returns None
 */
export function navigateWithReplace<T extends RouteName>(
  routeName: T,
  params?: RootStackParamList[T]
): void {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(StackActions.replace(routeName, params));
}

/**
 * Navigates to a screen, reusing an existing instance of it in the stack if present.
 * @param {RouteName} routeName - The name of the route to navigate to.
 * @param {object} [params] - Optional parameters to pass to the route.
 * @returns None
 */
export function navigateWithParam<T extends RouteName>(
  routeName: T,
  params?: RootStackParamList[T]
): void {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(CommonActions.navigate(routeName, params));
}

/**
 * Navigates to a route by always pushing a new screen onto the stack,
 * even if a screen for that route already exists in the stack.
 * @param {RouteName} routeName - The name of the route to navigate to.
 * @param {object} [params] - Optional parameters to pass to the route.
 * @returns None
 */
export function navigateWithPush<T extends RouteName>(
  routeName: T,
  params?: RootStackParamList[T]
): void {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(StackActions.push(routeName, params));
}

/**
 * Reset the navigation stack to a single screen.
 * @param {RouteName} routeName - The name of the route to reset to.
 * @param {object} [params] - Optional parameters to pass to the route.
 * @returns None
 */
export function navigateWithReset<T extends RouteName>(
  routeName: T,
  params?: RootStackParamList[T]
): void {
  if (!navigationRef.isReady()) return;
  navigationRef.dispatch(CommonActions.reset({ index: 0, routes: [{ name: routeName, params }] }));
}
