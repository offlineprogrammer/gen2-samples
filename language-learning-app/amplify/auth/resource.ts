import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for LanguageLearn",
      verificationEmailBody: (createCode) =>
        `Welcome to LanguageLearn! Your verification code is: ${createCode()}`,
    },
    phone: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
      },
      signInWithApple: {
        clientId: secret('SIWA_CLIENT_ID'),
        keyId: secret('SIWA_KEY_ID'),
        privateKey: secret('SIWA_PRIVATE_KEY'),
        teamId: secret('SIWA_TEAM_ID')
      },
      facebook: {
        clientId: secret('FACEBOOK_CLIENT_ID'),
        clientSecret: secret('FACEBOOK_CLIENT_SECRET'),
      },
    },
  },
  userAttributes: {
    "custom:preferredLanguage": {
      dataType: "String",
      required: true,
      mutable: true,
    },
    "custom:nativeLanguage": {
      dataType: "String",
      required: true,
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