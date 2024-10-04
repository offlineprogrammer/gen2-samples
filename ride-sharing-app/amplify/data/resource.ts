import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	User: a
		.model({
			name: a.string().required(),
			email: a.email().required(),
			phone: a.string(),
			role: a.enum(["driver", "passenger"]),
			rides: a.hasMany("RideUser", "userId"),
		})
		.authorization((allow) => [
			allow.group("Admin").to(["read"]),
			allow.owner(),
		]),

	RideUser: a
		.model({
			userId: a.id().required(),
			rideId: a.id().required(),
			user: a.belongsTo("User", "userId"),
			ride: a.belongsTo("Ride", "rideId"),
		})
		.authorization((allow) => [
			allow.group("EMPLOYEES").to(["read"]),
			allow.owner(),
		]),
	Ride: a
		.model({
			startLocation: a.string().required(),
			endLocation: a.string().required(),
			startTime: a.date().required(),
			endTime: a.date(),
			status: a.enum([
				"requested",
				"accepted",
				"in_progress",
				"completed",
				"cancelled",
			]),
			fare: a.float(),
			driverId: a.id(),
			driver: a.belongsTo("RideUser", "driverId"),
			passengerId: a.id(),
			passenger: a.belongsTo("RideUser", "passengerId"),
		})
		.authorization((allow) => [
			allow.group("EMPLOYEES").to(["read"]),
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
