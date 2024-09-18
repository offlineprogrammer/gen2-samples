import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Language: a
    .model({
      name: a.string().required(),
      courses: a.hasMany("Course", "languageId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Course: a
    .model({
      title: a.string().required(),
      description: a.string(),
      languageId: a.id().required(),
      language: a.belongsTo("Language", "languageId"),
      lessons: a.hasMany("Lesson", "courseId"),
      difficulty: a.enum(["beginner", "intermediate", "advanced"]).required(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Lesson: a
    .model({
      title: a.string().required(),
      content: a.string().required(),
      courseId: a.id().required(),
      course: a.belongsTo("Course", "courseId"),
      exercises: a.hasMany("Exercise", "lessonId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Exercise: a
    .model({
      question: a.string().required(),
      answers: a.string().array().required(),
      correctAnswer: a.integer().required(),
      lessonId: a.id().required(),
      lesson: a.belongsTo("Lesson", "lessonId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  User: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      progress: a.hasMany("Progress", "userId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Progress: a
    .model({
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
      courseId: a.id().required(),
      course: a.belongsTo("Course", "courseId"),
      score: a.integer(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
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
