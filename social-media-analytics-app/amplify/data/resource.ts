import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

const schema = a.schema({
  User: a
    .model({
      username: a.string().required(),
      email: a.string().required(),
      socialAccounts: a.hasMany("SocialAccount", "userId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  SocialAccount: a
    .model({
      platform: a.enum(["facebook", "instagram", "linkedin"]),
      accountId: a.string().required(),
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
      posts: a.hasMany("Post", "socialAccountId"),
      analytics: a.hasMany("Analytics", "socialAccountId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Post: a
    .model({
      content: a.string().required(),
      publishDate: a.date().required(),
      likes: a.integer(),
      shares: a.integer(),
      comments: a.integer(),
      socialAccountId: a.id().required(),
      socialAccount: a.belongsTo("SocialAccount", "socialAccountId"),
      campaigns: a.hasMany("PostCampaign", "postId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Analytics: a
    .model({
      date: a.date().required(),
      followers: a.integer(),
      engagement: a.float(),
      impressions: a.integer(),
      socialAccountId: a.id().required(),
      socialAccount: a.belongsTo("SocialAccount", "socialAccountId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  PostCampaign: a
    .model({
      postId: a.id().required(),
      post: a.belongsTo("Post", "postId"),
      campaignId: a.id().required(),
      campaign: a.belongsTo("Campaign", "campaignId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
      allow.owner(),
    ]),
  Campaign: a
    .model({
      name: a.string().required(),
      startDate: a.date().required(),
      endDate: a.date().required(),
      budget: a.float(),
      posts: a.hasMany("PostCampaign", "campaignId"),
      userId: a.id().required(),
      user: a.belongsTo("User", "userId"),
    })
    .authorization((allow) => [
      allow.publicApiKey().to(["read"]),
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
