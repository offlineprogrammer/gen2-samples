import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Restaurant: a
    .model({
      name: a.string().required(),
      address: a.string().required(),
      cuisine: a.string(),
      openingHours: a.string(),
      tables: a.hasMany("Table", "resturantId"),
      menu: a.hasMany("MenuItem", "resturantId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Table: a
    .model({
      number: a.integer().required(),
      capacity: a.integer().required(),
      isAvailable: a.boolean().required(),
      resturantId: a.id().required(),
      restaurant: a.belongsTo("Restaurant", "resturantId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  MenuItem: a
    .model({
      name: a.string().required(),
      description: a.string(),
      price: a.float().required(),
      category: a.enum(["appetizer", "main", "dessert", "beverage"]),
      resturantId: a.id().required(),
      restaurant: a.belongsTo("Restaurant", "resturantId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  User: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      phone: a.string(),
      reservations: a.hasMany("Reservation", "userId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Reservation: a
    .model({
      date: a.date().required(),
      time: a.string().required(),
      partySize: a.integer().required(),
      status: a.enum(["pending", "confirmed", "cancelled"]),
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
      restaurantId: a.id().required(),
      restaurant: a.belongsTo("Restaurant", "restaurantId"),
      tableId: a.id().required(),
      table: a.belongsTo("Table", "tableId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Review: a
    .model({
      rating: a.integer().required(),
      comment: a.string(),
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
      restaurantId: a.id().required(),
      restaurant: a.belongsTo("Restaurant", "restaurantId"),
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
