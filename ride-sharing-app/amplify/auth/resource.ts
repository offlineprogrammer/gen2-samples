import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for RideShare",
      verificationEmailBody: (createCode) =>
        `Welcome to RideShare! Your verification code is: ${createCode()}`,
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
      callbackUrls: [
        "http://localhost:3000/",
        "https://yourrideapp.com/",
      ],
      logoutUrls: ["http://localhost:3000/", "https://yourrideapp.com/"],
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

    profilePicture: {
      required: false,
      mutable: true,
    },
    "custom:driverLicenseNo": {
      dataType: "String",
      maxLen: 40,
      mutable: true,
    },
    "custom:carModel": {
      dataType: "String",
      maxLen: 20,

      mutable: true,
    },
  },
  groups: ["Drivers", "Riders"],

  multifactor: {
    mode: "OPTIONAL",
    sms: true,
    totp: true,
  },
});
