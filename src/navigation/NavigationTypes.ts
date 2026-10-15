import type { ROUTES } from '../constants';
import type { SigninRouteParamList } from '../modules/auth/signin/SigninTypes';
import type { NavigatorScreenParams } from '@react-navigation/native';

/**
 * Param list for the bottom tab navigator shown to authenticated users.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BottomTabParamList = {
  [ROUTES.Home]: undefined;
  [ROUTES.Profile]: undefined;
};

/**
 * Param list for the root native stack navigator.
 * Auth screens and app screens live in the same stack and are
 * conditionally rendered based on the user's login state.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type RootStackParamList = {
  [ROUTES.SignIn]: SigninRouteParamList | undefined;
  [ROUTES.SignUp]: undefined;
  [ROUTES.HomeTabs]: NavigatorScreenParams<BottomTabParamList> | undefined;
  [ROUTES.Details]: undefined;
};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNavigation {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface RootParamList extends RootStackParamList {}
  }
}
