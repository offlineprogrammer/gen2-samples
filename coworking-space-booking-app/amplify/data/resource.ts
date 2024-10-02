import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      bookings: a.hasMany("Booking", "userId"),
    })
    .authorization((allow) => [
      allow.group('Admin').to(["read"]),
      allow.owner(),
    ]),
  Space: a
    .model({
      name: a.string().required(),
      capacity: a.integer().required(),
      amenities: a.hasMany("SpaceAmenity", "spaceId"),
      bookings: a.hasMany("Booking", "spaceId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Booking: a
    .model({
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
      spaceId: a.id().required(),
      space: a.belongsTo("Space", "spaceId"),
      startTime: a.date().required(),
      endTime: a.date().required(),
      status: a.enum(["pending", "confirmed", "cancelled"]),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  SpaceAmenity: a
    .model({
      spaceId: a.id().required(),
      space: a.belongsTo("Space", "spaceId"),
      amenityId: a.id().required(),
      amenity: a.belongsTo("Amenity", "amenityId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Amenity: a
    .model({
      name: a.string().required(),
      description: a.string(),
      spaces: a.hasMany("SpaceAmenity", "amenityId"),
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
