import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({

  User: a.model({
    name: a.string().required(),
    email: a.string().required(),
    tasks: a.hasMany('Task', 'userId'),
    projects: a.hasMany('ProjectUser', 'userId')
  })  .authorization((allow) => [allow.owner()]),

  Task: a.model({
    title: a.string().required(),
    description: a.string(),
    status: a.enum(['todo', 'in_progress', 'done']),
    dueDate: a.date(),
    userId: a.id(),
    assignee: a.belongsTo('User', 'userId'),
    projectId: a.id(),
    project: a.belongsTo('Project', 'projectId')
  }) .authorization(allow => [
    // Allow public to read tasks
    allow.publicApiKey().to(['read']),
    // Allow owner to create, update, delete tasks
    allow.owner(),
  ]),
  Project: a.model({
    name: a.string().required(),
    description: a.string(),
    tasks: a.hasMany('Task', 'projectId'),
    members: a.hasMany('ProjectUser', 'projectId')
  }).authorization(allow => [
    // Allow public to read projects
    allow.publicApiKey().to(['read']),
    // Allow owner to create, update, delete projects
    allow.owner(),
  ]),
  ProjectUser: a.model({
    projectId: a.id().required(),
    userId: a.id().required(),
    project: a.belongsTo('Project', 'projectId'),
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
  
  