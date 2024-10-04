import { defineAuth, secret } from "@aws-amplify/backend";

export const auth = defineAuth({
	loginWith: {
		email: {
			verificationEmailStyle: "CODE",
			verificationEmailSubject: "Verify your email for PetPal",
			verificationEmailBody: (createCode) =>
				`Welcome to PetPal! Your verification code is: ${createCode()}`,
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
				"https://yourpetadoptionapp.com/",
			],
			logoutUrls: ["http://localhost:3000/", "https://yourpetadoptionapp.com/"],
		},
	},
	userAttributes: {
		preferredUsername: {
			required: true,
			mutable: false,
		},
		address: {
			required: false,
			mutable: true,
		},
		"custom:preferredPetTypes": {
			dataType: "String",
			mutable: true,
		},
	},

	multifactor: {
		mode: "OPTIONAL",
		sms: true,
	},
});
