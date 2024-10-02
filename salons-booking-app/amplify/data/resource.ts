import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Salon: a
    .model({
      name: a.string().required(),
      address: a.string(),
      stylists: a.hasMany("Stylist", "salonId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Stylist: a
    .model({
      name: a.string().required(),

      salonId: a.id().required(),
      salon: a.belongsTo("Salon", "salonId"),
      appointments: a.hasMany("Appointment", "stylistId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),

      allow.owner(),
    ]),
  Service: a
    .model({
      name: a.string().required(),
      duration: a.integer().required(),
      price: a.float().required(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),

      allow.owner(),
    ]),
  Appointment: a
    .model({
      date: a.date().required(),
      time: a.string().required(),
      stylistId: a.id().required(),
      stylist: a.belongsTo("Stylist", "stylistId"),
      customerId: a.id().required(),
      customer: a.belongsTo("Customer", "customerId"),
      serviceId: a.id().required(),
      service: a.belongsTo("Service", "serviceId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),

      allow.owner(),
    ]),
  Customer: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      phone: a.string(),
      appointments: a.hasMany("Appointment", "customerId"),
    })
    .authorization((allow) => [
      allow.group('Admin').to(["read"]),
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
