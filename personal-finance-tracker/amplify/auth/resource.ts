import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for FinTrack",
      verificationEmailBody: (createCode) =>
        "Welcome to FinTrack! Your verification code is: " + createCode(),
    },
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET')
      },
      signInWithApple: {
        clientId: secret('SIWA_CLIENT_ID'),
        keyId: secret('SIWA_KEY_ID'),
        privateKey: secret('SIWA_PRIVATE_KEY'),
        teamId: secret('SIWA_TEAM_ID')
      },
      callbackUrls: [
        'http://localhost:3000/auth',
        'https://yourfinanceapp.com/auth'
      ],
      logoutUrls: [
        'http://localhost:3000/',
        'https://yourfinanceapp.com/'
      ],
    },
  },
  userAttributes: {
    "custom:currency": {
      dataType: "String",
      mutable: true,
    },
    "custom:monthlyBudget": {
      dataType: "Number",
      mutable: true,
    },
  },
  multifactor: {
    mode: 'REQUIRED',
    sms: true,
    totp: true,
  },

});