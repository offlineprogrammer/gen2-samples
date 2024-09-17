import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Shelter: a
    .model({
      name: a.string().required(),
      address: a.string().required(),
      phone: a.string(),
      pets: a.hasMany("Pet", "shelterId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Pet: a
    .model({
      name: a.string().required(),
      type: a.string().required(),
      breed: a.string(),
      age: a.integer(),
      description: a.string(),
      imageUrl: a.string(),
      status: a.enum(["available", "adopted", "pending"]),
      shelterId: a.id().required(),
      shelter: a.belongsTo("Shelter", "shelterId"),
      applications: a.hasMany("AdoptionApplication", "petId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Adopter: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      phone: a.string(),
      applications: a.hasMany("AdoptionApplication", "adopterId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  AdoptionApplication: a
    .model({
      status: a.enum(["pending", "approved", "rejected"]),
      applicationDate: a.date().required(),
      adopterId: a.id().required(),
      adopter: a.belongsTo("Adopter", "adopterId"),
      petId: a.id().required(),
      pet: a.belongsTo("Pet", "petId"),
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
