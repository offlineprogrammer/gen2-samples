import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
	Artist: a
		.model({
			name: a.string().required(),
			bio: a.string(),
			albums: a.hasMany("Album", "artistId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Album: a
		.model({
			title: a.string().required(),
			releaseDate: a.date().required(),
			artistId: a.id().required(),
			artist: a.belongsTo("Artist", "artistId"),
			tracks: a.hasMany("Track", "albumId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	Track: a
		.model({
			title: a.string().required(),
			duration: a.integer().required(),
			albumId: a.id().required(),
			album: a.belongsTo("Album", "albumId"),
			playlists: a.hasMany("PlaylistTrack", "trackId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	User: a
		.model({
			username: a.string().required(),
			playlists: a.hasMany("Playlist", "userId"),
		})
		.authorization((allow) => [allow.owner()]),
	Playlist: a
		.model({
			name: a.string().required(),
			userId: a.id().required(),
			user: a.belongsTo("User", "userId"),
			tracks: a.hasMany("PlaylistTrack", "playlistId"),
		})
		.authorization((allow) => [
			allow.authenticated().to(["read"]),
			allow.owner(),
		]),
	PlaylistTrack: a
		.model({
			playlistId: a.id().required(),
			trackId: a.id().required(),
			playlist: a.belongsTo("Playlist", "playlistId"),
			track: a.belongsTo("Track", "trackId"),
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
