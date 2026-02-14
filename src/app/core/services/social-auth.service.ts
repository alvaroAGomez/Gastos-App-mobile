import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FacebookLogin, FacebookLoginResponse } from '@capacitor-community/facebook-login';
import { SignInWithApple, SignInWithAppleResponse, SignInWithAppleOptions } from '@capacitor-community/apple-sign-in';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { map, switchMap, tap, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { StorageService } from './storage.service';
import { ENDPOINTS } from '../constants/endpoints';
import { SocialProvider, SocialAuthResult, SocialUserInfo } from '../models/social-auth.models';
import { SOCIAL_AUTH_CONFIG } from '../config/social-auth.config';

@Injectable({
  providedIn: 'root'
})
export class SocialAuthService {
  private user$ = new BehaviorSubject<SocialUserInfo | null>(null);

  constructor(
    private api: ApiService,
    private storage: StorageService
  ) {
    this.initialize();
  }

  private initialize() {
    // Initialize Google Auth
    GoogleAuth.initialize({
      clientId: SOCIAL_AUTH_CONFIG.providers.google.clientId,
      scopes: SOCIAL_AUTH_CONFIG.providers.google.scopes,
      grantOfflineAccess: true,
    });
  }

  // Google Login
  async loginWithGoogle(): Promise<SocialAuthResult> {
    try {
      const googleUser = await GoogleAuth.signIn();
      const result: SocialAuthResult = {
        provider: SocialProvider.GOOGLE,
        token: googleUser.authentication.accessToken,
        idToken: googleUser.authentication.idToken,
        user: {
          id: googleUser.id,
          email: googleUser.email,
          name: googleUser.name,
          photoUrl: googleUser.imageUrl,
          provider: SocialProvider.GOOGLE
        }
      };
      return result;
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw error;
    }
  }

  // Facebook Login
  async loginWithFacebook(): Promise<SocialAuthResult> {
    try {
      const result = await FacebookLogin.login({ permissions: SOCIAL_AUTH_CONFIG.providers.facebook.permissions });
      
      if (result.accessToken && result.accessToken.userId) {
        // Fetch user profile
        const profile = await FacebookLogin.getProfile({ fields: ['email', 'name', 'picture.type(large)'] }) as any;
        
        return {
          provider: SocialProvider.FACEBOOK,
          token: result.accessToken.token,
          user: {
            id: result.accessToken.userId,
            email: profile.email ?? '',
            name: profile.name ?? '',
            photoUrl: profile.picture?.data?.url ?? '',
            provider: SocialProvider.FACEBOOK
          }
        };
      } else {
        throw new Error('Facebook login failed');
      }
    } catch (error) {
      console.error('Facebook Sign-In Error:', error);
      throw error;
    }
  }

  // Apple Login
  async loginWithApple(): Promise<SocialAuthResult> {
    try {
      const options: SignInWithAppleOptions = {
        clientId: SOCIAL_AUTH_CONFIG.providers.apple.clientId,
        redirectURI: SOCIAL_AUTH_CONFIG.providers.apple.redirectUrl,
        scopes: SOCIAL_AUTH_CONFIG.providers.apple.scopes,
        state: '12345',
        nonce: 'nonce',
      };

      const result: SignInWithAppleResponse = await SignInWithApple.authorize(options);
      
      return {
        provider: SocialProvider.APPLE,
        token: result.response.identityToken,
        authorizationCode: result.response.authorizationCode,
        user: {
          id: result.response.user || '',
          email: result.response.email || null,
          name: (result.response.givenName && result.response.familyName) 
            ? `${result.response.givenName} ${result.response.familyName}`
            : null,
          photoUrl: null,
          provider: SocialProvider.APPLE
        }
      };
    } catch (error) {
      console.error('Apple Sign-In Error:', error);
      throw error;
    }
  }

  // Twitter Login (Note: Twitter usually requires a backend proxy or Firebase because Capacitor plugin support is limited/deprecated)
  // We will assume Firebase Auh handling or a custom web-based flow if needed.
  // For this implementation, we'll placeholder it as pending backend implementation or skipping specific capacitor plugin if not available.
  // Actually, let's use Firebase for Twitter as it's the most reliable way in Capacitor.
  
  // Generic Backend Verification
  verifyWithBackend(socialResult: SocialAuthResult): Observable<any> {
    let endpoint = '';
    switch (socialResult.provider) {
      case SocialProvider.GOOGLE:
        endpoint = ENDPOINTS.auth.social.google;
        break;
      case SocialProvider.FACEBOOK:
        endpoint = ENDPOINTS.auth.social.facebook;
        break;
      case SocialProvider.APPLE:
        endpoint = ENDPOINTS.auth.social.apple;
        break;
      case SocialProvider.TWITTER:
        endpoint = ENDPOINTS.auth.social.twitter;
        break;
    }

    return this.api.post(endpoint, {
      token: socialResult.token, // Access Token or ID Token depending on provider
      idToken: socialResult.idToken,
      email: socialResult.user?.email,
      name: socialResult.user?.name,
      photoUrl: socialResult.user?.photoUrl,
      providerId: socialResult.user?.id
    });
  }

  async signOut(): Promise<void> {
    try {
      await GoogleAuth.signOut();
      await FacebookLogin.logout();
      // Apple doesn't have a specific sign out method in the plugin usually, relies on system
    } catch (error) {
      console.error('Error signing out', error);
    }
  }
}
