import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	User: a
		.model({
			name: a.string().required(),
			email: a.email().required(),
			projects: a.hasMany("ProjectUsser", "userId"),
			tasks: a.hasMany("Task", "userId"),
			comments: a.hasMany("Comment", "userId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),

	ProjectUser: a
		.model({
			projectId: a.id().required(),
			project: a.belongsTo("Project", "projectId"),
			userId: a.id().required(),
			user: a.belongsTo("User", "userId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),

	Project: a
		.model({
			name: a.string().required(),
			description: a.string(),
			startDate: a.date().required(),
			endDate: a.date(),
			status: a.enum(["planning", "in_progress", "completed", "on_hold"]),
			members: a.hasMany("ProjectUser", "projectId"),
			tasks: a.hasMany("Task", "projectId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Task: a
		.model({
			title: a.string().required(),
			description: a.string(),
			status: a.enum(["todo", "in_progress", "review", "done"]),
			priority: a.enum(["low", "medium", "high"]),
			dueDate: a.date(),
			userId: a.id().required(),
			assignee: a.belongsTo("User", "userId"),
			projectId: a.id().required(),
			project: a.belongsTo("Project", "projectId"),
			comments: a.hasMany("Comment", "taskId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Comment: a
		.model({
			content: a.string().required(),
			userId: a.id().required(),
			author: a.belongsTo("User", "userId"),
			taskId: a.id().required(),
			task: a.belongsTo("Task", "taskId"),
			createdAt: a.date().required(),
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
