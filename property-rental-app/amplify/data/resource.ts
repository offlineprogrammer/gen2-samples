import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	Property: a
		.model({
			title: a.string().required(),
			description: a.string(),
			type: a.enum(["apartment", "house", "room"]),
			price: a.float().required(),
			location: a.string().required(),
			ownserId: a.id().required(),
			owner: a.belongsTo("User", "ownerId"),
			bookings: a.hasMany("Booking", "propertyId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	User: a
		.model({
			name: a.string().required(),
			email: a.email().required(),
			properties: a.hasMany("Property", "ownerId"),
			bookings: a.hasMany("Booking", "guestId"),
			reviews: a.hasMany("Review", "reviewerId"),
		})
		.authorization((allow) => [
			allow.group("Admin").to(["read"]),
			allow.owner(),
		]),
	Booking: a
		.model({
			startDate: a.date().required(),
			endDate: a.date().required(),
			totalPrice: a.float().required(),
			status: a.enum(["pending", "confirmed", "cancelled"]),
			propertyId: a.id().required(),
			property: a.belongsTo("Property", "propertyId"),
			guestId: a.id().required(),
			guest: a.belongsTo("User", "guestId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Review: a.model({
		rating: a.integer().required(),
		comment: a.string(),
		propertyId: a.id().required(),
		property: a.belongsTo("Property", "propertyId"),
		reviewerId: a.id().required(),
		reviewer: a.belongsTo("User", "reviewerId"),
	}),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
	schema,
	authorizationModes: {
		defaultAuthorizationMode: "userPool",
	},
});
