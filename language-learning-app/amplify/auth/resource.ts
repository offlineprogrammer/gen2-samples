import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Verify your email for LanguageLearn",
      verificationEmailBody: "Welcome to LanguageLearn! Your verification code is {####}",
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
    },
  },
  userAttributes: {
    preferredLanguage: {
      required: true,
      mutable: true,
    },
    nativeLanguage: {
      required: true,
      mutable: true,
    },
    proficiencyLevel: {
      required: false,
      mutable: true,
    },
    learningGoals: {
      required: false,
      mutable: true,
    },
  },
  multifactor: {
    mode: 'OPTIONAL',
    sms: true,
  },
  passwordPolicy: {
    minLength: 8,
    requireNumbers: true,
    requireSpecialCharacters: true,
    requireUppercase: true,
    requireLowercase: true,
  },
  signUpAttributes: [
    'email',
    'name',
    'preferredLanguage',
    'nativeLanguage',
  ],
  callbackUrls: [
    'http://localhost:3000/auth',
    'https://yourlanguageapp.com/auth'
  ],
  logoutUrls: [
    'http://localhost:3000/',
    'https://yourlanguageapp.com/'
  ],
});