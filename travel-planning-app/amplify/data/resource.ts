import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a
    .model({
      name: a.string().required(),
      trips: a.hasMany("Trip", "userId"),
    })
    .authorization((allow) => [allow.owner()]),
  Trip: a
    .model({
      destination: a.string().required(),
      startDate: a.date().required(),
      endDate: a.date().required(),
      budget: a.float(),
      activities: a.hasMany("Activity", "tripId"),
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
    })
    .authorization((allow) => [allow.owner()]),
  Activity: a
    .model({
      name: a.string().required(),
      date: a.date().required(),
      location: a.string(),
      cost: a.float(),
      tripId: a.id().required(),
      trip: a.belongsTo("Trip", "tripId"),
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
