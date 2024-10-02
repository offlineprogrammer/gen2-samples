import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Doctor: a
    .model({
      name: a.string().required(),
      specialization: a.string().required(),
      availability: a.hasMany("Availability", "doctorId"),
      appointments: a.hasMany("Appointment", "doctorId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Patient: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      dateOfBirth: a.date().required(),
      medicalHistory: a.string(),
      appointments: a.hasMany("Appointment", "patientId"),
    })
    .authorization((allow) => [
      allow.group('Billing').to(["read"]),
      allow.owner(),
    ]),
  Appointment: a
    .model({
      date: a.date().required(),
      time: a.string().required(),
      status: a.enum(["scheduled", "completed", "cancelled"]),
      doctorId: a.id().required(),
      doctor: a.belongsTo("Doctor", "doctorId"),
      patientId: a.id().required(),
      patient: a.belongsTo("Patient", "patientId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Availability: a
    .model({
      date: a.date().required(),
      startTime: a.string().required(),
      endTime: a.string().required(),
      doctorId: a.id().required(),
      doctor: a.belongsTo("Doctor", "doctorId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  MedicalRecord: a
    .model({
      date: a.date().required(),
      diagnosis: a.string().required(),
      prescription: a.string(),
      doctorId: a.id().required(),
      doctor: a.belongsTo("Doctor", "doctorId"),
      patientId: a.id().required(),
      patient: a.belongsTo("Patient", "patientId"),
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
