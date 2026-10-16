import { useEffect, useRef, useState } from 'react';
import { AppState, type AppStateStatus } from 'react-native';

/**
 * A hook that tracks the app's lifecycle state and logs every transition in dev.
 * On iPhone Duo an app in Split View can be visible but `inactive`, so pause
 * media and timers on `background` only, not on any non-`active` state.
 * @returns {AppStateStatus} The current app state: `active`, `inactive` or `background`.
 */
const useAppState = (): AppStateStatus => {
  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const previousState = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      if (__DEV__) {
        console.info(`[AppState] ${previousState.current} → ${nextState}`);
      }
      previousState.current = nextState;
      setAppState(nextState);
    });
    return () => subscription.remove();
  }, []);

  return appState;
};

export default useAppState;
