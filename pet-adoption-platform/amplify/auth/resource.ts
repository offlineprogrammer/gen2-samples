import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Verify your email for PetPal Adoption",
      verificationEmailBody: "Welcome to PetPal! Your verification code is {####}",
    },
    phone: true,
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET'),
      },
      facebook: {
        clientId: secret('FACEBOOK_CLIENT_ID'),
        clientSecret: secret('FACEBOOK_CLIENT_SECRET'),
      },
    },
  },
  userAttributes: {
    name: {
      required: true,
      mutable: false,
    },
    address: {
      required: false,
      mutable: true,
    },
    "custom:preferredPetTypes": {
      required: false,
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
  ],
  verificationMechanisms: ['email'],
  callbackUrls: [
    'http://localhost:3000/auth',
    'https://yourpetadoptionapp.com/auth'
  ],
  logoutUrls: [
    'http://localhost:3000/',
    'https://yourpetadoptionapp.com/'
  ],
});