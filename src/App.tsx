import * as Sentry from '@sentry/react-native';
import * as SplashScreen from 'expo-splash-screen';
import React, { type FC } from 'react';
import { LogBox, StyleSheet, Text, TextInput } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigation } from './navigation';
import { persistor, store } from './redux';

// Keep splash screen visible until auth state is rehydrated and navigation is ready
SplashScreen.preventAutoHideAsync();

/**
 * Disable font scaling globally.
 */
// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore
Text.defaultProps.allowFontScaling = false;
// @ts-ignore
TextInput.defaultProps = TextInput.defaultProps || {};
// @ts-ignore
TextInput.defaultProps.allowFontScaling = false;

/**
 * Suppress noisy log warnings.
 */
LogBox.ignoreAllLogs(true);
LogBox.ignoreLogs([
  'EventEmitter.removeListener',
  'Require cycle:',
  'Non-serializable values were found in the navigation state. Check',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components"
]);

const styles = StyleSheet.create({
  root: {
    flex: 1
  }
});

/**
 * The Main App Component.
 * Wraps the application with the necessary providers and the app navigator.
 * @returns {React.ReactElement} The App component.
 */
const App: FC = (): React.ReactElement => {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppNavigation />
          </PersistGate>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default Sentry.wrap(App);
