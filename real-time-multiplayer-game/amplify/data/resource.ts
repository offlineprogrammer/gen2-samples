import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	User: a
		.model({
			username: a.string().required(),
			email: a.email().required(),
			games: a.hasMany("GamePlayer", "playerId"),
		})
		.authorization((allow) => [allow.owner()]),
	Game: a
		.model({
			name: a.string().required(),
			status: a.enum(["waiting", "in_progress", "finished"]),
			players: a.hasMany("GamePlayer", "gameId"),
			currentTurnId: a.id(),
			currentTurn: a.belongsTo("User", "currentTurnId"),
			winnerId: a.id(),
			winner: a.belongsTo("User", "winnerId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),

	GamePlayer: a
		.model({
			gameId: a.id().required(),
			game: a.belongsTo("Game", "gameId"),
			playerId: a.id().required(),
			player: a.belongsTo("User", "playerId"),
			score: a.float(),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),

	Move: a
		.model({
			gameId: a.id().required(),
			game: a.belongsTo("Game", "gameId"),
			playerId: a.id().required(),
			player: a.belongsTo("User", "playerId"),
			position: a.string().required(),
			timestamp: a.date().required(),
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
