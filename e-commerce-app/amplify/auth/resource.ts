import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      facebook: {
        clientId: secret('FACEBOOK_CLIENT_ID'),
        clientSecret: secret('FACEBOOK_CLIENT_SECRET')
      },
      callbackUrls: [
        "http://localhost:3000/auth",
        "https://yourdomain.com/auth",
      ],
      logoutUrls: ["http://localhost:3000/", "https://yourdomain.com/"],
    },
  },
});
