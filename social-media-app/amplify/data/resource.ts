import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	User: a
		.model({
			name: a.string().required(),
			email: a.email().required(),
			posts: a.hasMany("Post", "userId"),
			comments: a.hasMany("Comment", "userId"),
		})
		.authorization((allow) => [allow.owner()]),
	Post: a
		.model({
			userId: a.id(),
			content: a.string().required(),
			author: a.belongsTo("User", "userId"),
			likes: a.integer(),
			comments: a.hasMany("Comment", "postId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Comment: a
		.model({
			userId: a.id(),
			postId: a.id(),
			content: a.string().required(),
			author: a.belongsTo("User", "userId"),
			post: a.belongsTo("Post", "postId"),
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
