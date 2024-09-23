import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for PodcastPro",
      verificationEmailBody: (createCode) =>
        `Welcome to PodcastPro! Your verification code is: ${createCode()}`,
    },
    phone: true,
  },
  userAttributes: {
    profilePicture: {
      required: false,
      mutable: true,
    },
  },

  multifactor: {
    mode: "OPTIONAL",
    sms: true,
    totp: true,
  },
});
