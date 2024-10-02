import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for FreelanceConnect",
      verificationEmailBody: (createCode) =>
        `Welcome to FreelanceConnect! Your verification code is: ${createCode()}`,
    },
    phone: {
      verificationMessage: (createCode) =>
        "Welcome to FreelanceConnect! Your verification code is: " +
        createCode(),
    },
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
      },
      signInWithApple: {
        clientId: secret("SIWA_CLIENT_ID"),
        keyId: secret("SIWA_KEY_ID"),
        privateKey: secret("SIWA_PRIVATE_KEY"),
        teamId: secret("SIWA_TEAM_ID"),
      },
      callbackUrls: [
        "http://localhost:3000/",
        "https://yourfreelanceapp.com/",
      ],
      logoutUrls: ["http://localhost:3000/", "https://yourfreelanceapp.com/"],
    },
  },
  userAttributes: {
    "custom:role": {
      dataType: "String",
      maxLen: 20,
      mutable: false,
    },
    profilePicture: {
      required: false,
      mutable: true,
    },
    "custom:location": {
      dataType: "String",
      maxLen: 100,
      mutable: true,
    },
  },
  groups: ["Freelancers", "Clients"],

  multifactor: {
    mode: "REQUIRED",
    sms: true,
  },
});
