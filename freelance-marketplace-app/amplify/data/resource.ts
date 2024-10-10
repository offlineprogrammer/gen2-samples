import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	Freelancer: a
		.model({
			name: a.string().required(),
			skills: a.string().array(),
			hourlyRate: a.float(),
			projects: a.hasMany("Project", "freelancerId"),
			bids: a.hasMany("BidFreelancer", "freelancerId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Client: a
		.model({
			name: a.string().required(),
			company: a.string(),
			projects: a.hasMany("Project", "clientId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Project: a
		.model({
			title: a.string().required(),
			description: a.string().required(),
			budget: a.float(),
			deadline: a.date(),
			status: a.enum(["open", "in_progress", "completed"]),
			clientId: a.id().required(),
			client: a.belongsTo("Client", "clientId"),
			freelancerId: a.id(),
			freelancer: a.belongsTo("Freelancer", "freelancerId"),
			bids: a.hasMany("Bid", "projectId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Bid: a
		.model({
			amount: a.float().required(),
			proposal: a.string(),
			status: a.enum(["pending", "accepted", "rejected"]),
			projectId: a.id().required(),
			project: a.belongsTo("Project", "projectId"),
			bidfreelancers: a.hasMany("BidFreelancer", "bidId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	BidFreelancer: a
		.model({
			freelancerId: a.id().required(),
			freelancer: a.belongsTo("Freelancer", "freelancerId"),
			bidId: a.id().required(),
			bid: a.belongsTo("Bid", "bidId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "userPool",
	},
});
