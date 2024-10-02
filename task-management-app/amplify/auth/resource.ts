import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for TaskMaster",
      verificationEmailBody: (createCode) =>
        "Welcome to TaskMaster! Your verification code is: " + createCode(),
    },
    phone: true,
  },
  userAttributes: {
    "custom:role": {
      dataType: "String",
      maxLen: 20,
      mutable: false,
    },
    "custom:team": {
      dataType: "String",
      maxLen: 100,
      mutable: false,
    },
  },
  groups: ["Managers", "TeamMembers", "Administrators"],

  multifactor: {
    mode: "REQUIRED",
    sms: true,
    totp: true,
  },
});
