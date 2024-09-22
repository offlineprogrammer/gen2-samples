import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailSubject: "Verify your email for ProjectPro",
      verificationEmailBody:
        "Welcome to ProjectPro! Your verification code is {####}",
    },
  },
  userAttributes: {
    name: {
      required: true,
      mutable: true,
    },
    "custom:jobTitle": {
      dataType: "String",
      required: false,
      mutable: true,
    },
  },
  groups: ["ProjectManagers", "TeamMembers", "Administrators"],
  multifactor: {
    mode: "OPTIONAL",
    sms: true,
    totp: true,
  },
  passwordPolicy: {
    minLength: 12,
    requireNumbers: true,
    requireSpecialCharacters: true,
    requireUppercase: true,
    requireLowercase: true,
  },
  signUpAttributes: ["email", "name", "jobTitle"],
  verificationMechanisms: ["email"],
  callbackUrls: [
    "http://localhost:3000/auth",
    "https://yourprojectapp.com/auth",
  ],
  logoutUrls: ["http://localhost:3000/", "https://yourprojectapp.com/"],
});
