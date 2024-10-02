import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for RestReserv",
      verificationEmailBody: (createCode) =>
        `Welcome to RestReserv! Your verification code is: ${createCode()}`,
    },

    phone: true,
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
      },
      callbackUrls: [
        "http://localhost:3000/",
        "https://yourdineaseapp.com/",
      ],
      logoutUrls: ["http://localhost:3000/", "https://yourdineaseapp.com/"],
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

    "custom:lastReservationDate": {
      dataType: "DateTime",

      mutable: true,
    },
  },
  groups: ["Customers", "RestaurantOwners", "Administrators"],

  multifactor: {
    mode: "OPTIONAL",
    sms: true,
    totp: true,
  },
});
