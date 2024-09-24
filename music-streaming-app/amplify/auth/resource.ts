import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for MusicStream",
      verificationEmailBody: (createCode) =>
        `Welcome to MusicStream! Your verification code is: ${createCode()}`,
    },
    phone: true,
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
        "https://yourmusicapp.com/auth",
      ],
      logoutUrls: ["http://localhost:3000/", "https://yourmusicapp.com/"],
    },
  },
  userAttributes: {
    "custom:preferredGenres": {
      dataType: "String",

      mutable: true,
    },
    "custom:favoriteArtists": {
      dataType: "String",

      mutable: true,
    },

    birthdate: {
      mutable: true,
      required: false,
    },
  },
  multifactor: {
    mode: "OPTIONAL",
    sms: true,
  },
});
