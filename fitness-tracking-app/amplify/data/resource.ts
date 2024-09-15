import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a
    .model({
      name: a.string().required(),
      workouts: a.hasMany("WorkoutUser", "userId"),
      goals: a.hasMany("Goal", "userId"),
    })
    .authorization((allow) => [allow.owner()]),

  WorkoutUser: a
    .model({
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
      workoutId: a.id().required(),
      workout: a.belongsTo("Workout", "workoutId"),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Workout: a
    .model({
      date: a.date().required(),
      duration: a.integer().required(),
      type: a.enum(["cardio", "strength", "flexibility"]),
      exercises: a.hasMany("Exercise", "workoutId"),
      users: a.hasMany("WorkoutUser", "workoutId"),
    })
    .authorization((allow) => [
      // Allow public to read workouts
      allow.publicApiKey().to(["read"]),
      // Allow owner to create, update, delete workouts
      allow.owner(),
    ]),
  Exercise: a
    .model({
      name: a.string().required(),
      sets: a.integer(),
      reps: a.integer(),
      weight: a.float(),
      workoutId: a.id().required(),
      workout: a.belongsTo("Workout", "workoutId"),
    })
    .authorization((allow) => [
      // Allow public to read exercises
      allow.publicApiKey().to(["read"]),
      // Allow owner to create, update, delete exercises
      allow.owner(),
    ]),

  Goal: a
    .model({
      description: a.string().required(),
      targetDate: a.date().required(),
      achieved: a.boolean().required(),
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
