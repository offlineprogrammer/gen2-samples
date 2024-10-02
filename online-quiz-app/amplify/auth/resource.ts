import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    externalProviders: {
      google: {
        clientId: secret('GOOGLE_CLIENT_ID'),
        clientSecret: secret('GOOGLE_CLIENT_SECRET')
      },
      signInWithApple: {
        clientId: secret('SIWA_CLIENT_ID'),
        keyId: secret('SIWA_KEY_ID'),
        privateKey: secret('SIWA_PRIVATE_KEY'),
        teamId: secret('SIWA_TEAM_ID')
      },
      loginWithAmazon: {
        clientId: secret('LOGINWITHAMAZON_CLIENT_ID'),
        clientSecret: secret('LOGINWITHAMAZON_CLIENT_SECRET')
      },
      facebook: {
        clientId: secret('FACEBOOK_CLIENT_ID'),
        clientSecret: secret('FACEBOOK_CLIENT_SECRET')
      },
      callbackUrls: [
        "http://localhost:3000/",
        "https://yourdomain.com/",
      ],
      logoutUrls: ["http://localhost:3000/", "https://yourdomain.com/"],
    },
  },
});
