import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	User: a
		.model({
			username: a.string().required(),
			status: a.enum(["online", "offline", "away"]),
			conversations: a.hasMany("ConversationUser", "userId"),
			messages: a.hasMany("Message", "senderId"),
		})
		.authorization((allow) => [allow.owner()]),

	ConversationUser: a
		.model({
			conversationId: a.id().required(),
			userId: a.id().required(),
			conversation: a.belongsTo("Conversation", "conversationId"),
			user: a.belongsTo("User", "userId"),
		})
		.authorization((allow) => [allow.owner()]),

	Conversation: a
		.model({
			participants: a.hasMany("ConversationUser", "conversationId"),
			messages: a.hasMany("Message", "conversationId"),
		})
		.authorization((allow) => [allow.authenticated()]),

	Message: a
		.model({
			content: a.string().required(),
			senderId: a.id().required(),
			sender: a.belongsTo("User", "senderId"),
			conversationId: a.id().required(),
			conversation: a.belongsTo("Conversation", "conversationId"),
			timestamp: a.date().required(),
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
