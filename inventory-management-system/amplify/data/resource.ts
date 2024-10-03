import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	Product: a
		.model({
			name: a.string().required(),
			description: a.string(),
			sku: a.string().required(),
			price: a.float().required(),
			quantity: a.integer().required(),
			categoryId: a.id().required(),
			category: a.belongsTo("Category", "categoryId"),
			supplierId: a.id().required(),
			supplier: a.belongsTo("Supplier", "supplierId"),
			orders: a.hasMany("OrderItem", "productId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Category: a
		.model({
			name: a.string().required(),
			products: a.hasMany("Product", "categoryId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Supplier: a
		.model({
			name: a.string().required(),
			contact: a.string(),
			products: a.hasMany("Product", "supplierId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Order: a
		.model({
			orderDate: a.date().required(),
			status: a.enum(["pending", "processing", "shipped", "delivered"]),
			items: a.hasMany("OrderItem", "orderId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	OrderItem: a
		.model({
			productId: a.id().required(),
			product: a.belongsTo("Product", "productId"),
			quantity: a.integer().required(),
			orderId: a.id().required(),
			order: a.belongsTo("Order", "orderId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
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
