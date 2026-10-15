import { defineProGuardRules, getEnvironmentConfig } from './buildconfig';

/* eslint-disable require-jsdoc */
const defineConfig = ({ config }) => {
  let APP_ENV = process.env.NODE_ENV;

  const { appName, bundleIdentifier } = getEnvironmentConfig(APP_ENV);

  return {
    ...config,
    name: appName,
    slug: 'RnDuo',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './src/assets/icons/appIcon.png',
    scheme: 'rnduo',
    userInterfaceStyle: 'automatic',
    newArchEnabled: true,
    splash: {
      image: './src/assets/images/splashScreen.png',
      resizeMode: 'contain'
    },
    ios: {
      bundleIdentifier: 'com.simform.rnduo',
      infoPlist: {
        NSCameraUsageDescription: 'This app requires to access your photo library'
      }
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './src/assets/icons/adaptiveIcon.png',
        backgroundColor: '#ffffff'
      },

      package: 'com.simform.rnduo',
      permissions: ['CAMERA'],
      intentFilters: [
        {
          action: 'VIEW',
          data: [
            {
              scheme: 'rnduo'
            }
          ],
          category: ['BROWSABLE', 'DEFAULT']
        }
      ]
    },
    web: {
      bundler: 'metro',
      output: 'single'
    },
    plugins: [
      'expo-localization',
      'expo-asset',
      'expo-font',
      [
        'expo-splash-screen',
        {
          image: './src/assets/images/splashScreen.png',
          resizeMode: 'contain'
        }
      ],
      [
        'expo-build-properties',
        {
          android: {
            minSdkVersion: 30,
            enableProguardInReleaseBuilds: true,
            extraProguardRules: defineProGuardRules(bundleIdentifier)
          },
          ios: {
            deploymentTarget: '16.4'
          }
        }
      ],
      [
        'react-native-permissions',
        {
          iosPermissions: ['Camera']
        }
      ],
      ['./withCustomSigning']
    ],
    extra: {
      ...process.env
    }
  };
};

export default defineConfig;
