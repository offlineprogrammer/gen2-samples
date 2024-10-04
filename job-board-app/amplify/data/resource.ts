import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	Employer: a
		.model({
			name: a.string().required(),
			industry: a.string(),
			jobListings: a.hasMany("JobListing", "employerId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),

	JobSeeker: a
		.model({
			name: a.string().required(),
			applications: a.hasMany("ApplicationJobSeeker", "jobSeekerId"),
		})
		.authorization((allow) => [allow.owner()]),

	JobListing: a
		.model({
			title: a.string().required(),
			description: a.string().required(),
			salary: a.float(),
			location: a.string(),
			employerId: a.id().required(),
			employer: a.belongsTo("Employer", "employerId"),
			applications: a.hasMany("Application", "jobListingId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),

	Application: a
		.model({
			status: a.enum(["pending", "reviewed", "accepted", "rejected"]),
			jobSeeker: a.belongsTo("applicationJobSeeker", "applicationId"),
			jobListingId: a.id().required(),
			jobListing: a.belongsTo("JobListing", "jobListingId"),
		})
		.authorization((allow) => [allow.owner()]),

	ApplicationJobSeeker: a
		.model({
			applicationId: a.id().required(),
			jobSeekerId: a.id().required(),
			application: a.belongsTo("Application", "applicationId"),
			jobSeeker: a.belongsTo("JobSeeker", "jobSeekerId"),
		})
		.authorization((allow) => [allow.authenticated()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "userPool",
	},
});
