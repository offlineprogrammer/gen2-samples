import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Podcast: a
    .model({
      name: a.string().required(),
      description: a.string(),
      author: a.string().required(),
      episodes: a.hasMany("Episode", "podcastId"),
      subscriptions: a.hasMany("Subscription", "subscriptionId"),
    })
    .authorization((allow) => [
      // Allow public to read instructors
      allow.publicApiKey().to(["read"]),
      // Allow owner to create, update, delete Instructors
      allow.owner(),
    ]),

  Episode: a
    .model({
      title: a.string().required(),
      description: a.string(),
      audioUrl: a.string().required(),
      duration: a.integer(),
      publishDate: a.date(),
      podcastId: a.id().required(),
      podcast: a.belongsTo("Podcast", "podcastId"),
    })
    .authorization((allow) => [
      // Allow public to read instructors
      allow.publicApiKey().to(["read"]),
      // Allow owner to create, update, delete Instructors
      allow.owner(),
    ]),

  Subscription: a
    .model({
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
      podcastId: a.id().required(),
      podcast: a.belongsTo("Podcast", "podcastId"),
    })
    .authorization((allow) => [
      // Allow public to read instructors
      allow.publicApiKey().to(["read"]),
      // Allow owner to create, update, delete Instructors
      allow.owner(),
    ]),

  User: a
    .model({
      username: a.string().required(),
      email: a.string().required(),
      subscriptions: a.hasMany("Subscription", "userId"),
    })
    .authorization((allow) => [
      // Allow public to read instructors
      allow.publicApiKey().to(["read"]),
      // Allow owner to create, update, delete Instructors
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
