import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Verify your email for MusicStream",
      verificationEmailBody: "Welcome to MusicStream! Your verification code is {####}",
    },
    phone: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
      },
      apple: {
        clientId: secret('APPLE_CLIENT_ID'),
        teamId: secret('APPLE_TEAM_ID'),
        keyId: secret('APPLE_KEY_ID'),
        privateKey: secret('APPLE_PRIVATE_KEY'),
      },
      facebook: {
        clientId: secret('FACEBOOK_CLIENT_ID'),
        clientSecret: secret('FACEBOOK_CLIENT_SECRET'),
      },
      spotify: {
        clientId: secret('SPOTIFY_CLIENT_ID'),
        clientSecret: secret('SPOTIFY_CLIENT_SECRET'),
      },
    },
  },
  userAttributes: {
    preferredGenres: {
      required: false,
      mutable: true,
    },
    favoriteArtists: {
      required: false,
      mutable: true,
    },
    subscriptionTier: {
      required: true,
      mutable: true,
    },
    dateOfBirth: {
      required: true,
      mutable: false,
    },
    country: {
      required: true,
      mutable: true,
    },
  },
  multifactor: {
    mode: 'OPTIONAL',
    sms: true,
  },
  passwordPolicy: {
    minLength: 10,
    requireNumbers: true,
    requireSpecialCharacters: true,
    requireUppercase: true,
    requireLowercase: true,
  },
  signUpAttributes: [
    'email',
    'name',
    'dateOfBirth',
    'country',
    'subscriptionTier',
  ],
  callbackUrls: [
    'http://localhost:3000/auth',
    'https://yourmusicapp.com/auth'
  ],
  logoutUrls: [
    'http://localhost:3000/',
    'https://yourmusicapp.com/'
  ],
});