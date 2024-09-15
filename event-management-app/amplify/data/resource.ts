import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({

  User: a.model({
    name: a.string().required(),
    email: a.string().required(),
    tasks: a.hasMany('Task', 'userId'),
    eventsOrganized: a.hasMany('Event', 'organizerId'),
    eventsAttending: a.hasMany('EventAttendee', 'userId'),
  })  .authorization((allow) => [allow.owner()]),

  Event: a.model({
    name: a.string().required(),
    description: a.string(),
    date: a.date().required(),
    location: a.string().required(),
    organizerId: a.id(),
    organizer: a.belongsTo('User', 'organizerId'),
    attendees: a.hasMany('EventAttendee', 'eventId'),
    tickets: a.hasMany('Ticket', 'eventId')
  }).authorization(allow => [
    // Allow public to read events
    allow.publicApiKey().to(['read']),
    // Allow owner to create, update, delete events
    allow.owner(),
  ]),
  Ticket: a.model({
    type: a.enum(['standard', 'vip', 'early_bird']),
    price: a.float().required(),
    quantity: a.integer().required(),
    eventId: a.id(),
    event: a.belongsTo('Event', 'eventId')
  }).authorization(allow => [
    // Allow public to read tickets
    allow.publicApiKey().to(['read']),
    // Allow owner to create, update, delete tickets
    allow.owner(),
  ]),
  EventAttendee: a.model({
    eventId: a.id().required(),
    userId: a.id().required(),
    event: a.belongsTo('Event', 'eventId'),
    user: a.belongsTo('User', 'userId')
  }).authorization(allow => [allow.publicApiKey()])


 
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
  
  