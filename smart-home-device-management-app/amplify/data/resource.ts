import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a
    .model({
      name: a.string().required(),
      email: a.string().required(),
      homes: a.hasMany("Home", "ownerId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Home: a
    .model({
      name: a.string().required(),
      address: a.string(),
      ownerId: a.id().required(),
      owner: a.belongsTo("User", "ownerId"),
      rooms: a.hasMany("Room", "homeId"),
      devices: a.hasMany("Device", "homeId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Room: a
    .model({
      name: a.string().required(),
      homeId: a.id().required(),
      home: a.belongsTo("Home", "homeId"),
      devices: a.hasMany("Device", "roomId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Device: a
    .model({
      name: a.string().required(),
      type: a.enum(["light", "thermostat", "lock", "camera"]),
      status: a.boolean().required(),
      homeId: a.id().required(),
      home: a.belongsTo("Home", "homeId"),
      roomId: a.id(),
      room: a.belongsTo("Room", "roomId"),
      readings: a.hasMany("DeviceReading", "deviceId"),
      automations: a.hasMany("DeviceAutomation", "deviceId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  DeviceReading: a
    .model({
      deviceId: a.id().required(),
      device: a.belongsTo("Device", "deviceId"),
      timestamp: a.date().required(),
      value: a.float().required(),
      unit: a.string(),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),

  DeviceAutomation: a
    .model({
      deviceId: a.id().required(),
      device: a.belongsTo("Device", "deviceId"),
      automationId: a.id().required(),
      automation: a.belongsTo("Automation", "automationId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),

  Automation: a
    .model({
      name: a.string().required(),
      condition: a.string().required(),
      action: a.string().required(),
      homeId: a.id().required(),
      home: a.belongsTo("Home", "homeId"),
      devices: a.hasMany("DeviceAutomation", "automationId"),
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
