export enum SocialProvider {
  GOOGLE = 'google',
  TWITTER = 'twitter',
  FACEBOOK = 'facebook',
  APPLE = 'apple'
}

export interface SocialAuthResult {
  provider: SocialProvider;
  token: string;
  idToken?: string;
  nonce?: string;
  authorizationCode?: string;
  user?: SocialUserInfo;
}

export interface SocialUserInfo {
  id: string;
  email: string | null;
  name: string | null;
  photoUrl: string | null;
  provider: SocialProvider;
}

export interface SocialLoginDto {
  provider: string;
  token: string;
  email?: string;
  name?: string;
  photoUrl?: string;
}
