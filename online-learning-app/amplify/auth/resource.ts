import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Verify your email for EduLearn",
      verificationEmailBody: "Welcome to EduLearn! Your verification code is {####}",
    },
    phone: true,
  },
  userAttributes: {
    "custom:role": {
      dataType: 'String',
      maxLength: 20,
      required: true,
      mutable: false,
    },
    "custom:educationLevel": {
      dataType: 'String',
      maxLength: 20,
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
    'role',
  ],
  callbackUrls: [
    'http://localhost:3000/auth',
    'https://youreduapp.com/auth'
  ],
  logoutUrls: [
    'http://localhost:3000/',
    'https://youreduapp.com/'
  ],
});