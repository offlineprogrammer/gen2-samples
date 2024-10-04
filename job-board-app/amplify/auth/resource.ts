import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
	loginWith: {
		email: true,
		externalProviders: {
			saml: {
				name: "MicrosoftEntraIDSAML",
				metadata: {
					metadataContent: "<your-url-hosting-saml-metadata>", // or content of the metadata file
					metadataType: "URL", // or 'FILE'
				},
			},
			logoutUrls: ["http://localhost:3000/", "https://mywebsite.com"],
			callbackUrls: ["http://localhost:3000/", "https://mywebsite.com/"],
		},
	},
});
