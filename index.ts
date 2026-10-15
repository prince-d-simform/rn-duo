import { registerRootComponent } from 'expo';
import App from './src/App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App)
// and ensures the environment is set up for both Expo Go and native builds.
registerRootComponent(App);
