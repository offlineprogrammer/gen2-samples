import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	User: a
		.model({
			name: a.string().required(),
			email: a.email().required(),
			tasks: a.hasMany("Task", "userId"),
			projects: a.hasMany("ProjectUser", "userId"),
		})
		.authorization((allow) => [
			allow.group("Admin").to(["read"]),
			allow.owner(),
		]),

	Task: a
		.model({
			title: a.string().required(),
			description: a.string(),
			status: a.enum(["todo", "in_progress", "done"]),
			dueDate: a.date(),
			userId: a.id(),
			assignee: a.belongsTo("User", "userId"),
			projectId: a.id(),
			project: a.belongsTo("Project", "projectId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Project: a
		.model({
			name: a.string().required(),
			description: a.string(),
			tasks: a.hasMany("Task", "projectId"),
			members: a.hasMany("ProjectUser", "projectId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	ProjectUser: a
		.model({
			projectId: a.id().required(),
			userId: a.id().required(),
			project: a.belongsTo("Project", "projectId"),
			user: a.belongsTo("User", "userId"),
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
