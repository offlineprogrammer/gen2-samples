import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Verify your email for PodcastPro",
      verificationEmailBody: "Welcome to PodcastPro! Your verification code is {####}",
    },
    phone: true,
  },
  userAttributes: {
    name: {
      required: true,
      mutable: false,
    },
   
    picture: {
      required: false,
      mutable: true,
    },

  },
 
  multifactor: {
    mode: 'OPTIONAL',
    sms: true,
    totp: true,
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
    'picture',
  ],
  
  verificationMechanisms: ['email'],
  callbackUrls: [
    'http://localhost:3000/auth',
    'https://yourpodcastapp.com/auth'
  ],
  logoutUrls: [
    'http://localhost:3000/',
    'https://yourpodcastapp.com/'
  ],
});