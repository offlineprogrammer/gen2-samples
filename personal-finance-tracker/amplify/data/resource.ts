import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	User: a
		.model({
			name: a.string().required(),
			accounts: a.hasMany("Account", "userId"),
			transactions: a.hasMany("Transaction", "userId"),
			budgets: a.hasMany("Budget", "userId"),
		})
		.authorization((allow) => [allow.owner()]),
	Account: a
		.model({
			name: a.string().required(),
			type: a.enum(["checking", "savings", "credit", "investment"]),
			balance: a.float().required(),
			userId: a.id().required(),
			user: a.belongsTo("User", "userId"),
			transactions: a.hasMany("Transaction", "accountId"),
		})
		.authorization((allow) => [allow.owner()]),
	Transaction: a
		.model({
			date: a.date().required(),
			amount: a.float().required(),
			description: a.string().required(),
			category: a.string(),
			accountId: a.id().required(),
			account: a.belongsTo("Account", "accountId"),
			userId: a.id().required(),
			user: a.belongsTo("User", "userId"),
		})
		.authorization((allow) => [allow.owner()]),
	Budget: a
		.model({
			category: a.string().required(),
			amount: a.float().required(),
			period: a.enum(["weekly", "monthly", "yearly"]),
			userId: a.id().required(),
			user: a.belongsTo("User", "userId"),
		})
		.authorization((allow) => [allow.owner()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "userPool",
	},
});
