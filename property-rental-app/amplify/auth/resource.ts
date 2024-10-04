import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
	loginWith: {
		email: {
			verificationEmailStyle: "CODE",
			verificationEmailSubject: "Verify your email for RentalPro",
			verificationEmailBody: (createCode) =>
				`Welcome to RentalPro! Your verification code is: ${createCode()}`,
		},
	},
	userAttributes: {
		"custom:role": {
			dataType: "String",
			mutable: true,
		},
	},
	groups: ["Landlords", "Tenants", "Administrators"],
	multifactor: {
		mode: "OPTIONAL",
		totp: true,
	},
});
