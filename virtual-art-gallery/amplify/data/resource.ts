import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  Artist: a
    .model({
      name: a.string().required(),
      bio: a.string(),
      artworks: a.hasMany("Artwork", "artistId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Artwork: a
    .model({
      title: a.string().required(),
      description: a.string(),
      imageUrl: a.string().required(),
      price: a.float(),
      artistId: a.id().required(),
      artist: a.belongsTo("Artist", "artistId"),
      exhibitionsId: a.id(),
      exhibition: a.belongsTo("Exhibition", "exhibitionsId"),
      visitors: a.hasMany("VisitorArtwork", "artworkId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Exhibition: a
    .model({
      name: a.string().required(),
      startDate: a.date().required(),
      endDate: a.date().required(),
      description: a.string(),
      artworks: a.hasMany("Artwork", "exhibitionsId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  VisitorArtwork: a
    .model({
      visitorId: a.id().required(),
      artworkId: a.id().required(),
      visitor: a.belongsTo("Visitor", "visitorId"),
      artwork: a.belongsTo("Artwork", "artworkId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Visitor: a
    .model({
      name: a.string().required(),
      email: a.email().required(),
      favorites: a.hasMany("VisitorArtwork", "visitorId"),
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
    defaultAuthorizationMode: "userPool",
  },
});
