import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	Quiz: a
		.model({
			title: a.string().required(),
			description: a.string(),
			category: a.string(),
			difficulty: a.enum(["easy", "medium", "hard"]),
			questions: a.hasMany("QuizQuestion", "quizId"),
			attempts: a.hasMany("QuizAttempt", "quizId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),

	QuizQuestion: a
		.model({
			quizId: a.id().required(),
			quiz: a.belongsTo("Quiz", "quizId"),
			questionId: a.id().required(),
			question: a.belongsTo("Question", "questionId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),

	Question: a
		.model({
			text: a.string().required(),
			options: a.string().array().required(),
			correctAnswer: a.integer().required(),
			explanation: a.string(),
			quiz: a.belongsTo("QuizQuestion", "questionId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	User: a
		.model({
			username: a.string().required(),
			email: a.email().required(),
			quizAttempts: a.hasMany("QuizAttempt", "userId"),
		})
		.authorization((allow) => [allow.owner()]),
	QuizAttempt: a
		.model({
			startTime: a.date().required(),
			endTime: a.date(),
			score: a.integer(),
			userId: a.id().required(),
			user: a.belongsTo("User", "userId"),
			quizId: a.id().required(),
			quiz: a.belongsTo("Quiz", "quizId"),
			answers: a.hasMany("Answer", "quizAttemptId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Answer: a
		.model({
			questionId: a.string().required(),
			selectedOption: a.integer().required(),
			isCorrect: a.boolean().required(),
			quizAttemptId: a.id().required(),
			quizAttempt: a.belongsTo("QuizAttempt", "quizAttemptId"),
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
