import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
    externalProviders: {
      facebook: {
        clientId: secret("FACEBOOK_CLIENT_ID"),
        clientSecret: secret("FACEBOOK_CLIENT_SECRET"),
      },
      loginWithAmazon: {
        clientId: secret('LOGINWITHAMAZON_CLIENT_ID'),
        clientSecret: secret('LOGINWITHAMAZON_CLIENT_SECRET')
      },
      callbackUrls: [
        "http://localhost:3000/",
        "https://yourdomain.com/",
      ],
      logoutUrls: ["http://localhost:3000/", "https://yourdomain.com/"],
    },
  },
});
