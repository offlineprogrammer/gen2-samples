import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for SmartHome Hub",
      verificationEmailBody: (createCode) =>
        `Welcome to SmartHome Hub! Your verification code is: ${createCode()}`,
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
        "https://yoursmarthomeapp.com/",
      ],
      logoutUrls: ["http://localhost:3000/", "https://yoursmarthomeapp.com/"],
    },
  },
  userAttributes: {
    address: {
      required: false,
      mutable: true,
    },
  },
  groups: ["Homeowners", "FamilyMembers", "Administrators"],

  multifactor: {
    mode: "REQUIRED",
    sms: true,
    totp: true,
  },
});
