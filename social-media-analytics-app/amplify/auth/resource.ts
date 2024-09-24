import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
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
        "https://yoursocialanalyticsapp.com/auth",
      ],
      logoutUrls: [
        "http://localhost:3000/",
        "https://yoursocialanalyticsapp.com/",
      ],
    },
  },
  userAttributes: {
    preferredUsername: {
      required: true,
      mutable: false,
    },

    "custom:role": {
      dataType: "String",
      maxLen: 20,
      mutable: false,
    },
    "custom:preferredPlatforms": {
      dataType: "String",
      maxLen: 100,
      mutable: false,
    },
  },
  groups: ["Clients", "Analysts", "Administrators"],
});
