import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gastosapp.mobile',
  appName: 'GastosAppMobile',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: 'YOUR_SERVER_CLIENT_ID.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
    FacebookLogin: {
       appId: 'YOUR_FACEBOOK_APP_ID',
       appName: 'GastosApp',
       permissions: ['email', 'public_profile']
    }
  }
};

export default config;
