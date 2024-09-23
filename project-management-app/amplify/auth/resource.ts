import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for ProjectPro",
      verificationEmailBody: (createCode) =>
        `Welcome to ProjectPro! Your verification code is: ${createCode()}`,
    },
  },
  userAttributes: {
    "custom:jobTitle": {
      dataType: "String",
      mutable: true,
    },
  },
  groups: ["ProjectManagers", "TeamMembers", "Administrators"],
  multifactor: {
    mode: "OPTIONAL",
    sms: true,
    totp: true,
  },

});
