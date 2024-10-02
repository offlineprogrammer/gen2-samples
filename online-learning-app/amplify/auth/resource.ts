import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Verify your email for EduLearn",
      verificationEmailBody: (createCode) =>
        "Welcome to EduLearn! Your verification code is: " + createCode(),
    },
    phone: true,
  },
  userAttributes: {
    "custom:role": {
      dataType: "String",
      maxLen: 20,
      mutable: false,
    },
    "custom:educationLevel": {
      dataType: "String",
      maxLen: 20,
      mutable: true,
    },
  },

  multifactor: {
    mode: "OPTIONAL",
    sms: true,
  },
});
