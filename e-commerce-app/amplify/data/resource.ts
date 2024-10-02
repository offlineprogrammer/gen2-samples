import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Product: a.model({
    name: a.string().required(),
    description: a.string(),
    price: a.float().required(),
    inventory: a.integer().required(),
    categoryId: a.id(),
    category: a.belongsTo('Category', 'categoryId')
  })  .authorization(allow => [
  
    // Allow public to read products
    allow.publicApiKey().to(['read']),
    // Allow owner to create, update, delete products
    allow.owner(),
  ]),
  Category: a.model({
    name: a.string().required(),
    products: a.hasMany('Product', 'categoryId')
  })  .authorization(allow => [
    // Allow public to read categories
    allow.publicApiKey().to(['read']),
    // Allow owner to create, update, delete categories
    allow.owner(),
  ]),
  Order: a.model({
    user: a.belongsTo('User', 'userId'),
    userId: a.id(),
    items: a.hasMany('OrderItem', 'orderId'),
    total: a.float().required(),
    status: a.enum(['pending', 'processing', 'shipped', 'delivered'])
  })
  .authorization((allow) => [allow.owner()]),
  OrderItem: a.model({
    product: a.belongsTo('Product', 'productId'),
    productId: a.id(),
    quantity: a.integer().required(),
    orderId: a.id(),
    order: a.belongsTo('Order', 'orderId')
  })
  .authorization((allow) => [allow.owner()]),
  User: a.model({
    name: a.string().required(),
    email: a.email().required(),
    orders: a.hasMany('Order', 'userId')
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
    defaultAuthorizationMode: 'userPool',
  },
});
  
  