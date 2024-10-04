import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	Instructor: a
		.model({
			name: a.string().required(),
			bio: a.string(),
			courses: a.hasMany("Course", "instructorId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Student: a
		.model({
			name: a.string().required(),
			enrollments: a.hasMany("Enrollment", "studentId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Course: a
		.model({
			title: a.string().required(),
			description: a.string().required(),
			instructorId: a.id().required(),
			instructor: a.belongsTo("Instructor", "instructorId"),
			lessons: a.hasMany("Lesson", "courseId"),
			enrollments: a.hasMany("Enrollment", "courseId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Lesson: a
		.model({
			title: a.string().required(),
			content: a.string().required(),
			order: a.integer().required(),
			courseId: a.id().required(),
			course: a.belongsTo("Course", "courseId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),

	Enrollment: a
		.model({
			studentId: a.id().required(),
			student: a.belongsTo("Student", "studentId"),
			courseId: a.id().required(),
			course: a.belongsTo("Course", "courseId"),
			progress: a.float(),
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
