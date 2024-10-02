import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for SalonBooker",
      verificationEmailBody: (createCode) =>
        `Welcome to SalonBooker! Your verification code is: ${createCode()}`,
    },
    phone: true,
    externalProviders: {
      google: {
        clientId: secret("GOOGLE_CLIENT_ID"),
        clientSecret: secret("GOOGLE_CLIENT_SECRET"),
      },
      facebook: {
        clientId: secret("FACEBOOK_CLIENT_ID"),
        clientSecret: secret("FACEBOOK_CLIENT_SECRET"),
      },
      callbackUrls: [
        "http://localhost:3000/",
        "https://yoursalonapp.com/",
      ],
      logoutUrls: ["http://localhost:3000/", "https://yoursalonapp.com/"],
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

    "custom:preferredSalon": {
      dataType: "String",
      maxLen: 100,
      mutable: true,
    },
    "custom:bookingCount": {
      dataType: "Number",
      mutable: true,
    },
    "custom:lastBookingDate": {
      dataType: "DateTime",
      mutable: true,
    },
  },
  groups: ["Customers", "SalonOwners", "Stylists"],

  multifactor: {
    mode: "REQUIRED",
    sms: true,
  },
});
