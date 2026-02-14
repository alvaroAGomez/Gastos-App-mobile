import { SocialProvider } from '../models/social-auth.models';

export const SOCIAL_AUTH_CONFIG = {
  providers: {
    [SocialProvider.GOOGLE]: {
      scopes: ['email', 'profile'],
      clientId: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
      iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
      serverClientId: 'YOUR_SERVER_CLIENT_ID.apps.googleusercontent.com'
    },
    [SocialProvider.TWITTER]: {
      consumerKey: 'YOUR_TWITTER_CONSUMER_KEY',
      consumerSecret: 'YOUR_TWITTER_CONSUMER_SECRET'
    },
    [SocialProvider.FACEBOOK]: {
      appId: 'YOUR_FACEBOOK_APP_ID',
      appName: 'GastosApp',
      permissions: ['email', 'public_profile']
    },
    [SocialProvider.APPLE]: {
      clientId: 'com.yourdomain.app.service',
      redirectUrl: 'https://your-backend-api.com/auth/apple/callback',
      scopes: 'name email'
    }
  },
  firebase: {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-app-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
