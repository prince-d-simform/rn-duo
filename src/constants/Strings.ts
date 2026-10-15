import { I18n } from '../translations';

/**
 * An object that represents a mapping of keys to string values.
 * @interface
 */
interface KeyStringValueMap {
  [key: string]: string;
}

/**
 * Freezes an object conforming to the KeyStringValueMap interface.
 * @function
 * @param {T} strings - The object to be frozen.
 * @returns {T} The frozen object.
 */
const freezeStringsObject = <T extends KeyStringValueMap>(strings: T): T => Object.freeze(strings);

/**
 * An object that contains all of the possible error messages that can be returned by the API.
 * @readonly
 * @enum {string}
 */
const APIError = freezeStringsObject({
  somethingWentWrong: I18n.t('apiError:somethingWentWrong'),
  networkError: I18n.t('apiError:networkError'),
  serverError: I18n.t('apiError:serverError'),
  timeoutError: I18n.t('apiError:timeoutError'),
  clientError: I18n.t('apiError:clientError'),
  cancelError: I18n.t('apiError:cancelError'),
  connectionError: I18n.t('apiError:connectionError'),
  unexpectedError: I18n.t('apiError:unexpectedError'),
  cancelSagaError: I18n.t('apiError:cancelSagaError'),
  error: I18n.t('apiError:error'),
  permissionIsUnavailable: I18n.t('apiError:permissionIsUnavailable'),
  permissionTypeIsUndefined: I18n.t('apiError:permissionTypeIsUndefined')
});

/**
 * A collection of error messages for the Yup validation schema.
 * @type {Object}
 */
const YupError = freezeStringsObject({
  requireNameError: I18n.t('yupError:requireNameError'),
  requireEmailError: I18n.t('yupError:requireEmailError'),
  invalidEmailError: I18n.t('yupError:invalidEmailError'),
  requirePasswordError: I18n.t('yupError:requirePasswordError'),
  lengthPasswordError: I18n.t('yupError:lengthPasswordError'),
  lowercasePasswordError: I18n.t('yupError:lowercasePasswordError'),
  uppercasePasswordError: I18n.t('yupError:uppercasePasswordError'),
  specialPasswordError: I18n.t('yupError:specialPasswordError'),
  digitPasswordError: I18n.t('yupError:digitPasswordError')
});

const Details = freezeStringsObject({
  topExperiences: I18n.t('details:topExperiences'),
  priceFromLabel: I18n.t('details:priceFromLabel'),
  btnPlanTrip: I18n.t('details:btnPlanTrip'),
  labelBack: I18n.t('details:labelBack'),
  labelShare: I18n.t('details:labelShare'),
  labelSave: I18n.t('details:labelSave'),
  labelUnsave: I18n.t('details:labelUnsave'),
  notFoundTitle: I18n.t('details:notFoundTitle'),
  notFoundMessage: I18n.t('details:notFoundMessage')
});

const Auth = freezeStringsObject({
  hintName: I18n.t('auth:hintName'),
  hintEmail: I18n.t('auth:hintEmail'),
  hintPassword: I18n.t('auth:hintPassword'),
  btnSignIn: I18n.t('auth:btnSignIn'),
  btnSignUp: I18n.t('auth:btnSignUp'),
  signInTitle: I18n.t('auth:signInTitle'),
  signInSubtitle: I18n.t('auth:signInSubtitle'),
  signUpTitle: I18n.t('auth:signUpTitle'),
  signUpSubtitle: I18n.t('auth:signUpSubtitle'),
  noAccountLabel: I18n.t('auth:noAccountLabel'),
  hasAccountLabel: I18n.t('auth:hasAccountLabel'),
  signUpAction: I18n.t('auth:signUpAction'),
  signInAction: I18n.t('auth:signInAction')
});

const Profile = freezeStringsObject({
  tripPreferences: I18n.t('profile:tripPreferences'),
  notifications: I18n.t('profile:notifications'),
  currency: I18n.t('profile:currency'),
  units: I18n.t('profile:units'),
  helpAndFeedback: I18n.t('profile:helpAndFeedback'),
  valueOn: I18n.t('profile:valueOn'),
  statSaved: I18n.t('profile:statSaved'),
  btnSignOut: I18n.t('profile:btnSignOut')
});

const Navigation = freezeStringsObject({
  explore: I18n.t('navigation:explore'),
  saved: I18n.t('navigation:saved'),
  trips: I18n.t('navigation:trips'),
  profile: I18n.t('navigation:profile'),
  details: I18n.t('navigation:details'),
  signIn: I18n.t('navigation:signIn'),
  signUp: I18n.t('navigation:signUp')
});

const Explore = freezeStringsObject({
  title: I18n.t('explore:title'),
  hintSearch: I18n.t('explore:hintSearch'),
  categoryAll: I18n.t('explore:categoryAll'),
  categoryBeaches: I18n.t('explore:categoryBeaches'),
  categoryMountains: I18n.t('explore:categoryMountains'),
  categoryCities: I18n.t('explore:categoryCities'),
  categoryIslands: I18n.t('explore:categoryIslands'),
  popularThisWeek: I18n.t('explore:popularThisWeek'),
  weekendEscapes: I18n.t('explore:weekendEscapes'),
  noResultsTitle: I18n.t('explore:noResultsTitle'),
  noResultsMessage: I18n.t('explore:noResultsMessage'),
  labelAvatar: I18n.t('explore:labelAvatar'),
  labelClearSearch: I18n.t('explore:labelClearSearch'),
  hintOpenDestination: I18n.t('explore:hintOpenDestination')
});

const Saved = freezeStringsObject({
  title: I18n.t('saved:title'),
  allPlaces: I18n.t('saved:allPlaces'),
  emptyTitle: I18n.t('saved:emptyTitle'),
  emptyMessage: I18n.t('saved:emptyMessage')
});

const Trips = freezeStringsObject({
  title: I18n.t('trips:title'),
  someday: I18n.t('trips:someday'),
  hintOpenTrip: I18n.t('trips:hintOpenTrip'),
  emptyTitle: I18n.t('trips:emptyTitle'),
  emptyMessage: I18n.t('trips:emptyMessage')
});

/**
 * Exporting all the strings in one object..
 * Separate string object like Explore, Details & Auth etc...
 * base on your modules dir structure
 * @type {Object.<string, Record<string, string>>}
 */
export default Object.freeze({
  APIError,
  YupError,
  Details,
  Auth,
  Profile,
  Navigation,
  Explore,
  Saved,
  Trips
});
