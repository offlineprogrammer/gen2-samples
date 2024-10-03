import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
	loginWith: {
		email: {
			verificationEmailStyle: "CODE",
			verificationEmailSubject:
				"Verify your email for the Healthcare Appointment Scheduling App",
			verificationEmailBody: (createCode) =>
				`Welcome to the App ! Your verification code is: ${createCode()}`,
		},
	},

	userAttributes: {
		preferredUsername: {
			mutable: true,
			required: false,
		},
	},
});
