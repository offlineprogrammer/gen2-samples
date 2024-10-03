// amplify/data/resource.ts

import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	Vehicle: a
		.model({
			make: a.string().required(),
			model: a.string().required(),
			year: a.integer().required(),
			type: a.enum(["sedan", "suv", "truck", "van"]),
			dailyRate: a.float().required(),
			available: a.boolean().required(),
			locationId: a.id().required(),
			location: a.belongsTo("Location", "locationId"),
			rentals: a.hasMany("Rental", "vehicleId"),
		})
		.authorization((allow) => [allow.authenticated()]),
	Customer: a
		.model({
			name: a.string().required(),
			email: a.email().required(),
			phone: a.string(),
			licenseNumber: a.string().required(),
			rentals: a.hasMany("Rental", "customerId"),
		})
		.authorization((allow) => [
			allow.group("Admin").to(["read"]),
			allow.owner(),
		]),
	Location: a
		.model({
			name: a.string().required(),
			address: a.string().required(),
			vehicles: a.hasMany("Vehicle", "locationId"),
		})
		.authorization((allow) => [allow.authenticated()]),
	Rental: a
		.model({
			startDate: a.date().required(),
			endDate: a.date().required(),
			totalCost: a.float().required(),
			status: a.enum(["reserved", "active", "completed", "cancelled"]),
			customerId: a.id().required(),
			customer: a.belongsTo("Customer", "customerId"),
			vehicleId: a.id().required(),
			vehicle: a.belongsTo("Vehicle", "vehicleId"),
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
