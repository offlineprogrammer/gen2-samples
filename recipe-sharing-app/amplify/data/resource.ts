import { type ClientSchema, a, defineData } from '@aws-amplify/backend';


const schema = a.schema({

  User: a.model({
    name: a.string().required(),
    recipes: a.hasMany('Recipe', 'authorId'),
  }).authorization((allow) => [allow.owner()]),
  Recipe: a.model({
    title: a.string().required(),
    ingredients: a.hasMany('Ingredient', 'recipeId'),
    instructions: a.string().required(),
    authorId: a.id().required(),
    author: a.belongsTo('User', 'authorId'),
    category: a.enum(['appetizer', 'main', 'dessert', 'beverage']),
    ratings: a.hasMany('Rating', 'recipeId')
  }).authorization(allow => [
    // Allow public to read recipes
    allow.publicApiKey().to(['read']),
    // Allow owner to create, update, delete recipes
    allow.owner(),
  ]),
  Ingredient: a.model({
    name: a.string().required(),
    quantity: a.float().required(),
    unit: a.string().required(),
    recipeId: a.id().required(),
    recipe: a.belongsTo('Recipe', 'recipeId')
  }).authorization(allow => [
    // Allow public to read ingredients
    allow.publicApiKey().to(['read']),
    // Allow owner to create, update, delete ingredients
    allow.owner(),
  ]),
  Rating: a.model({
    score: a.integer().required(),
    userId: a.id().required(),
    user: a.belongsTo('User', 'userId'),
    recipeId: a.id().required(),
    recipe: a.belongsTo('Recipe', 'recipeId')
  }).authorization(allow => [
    // Allow public to read the ratings
    allow.publicApiKey().to(['read']),
    // Allow owner to create, update, delete the ratings
    allow.owner(),
  ]),



 
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
  },
});
  
  