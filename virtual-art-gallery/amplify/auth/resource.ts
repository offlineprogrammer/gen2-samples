import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for Virtual Art Gallery",
      verificationEmailBody: (createCode) =>
        `Welcome to Virtual Art Gallery! Your verification code is: ${createCode()}`,
    },
    phone: {
      verificationMessage: (createCode) =>
        "Welcome to Virtual Art Gallery! Your verification code is: " +
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
      facebook: {
        clientId: secret("FACEBOOK_CLIENT_ID"),
        clientSecret: secret("FACEBOOK_CLIENT_SECRET"),
      },
      callbackUrls: [
        "http://localhost:3000/auth",
        "https://yourvirtualgallery.com/auth",
      ],
      logoutUrls: ["http://localhost:3000/", "https://yourvirtualgallery.com/"],
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
    "custom:lastVisitDate": {
      dataType: "DateTime",
      mutable: true,
    },
  },
  groups: ["Artists", "Visitors", "Administrators"],

  multifactor: {
    mode: "REQUIRED",
    sms: true,
  },
});
